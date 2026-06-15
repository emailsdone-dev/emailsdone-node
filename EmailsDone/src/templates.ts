import type { EmailsDoneClient } from "./client.js";
import type {
  GetRecipientStatusOptions,
  GetRecipientStatusResponse,
  ResubscribeRecipientResponse,
  SendEmailResponse,
  SendOptions,
  SendTemplatePayload,
  AccountLockedOptions,
  EmailChangedOptions,
  LoginCodeOptions,
  MagicLinkOptions,
  MfaDisabledOptions,
  MfaEnabledOptions,
  NewDeviceLoginOptions,
  PasswordChangedOptions,
  PasswordResetOptions,
  SuspiciousLoginOptions,
  VerifyEmailOptions,
  WelcomeOptions,
  InvoiceOptions,
  InvoiceOverdueOptions,
  PaymentFailedOptions,
  PaymentSucceededOptions,
  RefundIssuedOptions,
  SubscriptionCancelledOptions,
  SubscriptionPausedOptions,
  SubscriptionRenewedOptions,
  SubscriptionStartedOptions,
  TrialEndingOptions,
  TrialStartedOptions,
  UsageThresholdOptions,
  ApiKeyCreatedOptions,
  ApiKeyRotatedOptions,
  CreditsExhaustedOptions,
  CreditsLowOptions,
  AnnouncementOptions,
  ApprovalApprovedOptions,
  ApprovalNeededOptions,
  ApprovalRejectedOptions,
  DigestOptions,
  ExportReadyOptions,
  GenerationCompleteOptions,
  ImportCompleteOptions,
  JobCompleteOptions,
  NotificationAlertOptions,
  NotificationInfoOptions,
  NotificationSuccessOptions,
  NotificationWarningOptions,
  ProcessingFailedOptions,
  QueuedRequestReadyOptions,
  ReminderOptions,
  ReportReadyOptions,
  UploadCompleteOptions,
  InvitationAcceptedOptions,
  InvitedToWorkspaceOptions,
  RoleChangedOptions,
  TeamMemberAddedOptions,
  TeamMemberRemovedOptions,
} from "./types.js";

export class PendingTemplateRequest {
  constructor(
    private readonly client: EmailsDoneClient,
    private readonly payload: SendTemplatePayload,
  ) {}

  async send(to: string, options: SendOptions = {}): Promise<SendEmailResponse> {
    requireRecipient(to);

    return this.client.internalSendTemplate({
      ...mergeSendOptions(this.payload, options),
      templateId: this.payload.templateId,
      templateVersion: options.templateVersion?.trim() || this.payload.templateVersion,
      to,
      data: this.payload.data,
    });
  }
}

export class RecipientClient {
  constructor(
    private readonly client: EmailsDoneClient,
    private readonly email: string,
  ) {}

  getStatus(options: GetRecipientStatusOptions = {}): Promise<GetRecipientStatusResponse> {
    return this.client.getRecipientStatus(this.email, options);
  }

  resubscribe(): Promise<ResubscribeRecipientResponse> {
    return this.client.resubscribeRecipient(this.email);
  }
}

export class AuthenticationTemplates {
  constructor(private readonly client: EmailsDoneClient) {}

  accountLocked(options: AccountLockedOptions = {}): PendingTemplateRequest {
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "lockDetails", options.lockDetails);
    setNested(data, "notice", options.notice);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return buildPendingRequest(this.client, "account-locked", "v1", data, options);
  }

  emailChanged(options: EmailChangedOptions = {}): PendingTemplateRequest {
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "changeDetails", options.changeDetails);
    setNested(data, "footerNote", options.footerNote);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return buildPendingRequest(this.client, "email-changed", "v1", data, options);
  }

  loginCode(code: string, options: LoginCodeOptions = {}): PendingTemplateRequest {
    requireValue("code", code);
    const data: Record<string, unknown> = {};
    setNested(data, "code", code);
    setNested(data, "footerNote", options.footerNote);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "preheader", options.preheader);
    setNested(data, "securityNote", options.securityNote);
    setNested(data, "subject", options.subject);

    return buildPendingRequest(this.client, "login-code", "v1", data, options);
  }

  magicLink(url: string, options: MagicLinkOptions = {}): PendingTemplateRequest {
    requireValue("actionButtonUrl", url);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.url", url);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "footerNote", options.footerNote);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return buildPendingRequest(this.client, "magic-link", "v1", data, options);
  }

  mfaDisabled(options: MfaDisabledOptions = {}): PendingTemplateRequest {
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "footerNote", options.footerNote);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "notice", options.notice);
    setNested(data, "preheader", options.preheader);
    setNested(data, "securityDetails", options.securityDetails);
    setNested(data, "subject", options.subject);

    return buildPendingRequest(this.client, "mfa-disabled", "v1", data, options);
  }

  mfaEnabled(options: MfaEnabledOptions = {}): PendingTemplateRequest {
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "footerNote", options.footerNote);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "notice", options.notice);
    setNested(data, "preheader", options.preheader);
    setNested(data, "securityDetails", options.securityDetails);
    setNested(data, "subject", options.subject);

    return buildPendingRequest(this.client, "mfa-enabled", "v1", data, options);
  }

  newDeviceLogin(options: NewDeviceLoginOptions = {}): PendingTemplateRequest {
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "footerNote", options.footerNote);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "loginDetails", options.loginDetails);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return buildPendingRequest(this.client, "new-device-login", "v1", data, options);
  }

  passwordChanged(options: PasswordChangedOptions = {}): PendingTemplateRequest {
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "changeDetails", options.changeDetails);
    setNested(data, "footerNote", options.footerNote);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return buildPendingRequest(this.client, "password-changed", "v1", data, options);
  }

  passwordReset(resetUrl: string, options: PasswordResetOptions = {}): PendingTemplateRequest {
    requireValue("actionButtonUrl", resetUrl);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.url", resetUrl);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "footerNote", options.footerNote);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "preheader", options.preheader);
    setNested(data, "requestDetails", options.requestDetails);
    setNested(data, "securityNote", options.securityNote);
    setNested(data, "subject", options.subject);

    return buildPendingRequest(this.client, "password-reset", "v1", data, options);
  }

  suspiciousLogin(options: SuspiciousLoginOptions = {}): PendingTemplateRequest {
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "loginDetails", options.loginDetails);
    setNested(data, "notice", options.notice);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return buildPendingRequest(this.client, "suspicious-login", "v1", data, options);
  }

  verifyEmail(verificationUrl: string, options: VerifyEmailOptions = {}): PendingTemplateRequest {
    requireValue("actionButtonUrl", verificationUrl);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.url", verificationUrl);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "footerNote", options.footerNote);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "preheader", options.preheader);
    setNested(data, "securityNote", options.securityNote);
    setNested(data, "subject", options.subject);

    return buildPendingRequest(this.client, "verify-email", "v1", data, options);
  }

  welcome(actionUrl: string, options: WelcomeOptions = {}): PendingTemplateRequest {
    requireValue("actionButtonUrl", actionUrl);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.url", actionUrl);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "callToActionHeading", options.callToActionHeading);
    setNested(data, "callToActionParagraph", options.callToActionParagraph);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return buildPendingRequest(this.client, "welcome", "v1", data, options);
  }
}

export class BillingTemplates {
  constructor(private readonly client: EmailsDoneClient) {}

  invoice(options: InvoiceOptions): PendingTemplateRequest {
    requireValue("invoice", options.invoice);
    requireValue("invoiceNumber", options.invoiceNumber);
    const data: Record<string, unknown> = {};
    setNested(data, "invoice", options.invoice);
    setNested(data, "invoiceNumber", options.invoiceNumber);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return buildPendingRequest(this.client, "invoice", "v1", data, options);
  }

  invoiceOverdue(options: InvoiceOverdueOptions): PendingTemplateRequest {
    requireValue("actionButtonUrl", options.actionButtonUrl);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "invoiceDetails", options.invoiceDetails);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return buildPendingRequest(this.client, "invoice-overdue", "v1", data, options);
  }

  paymentFailed(options: PaymentFailedOptions): PendingTemplateRequest {
    requireValue("actionButtonUrl", options.actionButtonUrl);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionNote", options.actionNote);
    setNested(data, "footerNote", options.footerNote);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "paymentDetails", options.paymentDetails);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return buildPendingRequest(this.client, "payment-failed", "v1", data, options);
  }

  paymentSucceeded(options: PaymentSucceededOptions = {}): PendingTemplateRequest {
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "paymentDetails", options.paymentDetails);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return buildPendingRequest(this.client, "payment-succeeded", "v1", data, options);
  }

  refundIssued(options: RefundIssuedOptions = {}): PendingTemplateRequest {
    const data: Record<string, unknown> = {};
    setNested(data, "footerNote", options.footerNote);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "preheader", options.preheader);
    setNested(data, "refundDetails", options.refundDetails);
    setNested(data, "subject", options.subject);

    return buildPendingRequest(this.client, "refund-issued", "v1", data, options);
  }

  subscriptionCancelled(options: SubscriptionCancelledOptions = {}): PendingTemplateRequest {
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);
    setNested(data, "subscriptionDetails", options.subscriptionDetails);

    return buildPendingRequest(this.client, "subscription-cancelled", "v1", data, options);
  }

  subscriptionPaused(options: SubscriptionPausedOptions = {}): PendingTemplateRequest {
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);
    setNested(data, "subscriptionDetails", options.subscriptionDetails);

    return buildPendingRequest(this.client, "subscription-paused", "v1", data, options);
  }

  subscriptionRenewed(options: SubscriptionRenewedOptions = {}): PendingTemplateRequest {
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);
    setNested(data, "subscriptionDetails", options.subscriptionDetails);

    return buildPendingRequest(this.client, "subscription-renewed", "v1", data, options);
  }

  subscriptionStarted(options: SubscriptionStartedOptions = {}): PendingTemplateRequest {
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);
    setNested(data, "subscriptionDetails", options.subscriptionDetails);

    return buildPendingRequest(this.client, "subscription-started", "v1", data, options);
  }

  trialEnding(options: TrialEndingOptions): PendingTemplateRequest {
    requireValue("actionButtonUrl", options.actionButtonUrl);
    requireValue("trialEndDate", options.trialEndDate);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "trialEndDate", options.trialEndDate);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);
    setNested(data, "upgradeNote", options.upgradeNote);

    return buildPendingRequest(this.client, "trial-ending", "v1", data, options);
  }

  trialStarted(options: TrialStartedOptions = {}): PendingTemplateRequest {
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);
    setNested(data, "trialDetails", options.trialDetails);

    return buildPendingRequest(this.client, "trial-started", "v1", data, options);
  }

  usageThreshold(options: UsageThresholdOptions): PendingTemplateRequest {
    requireValue("message", options.message);
    const data: Record<string, unknown> = {};
    setNested(data, "message", options.message);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);
    setNested(data, "usageDetails", options.usageDetails);

    return buildPendingRequest(this.client, "usage-threshold", "v1", data, options);
  }
}

export class DeveloperTemplates {
  constructor(private readonly client: EmailsDoneClient) {}

  apiKeyCreated(options: ApiKeyCreatedOptions = {}): PendingTemplateRequest {
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "apiKeyDetails", options.apiKeyDetails);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "notice", options.notice);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return buildPendingRequest(this.client, "api-key-created", "v1", data, options);
  }

  apiKeyRotated(options: ApiKeyRotatedOptions = {}): PendingTemplateRequest {
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "apiKeyDetails", options.apiKeyDetails);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return buildPendingRequest(this.client, "api-key-rotated", "v1", data, options);
  }

  creditsExhausted(options: CreditsExhaustedOptions): PendingTemplateRequest {
    requireValue("actionButtonUrl", options.actionButtonUrl);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "creditDetails", options.creditDetails);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return buildPendingRequest(this.client, "credits-exhausted", "v1", data, options);
  }

  creditsLow(options: CreditsLowOptions = {}): PendingTemplateRequest {
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "creditDetails", options.creditDetails);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return buildPendingRequest(this.client, "credits-low", "v1", data, options);
  }
}

export class NotificationsTemplates {
  constructor(private readonly client: EmailsDoneClient) {}

  announcement(options: AnnouncementOptions): PendingTemplateRequest {
    requireValue("message", options.message);
    const data: Record<string, unknown> = {};
    setNested(data, "message", options.message);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return buildPendingRequest(this.client, "announcement", "v1", data, options);
  }

  approvalApproved(options: ApprovalApprovedOptions): PendingTemplateRequest {
    requireValue("message", options.message);
    const data: Record<string, unknown> = {};
    setNested(data, "message", options.message);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "approvalDetails", options.approvalDetails);
    setNested(data, "heading", options.heading);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return buildPendingRequest(this.client, "approval-approved", "v1", data, options);
  }

  approvalNeeded(options: ApprovalNeededOptions): PendingTemplateRequest {
    requireValue("actionButtonUrl", options.actionButtonUrl);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "approvalDetails", options.approvalDetails);
    setNested(data, "heading", options.heading);
    setNested(data, "message", options.message);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return buildPendingRequest(this.client, "approval-needed", "v1", data, options);
  }

  approvalRejected(options: ApprovalRejectedOptions): PendingTemplateRequest {
    requireValue("message", options.message);
    const data: Record<string, unknown> = {};
    setNested(data, "message", options.message);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "approvalDetails", options.approvalDetails);
    setNested(data, "heading", options.heading);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return buildPendingRequest(this.client, "approval-rejected", "v1", data, options);
  }

  digest(options: DigestOptions = {}): PendingTemplateRequest {
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "message", options.message);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);
    setNested(data, "summary.alerts", options.summaryAlerts);
    setNested(data, "summary.newItems", options.summaryNewItems);
    setNested(data, "summary.updates", options.summaryUpdates);

    return buildPendingRequest(this.client, "digest", "v1", data, options);
  }

  exportReady(options: ExportReadyOptions): PendingTemplateRequest {
    requireValue("actionButtonUrl", options.actionButtonUrl);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "exportDetails", options.exportDetails);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return buildPendingRequest(this.client, "export-ready", "v1", data, options);
  }

  generationComplete(options: GenerationCompleteOptions): PendingTemplateRequest {
    requireValue("actionButtonUrl", options.actionButtonUrl);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "generationDetails", options.generationDetails);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return buildPendingRequest(this.client, "generation-complete", "v1", data, options);
  }

  importComplete(options: ImportCompleteOptions = {}): PendingTemplateRequest {
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "importDetails", options.importDetails);
    setNested(data, "message", options.message);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return buildPendingRequest(this.client, "import-complete", "v1", data, options);
  }

  jobComplete(options: JobCompleteOptions = {}): PendingTemplateRequest {
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "jobDetails", options.jobDetails);
    setNested(data, "message", options.message);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return buildPendingRequest(this.client, "job-complete", "v1", data, options);
  }

  notificationAlert(options: NotificationAlertOptions): PendingTemplateRequest {
    requireValue("message", options.message);
    const data: Record<string, unknown> = {};
    setNested(data, "message", options.message);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "alertDetails", options.alertDetails);
    setNested(data, "heading", options.heading);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return buildPendingRequest(this.client, "notification-alert", "v1", data, options);
  }

  notificationInfo(options: NotificationInfoOptions): PendingTemplateRequest {
    requireValue("message", options.message);
    const data: Record<string, unknown> = {};
    setNested(data, "message", options.message);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return buildPendingRequest(this.client, "notification-info", "v1", data, options);
  }

  notificationSuccess(options: NotificationSuccessOptions): PendingTemplateRequest {
    requireValue("message", options.message);
    const data: Record<string, unknown> = {};
    setNested(data, "message", options.message);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return buildPendingRequest(this.client, "notification-success", "v1", data, options);
  }

  notificationWarning(options: NotificationWarningOptions): PendingTemplateRequest {
    requireValue("message", options.message);
    const data: Record<string, unknown> = {};
    setNested(data, "message", options.message);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return buildPendingRequest(this.client, "notification-warning", "v1", data, options);
  }

  processingFailed(options: ProcessingFailedOptions = {}): PendingTemplateRequest {
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "message", options.message);
    setNested(data, "preheader", options.preheader);
    setNested(data, "processingDetails", options.processingDetails);
    setNested(data, "subject", options.subject);

    return buildPendingRequest(this.client, "processing-failed", "v1", data, options);
  }

  queuedRequestReady(options: QueuedRequestReadyOptions): PendingTemplateRequest {
    requireValue("actionButtonUrl", options.actionButtonUrl);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "preheader", options.preheader);
    setNested(data, "requestDetails", options.requestDetails);
    setNested(data, "subject", options.subject);

    return buildPendingRequest(this.client, "queued-request-ready", "v1", data, options);
  }

  reminder(options: ReminderOptions): PendingTemplateRequest {
    requireValue("message", options.message);
    const data: Record<string, unknown> = {};
    setNested(data, "message", options.message);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "preheader", options.preheader);
    setNested(data, "reminderDetails", options.reminderDetails);
    setNested(data, "subject", options.subject);

    return buildPendingRequest(this.client, "reminder", "v1", data, options);
  }

  reportReady(options: ReportReadyOptions): PendingTemplateRequest {
    requireValue("actionButtonUrl", options.actionButtonUrl);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "preheader", options.preheader);
    setNested(data, "reportDetails", options.reportDetails);
    setNested(data, "subject", options.subject);

    return buildPendingRequest(this.client, "report-ready", "v1", data, options);
  }

  uploadComplete(options: UploadCompleteOptions = {}): PendingTemplateRequest {
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "message", options.message);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);
    setNested(data, "uploadDetails", options.uploadDetails);

    return buildPendingRequest(this.client, "upload-complete", "v1", data, options);
  }
}

export class TeamTemplates {
  constructor(private readonly client: EmailsDoneClient) {}

  invitationAccepted(options: InvitationAcceptedOptions = {}): PendingTemplateRequest {
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "inviteDetails", options.inviteDetails);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return buildPendingRequest(this.client, "invitation-accepted", "v1", data, options);
  }

  invitedToWorkspace(options: InvitedToWorkspaceOptions): PendingTemplateRequest {
    requireValue("actionButtonUrl", options.actionButtonUrl);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "inviteDetails", options.inviteDetails);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return buildPendingRequest(this.client, "invited-to-workspace", "v1", data, options);
  }

  roleChanged(options: RoleChangedOptions = {}): PendingTemplateRequest {
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "preheader", options.preheader);
    setNested(data, "roleDetails", options.roleDetails);
    setNested(data, "subject", options.subject);

    return buildPendingRequest(this.client, "role-changed", "v1", data, options);
  }

  teamMemberAdded(options: TeamMemberAddedOptions = {}): PendingTemplateRequest {
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "memberDetails", options.memberDetails);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return buildPendingRequest(this.client, "team-member-added", "v1", data, options);
  }

  teamMemberRemoved(options: TeamMemberRemovedOptions = {}): PendingTemplateRequest {
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "memberDetails", options.memberDetails);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return buildPendingRequest(this.client, "team-member-removed", "v1", data, options);
  }
}

function setNested(target: Record<string, unknown>, path: string, value: unknown): void {
  if (value === undefined || value === null) {
    return;
  }

  const parts = path.split(".");
  let current = target;

  for (let index = 0; index < parts.length; index += 1) {
    const part = parts[index]!;

    if (index === parts.length - 1) {
      current[part] = value;
      return;
    }

    const existing = current[part];
    const next = existing && typeof existing === "object" && !Array.isArray(existing) ? existing as Record<string, unknown> : {};
    current[part] = next;
    current = next;
  }
}

function requireRecipient(to: string): void {
  if (!to || !to.trim()) {
    throw new Error("Recipient email address is required.");
  }
}

function requireValue(name: string, value: unknown): void {
  if (value === undefined || value === null) {
    throw new Error(`${name} is required.`);
  }

  if (typeof value === "string" && !value.trim()) {
    throw new Error(`${name} is required.`);
  }
}

function buildPendingRequest(
  client: EmailsDoneClient,
  templateId: string,
  templateVersion: string,
  data: Record<string, unknown>,
  options: SendOptions = {},
): PendingTemplateRequest {
  return new PendingTemplateRequest(client, {
    templateId,
    templateVersion: options.templateVersion?.trim() || templateVersion,
    to: "",
    data,
    from: options.from,
    fromName: options.fromName,
    replyTo: options.replyTo,
    idempotencyKey: options.idempotencyKey,
  });
}

function mergeSendOptions(base: SendOptions, overrides: SendOptions): SendOptions {
  return {
    templateVersion: overrides.templateVersion?.trim() || base.templateVersion,
    from: overrides.from?.trim() || base.from,
    fromName: overrides.fromName?.trim() || base.fromName,
    replyTo: overrides.replyTo?.trim() || base.replyTo,
    idempotencyKey: overrides.idempotencyKey?.trim() || base.idempotencyKey,
  };
}
