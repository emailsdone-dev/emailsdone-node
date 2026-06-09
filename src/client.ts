import { EmailsDoneError } from "./errors.js";
import { SendTemplates } from "./templates.js";
import type { EmailsDoneClientOptions, SendEmailResponse, SendTemplatePayload } from "./types.js";

export class EmailsDoneClient {
  readonly send: SendTemplates;
  private readonly apiKey: string;
  private readonly apiBaseUrl: string;

  constructor(options: EmailsDoneClientOptions) {
    if (!options.apiKey || !options.apiKey.trim()) {
      throw new Error("An EmailsDone API key is required. Store it in server-side configuration, not frontend code.");
    }

    this.apiKey = options.apiKey;
    this.apiBaseUrl = (options.apiBaseUrl ?? "https://api.emailsdone.dev").replace(/\/+$/, "");
    this.send = new SendTemplates(this);
  }

  static fromApiKey(apiKey: string, options: Omit<EmailsDoneClientOptions, "apiKey"> = {}): EmailsDoneClient {
    return new EmailsDoneClient({ ...options, apiKey });
  }

  async sendTemplate(payload: SendTemplatePayload): Promise<SendEmailResponse> {
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

    const headers: Record<string, string> = {
      Authorization: `Bearer ${this.apiKey}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    if (payload.idempotencyKey?.trim()) {
      headers["Idempotency-Key"] = payload.idempotencyKey;
    }

    const response = await fetch(`${this.apiBaseUrl}/v1/send`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    const responseBody = await response.text();

    if (!response.ok) {
      throw errorFromResponse(response.status, responseBody);
    }

    try {
      return JSON.parse(responseBody) as SendEmailResponse;
    } catch (error) {
      throw new EmailsDoneError(response.status, "invalid_response", "EmailsDone returned invalid JSON.", responseBody);
    }
  }
}

function addIfSet(target: Record<string, unknown>, key: string, value: string | undefined): void {
  if (value?.trim()) {
    target[key] = value;
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
