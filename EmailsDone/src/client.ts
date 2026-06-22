import { EmailsDoneError } from "./errors.js";
import {
  AuthenticationTemplates,
  BillingTemplates,
  DeveloperTemplates,
  NotificationsTemplates,
  TeamTemplates,
  RecipientClient,
} from "./templates.js";
import type {
  EmailsDoneOptions,
  GetQuotaResponse,
  GetRecipientStatusOptions,
  GetRecipientStatusResponse,
  SendOptions,
  ContactDryRunResponse,
  ContactGetResponse,
  ContactGroupMutationResponse,
  ContactGroupsListResponse,
  ContactGroupUpsertResponse,
  ContactListRequest,
  ContactListResponse,
  ContactSendRequest,
  ContactSendResponse,
  ContactUpsertRequest,
  ContactUpsertResponse,
  ResubscribeRecipientResponse,
  SendEmailResponse,
  SendTemplatePayload,
} from "./types.js";

export class EmailsDone {
  private readonly authenticationTemplates: AuthenticationTemplates;
  private readonly billingTemplates: BillingTemplates;
  private readonly developerTemplates: DeveloperTemplates;
  private readonly notificationsTemplates: NotificationsTemplates;
  private readonly teamTemplates: TeamTemplates;
  private readonly contactsClient: ContactsClient;
  private readonly apiKey: string;
  private readonly apiBaseUrl: string;

  constructor(options: EmailsDoneOptions) {
    if (!options.apiKey || !options.apiKey.trim()) {
      throw new Error("An EmailsDone API key is required. Store it in server-side configuration, not frontend code.");
    }

    this.apiKey = options.apiKey;
    this.apiBaseUrl = (options.apiBaseUrl ?? "https://api.emailsdone.dev").replace(/\/+$/, "");
    this.authenticationTemplates = new AuthenticationTemplates(this);
    this.billingTemplates = new BillingTemplates(this);
    this.developerTemplates = new DeveloperTemplates(this);
    this.notificationsTemplates = new NotificationsTemplates(this);
    this.teamTemplates = new TeamTemplates(this);
    this.contactsClient = new ContactsClient(this);
  }

  static fromApiKey(apiKey: string, options: Omit<EmailsDoneOptions, "apiKey"> = {}): EmailsDone {
    return new EmailsDone({ ...options, apiKey });
  }

  authentication(): AuthenticationTemplates {
    return this.authenticationTemplates;
  }

  billing(): BillingTemplates {
    return this.billingTemplates;
  }

  developer(): DeveloperTemplates {
    return this.developerTemplates;
  }

  notifications(): NotificationsTemplates {
    return this.notificationsTemplates;
  }

  team(): TeamTemplates {
    return this.teamTemplates;
  }


  recipient(email: string): RecipientClient {
    requireRecipientEmail(email);
    return new RecipientClient(this, email);
  }

  contacts(): ContactsClient {
    return this.contactsClient;
  }

  async getQuota(): Promise<GetQuotaResponse> {
    return this.requestJson<GetQuotaResponse>("GET", "/v1/quota");
  }

  async resubscribeRecipient(email: string): Promise<ResubscribeRecipientResponse> {
    requireRecipientEmail(email);

    return this.requestJson<ResubscribeRecipientResponse>("POST", "/v1/recipients/resubscribe", {
      email,
      scope: "app_notifications",
    });
  }

  async getRecipientStatus(email: string, options: GetRecipientStatusOptions = {}): Promise<GetRecipientStatusResponse> {
    requireRecipientEmail(email);

    return this.requestJson<GetRecipientStatusResponse>("POST", "/v1/recipients/status", {
      email,
      ...(options.limit === undefined ? {} : { limit: options.limit }),
    });
  }

  async internalSendTemplate(payload: SendTemplatePayload): Promise<SendEmailResponse> {
    if (!payload.templateId || !payload.templateId.trim()) {
      throw new Error("Template id is required.");
    }

    if (!payload.to || !payload.to.trim()) {
      throw new Error("Recipient email address is required.");
    }

    const body: Record<string, unknown> = {
      templateId: payload.templateId,
      to: payload.to,
      data: payload.data,
    };

    addIfSet(body, "templateVersion", payload.templateVersion);
    addIfSet(body, "from", payload.from);
    addIfSet(body, "fromName", payload.fromName);
    addIfSet(body, "replyTo", payload.replyTo);

    const headers = requestHeadersWithIdempotency(payload);

    return this.requestJson<SendEmailResponse>("POST", "/v1/send", body, headers);
  }

  internalRequestJson<TResponse>(
    method: "GET" | "POST",
    path: string,
    body?: Record<string, unknown>,
    extraHeaders: Record<string, string> = {},
  ): Promise<TResponse> {
    return this.requestJson<TResponse>(method, path, body, extraHeaders);
  }

  private async requestJson<TResponse>(
    method: "GET" | "POST",
    path: string,
    body?: Record<string, unknown>,
    extraHeaders: Record<string, string> = {},
  ): Promise<TResponse> {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${this.apiKey}`,
      Accept: "application/json",
      ...extraHeaders,
    };

    if (body) {
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(`${this.apiBaseUrl}${path}`, {
      method,
      headers,
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
    const responseBody = await response.text();

    if (!response.ok) {
      throw errorFromResponse(response.status, responseBody);
    }

    try {
      return JSON.parse(responseBody) as TResponse;
    } catch (error) {
      throw new EmailsDoneError(response.status, "invalid_response", "EmailsDone returned invalid JSON.", responseBody);
    }
  }
}

export const EmailsDoneClient = EmailsDone;

export class ContactsClient {
  constructor(private readonly client: EmailsDone) {}

  get(emailOrContactId: string): Promise<ContactGetResponse> {
    requireNonBlank(emailOrContactId, "Contact email or id is required.");
    return this.client.internalRequestJson<ContactGetResponse>("POST", "/v1/contacts/get", { emailOrContactId });
  }

  upsert(contact: ContactUpsertRequest): Promise<ContactUpsertResponse> {
    requireRecipientEmail(contact.email);
    return this.client.internalRequestJson<ContactUpsertResponse>("POST", "/v1/contacts/upsert", { ...contact });
  }

  list(request: ContactListRequest = {}): Promise<ContactListResponse> {
    return this.client.internalRequestJson<ContactListResponse>("POST", "/v1/contacts/list", { ...request });
  }

  groups(slug?: string): ContactGroupsClient | ContactGroupClient {
    return slug ? new ContactGroupClient(this.client, slug) : new ContactGroupsClient(this.client);
  }

  dryRun(request: ContactSendRequest): Promise<ContactDryRunResponse> {
    return this.client.internalRequestJson<ContactDryRunResponse>("POST", "/v1/contacts/send/dry-run", { ...request });
  }

  sendTemplate(request: ContactSendRequest): Promise<ContactSendResponse> {
    return this.client.internalRequestJson<ContactSendResponse>("POST", "/v1/contacts/send", { ...request });
  }
}

export class ContactGroupsClient {
  constructor(private readonly client: EmailsDone) {}

  list(): Promise<ContactGroupsListResponse> {
    return this.client.internalRequestJson<ContactGroupsListResponse>("POST", "/v1/contacts/groups/list", {});
  }

  upsert(name: string, slug?: string): Promise<ContactGroupUpsertResponse> {
    return this.client.internalRequestJson<ContactGroupUpsertResponse>("POST", "/v1/contacts/groups/upsert", { name, ...(slug ? { slug } : {}) });
  }
}

export class ContactGroupClient {
  constructor(
    private readonly client: EmailsDone,
    private readonly slug: string,
  ) {}

  sendTemplate(request: Omit<ContactSendRequest, "groupSlug" | "contactIds">): Promise<ContactSendResponse> {
    return this.client.internalRequestJson<ContactSendResponse>("POST", "/v1/contacts/send", { ...request, groupSlug: this.slug });
  }

  dryRun(request: Omit<ContactSendRequest, "groupSlug" | "contactIds">): Promise<ContactDryRunResponse> {
    return this.client.internalRequestJson<ContactDryRunResponse>("POST", "/v1/contacts/send/dry-run", { ...request, groupSlug: this.slug });
  }

  add(contactIds: string[]): Promise<ContactGroupMutationResponse> {
    return this.client.internalRequestJson<ContactGroupMutationResponse>("POST", "/v1/contacts/groups/add", { groupSlug: this.slug, contactIds });
  }

  remove(contactIds: string[]): Promise<ContactGroupMutationResponse> {
    return this.client.internalRequestJson<ContactGroupMutationResponse>("POST", "/v1/contacts/groups/remove", { groupSlug: this.slug, contactIds });
  }

  delete(): Promise<ContactGroupMutationResponse> {
    return this.client.internalRequestJson<ContactGroupMutationResponse>("POST", "/v1/contacts/groups/delete", { groupSlug: this.slug });
  }
}

function addIfSet(target: Record<string, unknown>, key: string, value: string | undefined): void {
  if (value?.trim()) {
    target[key] = value;
  }
}

function requestHeadersWithIdempotency(options: SendOptions): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (options.idempotencyKey?.trim()) {
    headers["Idempotency-Key"] = options.idempotencyKey;
  }

  return headers;
}

function requireRecipientEmail(email: string): void {
  if (!email || !email.trim()) {
    throw new Error("Recipient email address is required.");
  }
}

function requireNonBlank(value: string, message: string): void {
  if (!value || !value.trim()) {
    throw new Error(message);
  }
}

function errorFromResponse(statusCode: number, responseBody: string): EmailsDoneError {
  try {
    const parsed = JSON.parse(responseBody) as { error?: string; message?: string };
    const errorCode = parsed.error || "api_error";
    const message = parsed.message || errorCode;
    return new EmailsDoneError(statusCode, errorCode, message, responseBody);
  } catch {
    return new EmailsDoneError(statusCode, "api_error", "EmailsDone returned an error response.", responseBody);
  }
}
