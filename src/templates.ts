import type { EmailsDoneClient } from "./client.js";
import type {
  SendEmailResponse,
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
  CreditsExhaustedOptions,
  CreditsLowOptions,
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
  ExportReadyOptions,
  GenerationCompleteOptions,
  ImportCompleteOptions,
  JobCompleteOptions,
  ProcessingFailedOptions,
  QueuedRequestReadyOptions,
  ReportReadyOptions,
  UploadCompleteOptions,
  AnnouncementOptions,
  DigestOptions,
  NotificationAlertOptions,
  NotificationInfoOptions,
  NotificationSuccessOptions,
  NotificationWarningOptions,
  ReminderOptions,
  ApprovalApprovedOptions,
  ApprovalNeededOptions,
  ApprovalRejectedOptions,
  InvitationAcceptedOptions,
  InvitedToWorkspaceOptions,
  RoleChangedOptions,
  TeamMemberAddedOptions,
  TeamMemberRemovedOptions,
} from "./types.js";

export class SendTemplates {
  readonly authentication: AuthenticationTemplates;
  readonly billing: BillingTemplates;
  readonly developer: DeveloperTemplates;
  readonly notification: NotificationTemplates;
  readonly team: TeamTemplates;

  constructor(client: EmailsDoneClient) {
    this.authentication = new AuthenticationTemplates(client);
    this.billing = new BillingTemplates(client);
    this.developer = new DeveloperTemplates(client);
    this.notification = new NotificationTemplates(client);
    this.team = new TeamTemplates(client);
  }
}

export class AuthenticationTemplates {
  constructor(private readonly client: EmailsDoneClient) {}

  async accountLocked(to: string, options: AccountLockedOptions = {}): Promise<SendEmailResponse> {
    requireRecipient(to);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "lockDetails.lockedAt", options.lockDetailsLockedAt);
    setNested(data, "lockDetails.reason", options.lockDetailsReason);
    setNested(data, "notice", options.notice);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return this.client.sendTemplate({
      templateId: "account-locked",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async emailChanged(to: string, options: EmailChangedOptions = {}): Promise<SendEmailResponse> {
    requireRecipient(to);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "changeDetails.changedAt", options.changeDetailsChangedAt);
    setNested(data, "changeDetails.newEmail", options.changeDetailsNewEmail);
    setNested(data, "changeDetails.oldEmail", options.changeDetailsOldEmail);
    setNested(data, "footerNote", options.footerNote);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return this.client.sendTemplate({
      templateId: "email-changed",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async loginCode(to: string, options: LoginCodeOptions): Promise<SendEmailResponse> {
    requireRecipient(to);
    requireValue("code", options.code);
    const data: Record<string, unknown> = {};
    setNested(data, "code", options.code);
    setNested(data, "footerNote", options.footerNote);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "preheader", options.preheader);
    setNested(data, "securityNote", options.securityNote);
    setNested(data, "subject", options.subject);

    return this.client.sendTemplate({
      templateId: "login-code",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async magicLink(to: string, options: MagicLinkOptions): Promise<SendEmailResponse> {
    requireRecipient(to);
    requireValue("actionButtonUrl", options.actionButtonUrl);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "footerNote", options.footerNote);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return this.client.sendTemplate({
      templateId: "magic-link",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async mfaDisabled(to: string, options: MfaDisabledOptions = {}): Promise<SendEmailResponse> {
    requireRecipient(to);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "footerNote", options.footerNote);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "notice", options.notice);
    setNested(data, "preheader", options.preheader);
    setNested(data, "securityDetails.country", options.securityDetailsCountry);
    setNested(data, "securityDetails.device", options.securityDetailsDevice);
    setNested(data, "securityDetails.disabledAt", options.securityDetailsDisabledAt);
    setNested(data, "securityDetails.ip", options.securityDetailsIp);
    setNested(data, "subject", options.subject);

    return this.client.sendTemplate({
      templateId: "mfa-disabled",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async mfaEnabled(to: string, options: MfaEnabledOptions = {}): Promise<SendEmailResponse> {
    requireRecipient(to);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "footerNote", options.footerNote);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "notice", options.notice);
    setNested(data, "preheader", options.preheader);
    setNested(data, "securityDetails.device", options.securityDetailsDevice);
    setNested(data, "securityDetails.enabledAt", options.securityDetailsEnabledAt);
    setNested(data, "securityDetails.method", options.securityDetailsMethod);
    setNested(data, "subject", options.subject);

    return this.client.sendTemplate({
      templateId: "mfa-enabled",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async newDeviceLogin(to: string, options: NewDeviceLoginOptions = {}): Promise<SendEmailResponse> {
    requireRecipient(to);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "footerNote", options.footerNote);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "loginDetails.country", options.loginDetailsCountry);
    setNested(data, "loginDetails.device", options.loginDetailsDevice);
    setNested(data, "loginDetails.ip", options.loginDetailsIp);
    setNested(data, "loginDetails.signedInAt", options.loginDetailsSignedInAt);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return this.client.sendTemplate({
      templateId: "new-device-login",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async passwordChanged(to: string, options: PasswordChangedOptions = {}): Promise<SendEmailResponse> {
    requireRecipient(to);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "changeDetails.changedAt", options.changeDetailsChangedAt);
    setNested(data, "changeDetails.country", options.changeDetailsCountry);
    setNested(data, "changeDetails.device", options.changeDetailsDevice);
    setNested(data, "changeDetails.ip", options.changeDetailsIp);
    setNested(data, "footerNote", options.footerNote);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return this.client.sendTemplate({
      templateId: "password-changed",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async passwordReset(to: string, options: PasswordResetOptions): Promise<SendEmailResponse> {
    requireRecipient(to);
    requireValue("actionButtonUrl", options.actionButtonUrl);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "footerNote", options.footerNote);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "preheader", options.preheader);
    setNested(data, "requestDetails.country", options.requestDetailsCountry);
    setNested(data, "requestDetails.device", options.requestDetailsDevice);
    setNested(data, "requestDetails.ip", options.requestDetailsIp);
    setNested(data, "requestDetails.requestedAt", options.requestDetailsRequestedAt);
    setNested(data, "securityNote", options.securityNote);
    setNested(data, "subject", options.subject);

    return this.client.sendTemplate({
      templateId: "password-reset",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async suspiciousLogin(to: string, options: SuspiciousLoginOptions = {}): Promise<SendEmailResponse> {
    requireRecipient(to);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "loginDetails.attemptedAt", options.loginDetailsAttemptedAt);
    setNested(data, "loginDetails.country", options.loginDetailsCountry);
    setNested(data, "loginDetails.device", options.loginDetailsDevice);
    setNested(data, "loginDetails.ip", options.loginDetailsIp);
    setNested(data, "notice", options.notice);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return this.client.sendTemplate({
      templateId: "suspicious-login",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async verifyEmail(to: string, options: VerifyEmailOptions): Promise<SendEmailResponse> {
    requireRecipient(to);
    requireValue("actionButtonUrl", options.actionButtonUrl);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "footerNote", options.footerNote);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "preheader", options.preheader);
    setNested(data, "securityNote", options.securityNote);
    setNested(data, "subject", options.subject);

    return this.client.sendTemplate({
      templateId: "verify-email",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async welcome(to: string, options: WelcomeOptions): Promise<SendEmailResponse> {
    requireRecipient(to);
    requireValue("actionButtonUrl", options.actionButtonUrl);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "callToActionHeading", options.callToActionHeading);
    setNested(data, "callToActionParagraph", options.callToActionParagraph);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return this.client.sendTemplate({
      templateId: "welcome",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }
}

export class BillingTemplates {
  constructor(private readonly client: EmailsDoneClient) {}

  async creditsExhausted(to: string, options: CreditsExhaustedOptions): Promise<SendEmailResponse> {
    requireRecipient(to);
    requireValue("actionButtonUrl", options.actionButtonUrl);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "creditDetails.periodEndsAt", options.creditDetailsPeriodEndsAt);
    setNested(data, "creditDetails.remaining", options.creditDetailsRemaining);
    setNested(data, "creditDetails.used", options.creditDetailsUsed);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return this.client.sendTemplate({
      templateId: "credits-exhausted",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async creditsLow(to: string, options: CreditsLowOptions = {}): Promise<SendEmailResponse> {
    requireRecipient(to);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "creditDetails.periodEndsAt", options.creditDetailsPeriodEndsAt);
    setNested(data, "creditDetails.remaining", options.creditDetailsRemaining);
    setNested(data, "creditDetails.threshold", options.creditDetailsThreshold);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return this.client.sendTemplate({
      templateId: "credits-low",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async invoice(to: string, options: InvoiceOptions): Promise<SendEmailResponse> {
    requireRecipient(to);
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

    return this.client.sendTemplate({
      templateId: "invoice",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async invoiceOverdue(to: string, options: InvoiceOverdueOptions): Promise<SendEmailResponse> {
    requireRecipient(to);
    requireValue("actionButtonUrl", options.actionButtonUrl);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "invoiceDetails.amount", options.invoiceDetailsAmount);
    setNested(data, "invoiceDetails.daysOverdue", options.invoiceDetailsDaysOverdue);
    setNested(data, "invoiceDetails.dueDate", options.invoiceDetailsDueDate);
    setNested(data, "invoiceDetails.invoiceNumber", options.invoiceDetailsInvoiceNumber);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return this.client.sendTemplate({
      templateId: "invoice-overdue",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async paymentFailed(to: string, options: PaymentFailedOptions): Promise<SendEmailResponse> {
    requireRecipient(to);
    requireValue("actionButtonUrl", options.actionButtonUrl);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionNote", options.actionNote);
    setNested(data, "footerNote", options.footerNote);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "paymentDetails.amount", options.paymentDetailsAmount);
    setNested(data, "paymentDetails.dueDate", options.paymentDetailsDueDate);
    setNested(data, "paymentDetails.paymentMethod", options.paymentDetailsPaymentMethod);
    setNested(data, "paymentDetails.reason", options.paymentDetailsReason);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return this.client.sendTemplate({
      templateId: "payment-failed",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async paymentSucceeded(to: string, options: PaymentSucceededOptions = {}): Promise<SendEmailResponse> {
    requireRecipient(to);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "paymentDetails.amount", options.paymentDetailsAmount);
    setNested(data, "paymentDetails.paidAt", options.paymentDetailsPaidAt);
    setNested(data, "paymentDetails.paymentMethod", options.paymentDetailsPaymentMethod);
    setNested(data, "paymentDetails.reference", options.paymentDetailsReference);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return this.client.sendTemplate({
      templateId: "payment-succeeded",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async refundIssued(to: string, options: RefundIssuedOptions = {}): Promise<SendEmailResponse> {
    requireRecipient(to);
    const data: Record<string, unknown> = {};
    setNested(data, "footerNote", options.footerNote);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "preheader", options.preheader);
    setNested(data, "refundDetails.amount", options.refundDetailsAmount);
    setNested(data, "refundDetails.issuedAt", options.refundDetailsIssuedAt);
    setNested(data, "refundDetails.paymentMethod", options.refundDetailsPaymentMethod);
    setNested(data, "refundDetails.reference", options.refundDetailsReference);
    setNested(data, "subject", options.subject);

    return this.client.sendTemplate({
      templateId: "refund-issued",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async subscriptionCancelled(to: string, options: SubscriptionCancelledOptions = {}): Promise<SendEmailResponse> {
    requireRecipient(to);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);
    setNested(data, "subscriptionDetails.accessEndsAt", options.subscriptionDetailsAccessEndsAt);
    setNested(data, "subscriptionDetails.cancelledAt", options.subscriptionDetailsCancelledAt);
    setNested(data, "subscriptionDetails.plan", options.subscriptionDetailsPlan);

    return this.client.sendTemplate({
      templateId: "subscription-cancelled",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async subscriptionPaused(to: string, options: SubscriptionPausedOptions = {}): Promise<SendEmailResponse> {
    requireRecipient(to);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);
    setNested(data, "subscriptionDetails.pausedAt", options.subscriptionDetailsPausedAt);
    setNested(data, "subscriptionDetails.plan", options.subscriptionDetailsPlan);
    setNested(data, "subscriptionDetails.resumesAt", options.subscriptionDetailsResumesAt);

    return this.client.sendTemplate({
      templateId: "subscription-paused",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async subscriptionRenewed(to: string, options: SubscriptionRenewedOptions = {}): Promise<SendEmailResponse> {
    requireRecipient(to);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);
    setNested(data, "subscriptionDetails.amount", options.subscriptionDetailsAmount);
    setNested(data, "subscriptionDetails.nextRenewalAt", options.subscriptionDetailsNextRenewalAt);
    setNested(data, "subscriptionDetails.plan", options.subscriptionDetailsPlan);
    setNested(data, "subscriptionDetails.renewedAt", options.subscriptionDetailsRenewedAt);

    return this.client.sendTemplate({
      templateId: "subscription-renewed",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async subscriptionStarted(to: string, options: SubscriptionStartedOptions = {}): Promise<SendEmailResponse> {
    requireRecipient(to);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);
    setNested(data, "subscriptionDetails.amount", options.subscriptionDetailsAmount);
    setNested(data, "subscriptionDetails.plan", options.subscriptionDetailsPlan);
    setNested(data, "subscriptionDetails.renewsAt", options.subscriptionDetailsRenewsAt);
    setNested(data, "subscriptionDetails.startedAt", options.subscriptionDetailsStartedAt);

    return this.client.sendTemplate({
      templateId: "subscription-started",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async trialEnding(to: string, options: TrialEndingOptions): Promise<SendEmailResponse> {
    requireRecipient(to);
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

    return this.client.sendTemplate({
      templateId: "trial-ending",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async trialStarted(to: string, options: TrialStartedOptions = {}): Promise<SendEmailResponse> {
    requireRecipient(to);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);
    setNested(data, "trialDetails.endsAt", options.trialDetailsEndsAt);
    setNested(data, "trialDetails.plan", options.trialDetailsPlan);
    setNested(data, "trialDetails.startedAt", options.trialDetailsStartedAt);

    return this.client.sendTemplate({
      templateId: "trial-started",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async usageThreshold(to: string, options: UsageThresholdOptions): Promise<SendEmailResponse> {
    requireRecipient(to);
    requireValue("message", options.message);
    const data: Record<string, unknown> = {};
    setNested(data, "message", options.message);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);
    setNested(data, "usageDetails.limit", options.usageDetailsLimit);
    setNested(data, "usageDetails.percentage", options.usageDetailsPercentage);
    setNested(data, "usageDetails.periodEndsAt", options.usageDetailsPeriodEndsAt);
    setNested(data, "usageDetails.used", options.usageDetailsUsed);

    return this.client.sendTemplate({
      templateId: "usage-threshold",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }
}

export class DeveloperTemplates {
  constructor(private readonly client: EmailsDoneClient) {}

  async apiKeyCreated(to: string, options: ApiKeyCreatedOptions = {}): Promise<SendEmailResponse> {
    requireRecipient(to);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "apiKeyDetails.createdAt", options.apiKeyDetailsCreatedAt);
    setNested(data, "apiKeyDetails.createdBy", options.apiKeyDetailsCreatedBy);
    setNested(data, "apiKeyDetails.environment", options.apiKeyDetailsEnvironment);
    setNested(data, "apiKeyDetails.name", options.apiKeyDetailsName);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "notice", options.notice);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return this.client.sendTemplate({
      templateId: "api-key-created",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async apiKeyRotated(to: string, options: ApiKeyRotatedOptions = {}): Promise<SendEmailResponse> {
    requireRecipient(to);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "apiKeyDetails.environment", options.apiKeyDetailsEnvironment);
    setNested(data, "apiKeyDetails.name", options.apiKeyDetailsName);
    setNested(data, "apiKeyDetails.rotatedAt", options.apiKeyDetailsRotatedAt);
    setNested(data, "apiKeyDetails.rotatedBy", options.apiKeyDetailsRotatedBy);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return this.client.sendTemplate({
      templateId: "api-key-rotated",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async exportReady(to: string, options: ExportReadyOptions): Promise<SendEmailResponse> {
    requireRecipient(to);
    requireValue("actionButtonUrl", options.actionButtonUrl);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "exportDetails.createdAt", options.exportDetailsCreatedAt);
    setNested(data, "exportDetails.expiresAt", options.exportDetailsExpiresAt);
    setNested(data, "exportDetails.format", options.exportDetailsFormat);
    setNested(data, "exportDetails.size", options.exportDetailsSize);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return this.client.sendTemplate({
      templateId: "export-ready",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async generationComplete(to: string, options: GenerationCompleteOptions): Promise<SendEmailResponse> {
    requireRecipient(to);
    requireValue("actionButtonUrl", options.actionButtonUrl);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "generationDetails.completedAt", options.generationDetailsCompletedAt);
    setNested(data, "generationDetails.reference", options.generationDetailsReference);
    setNested(data, "generationDetails.type", options.generationDetailsType);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return this.client.sendTemplate({
      templateId: "generation-complete",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async importComplete(to: string, options: ImportCompleteOptions = {}): Promise<SendEmailResponse> {
    requireRecipient(to);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "importDetails.completedAt", options.importDetailsCompletedAt);
    setNested(data, "importDetails.fileName", options.importDetailsFileName);
    setNested(data, "importDetails.recordsImported", options.importDetailsRecordsImported);
    setNested(data, "importDetails.recordsSkipped", options.importDetailsRecordsSkipped);
    setNested(data, "message", options.message);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return this.client.sendTemplate({
      templateId: "import-complete",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async jobComplete(to: string, options: JobCompleteOptions = {}): Promise<SendEmailResponse> {
    requireRecipient(to);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "jobDetails.completedAt", options.jobDetailsCompletedAt);
    setNested(data, "jobDetails.duration", options.jobDetailsDuration);
    setNested(data, "jobDetails.jobName", options.jobDetailsJobName);
    setNested(data, "jobDetails.reference", options.jobDetailsReference);
    setNested(data, "message", options.message);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return this.client.sendTemplate({
      templateId: "job-complete",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async processingFailed(to: string, options: ProcessingFailedOptions = {}): Promise<SendEmailResponse> {
    requireRecipient(to);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "message", options.message);
    setNested(data, "preheader", options.preheader);
    setNested(data, "processingDetails.failedAt", options.processingDetailsFailedAt);
    setNested(data, "processingDetails.item", options.processingDetailsItem);
    setNested(data, "processingDetails.reason", options.processingDetailsReason);
    setNested(data, "processingDetails.reference", options.processingDetailsReference);
    setNested(data, "subject", options.subject);

    return this.client.sendTemplate({
      templateId: "processing-failed",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async queuedRequestReady(to: string, options: QueuedRequestReadyOptions): Promise<SendEmailResponse> {
    requireRecipient(to);
    requireValue("actionButtonUrl", options.actionButtonUrl);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "preheader", options.preheader);
    setNested(data, "requestDetails.completedAt", options.requestDetailsCompletedAt);
    setNested(data, "requestDetails.reference", options.requestDetailsReference);
    setNested(data, "requestDetails.requestedAt", options.requestDetailsRequestedAt);
    setNested(data, "subject", options.subject);

    return this.client.sendTemplate({
      templateId: "queued-request-ready",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async reportReady(to: string, options: ReportReadyOptions): Promise<SendEmailResponse> {
    requireRecipient(to);
    requireValue("actionButtonUrl", options.actionButtonUrl);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "preheader", options.preheader);
    setNested(data, "reportDetails.createdAt", options.reportDetailsCreatedAt);
    setNested(data, "reportDetails.name", options.reportDetailsName);
    setNested(data, "reportDetails.period", options.reportDetailsPeriod);
    setNested(data, "subject", options.subject);

    return this.client.sendTemplate({
      templateId: "report-ready",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async uploadComplete(to: string, options: UploadCompleteOptions = {}): Promise<SendEmailResponse> {
    requireRecipient(to);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "message", options.message);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);
    setNested(data, "uploadDetails.fileName", options.uploadDetailsFileName);
    setNested(data, "uploadDetails.size", options.uploadDetailsSize);
    setNested(data, "uploadDetails.uploadedAt", options.uploadDetailsUploadedAt);

    return this.client.sendTemplate({
      templateId: "upload-complete",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }
}

export class NotificationTemplates {
  constructor(private readonly client: EmailsDoneClient) {}

  async announcement(to: string, options: AnnouncementOptions): Promise<SendEmailResponse> {
    requireRecipient(to);
    requireValue("message", options.message);
    const data: Record<string, unknown> = {};
    setNested(data, "message", options.message);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return this.client.sendTemplate({
      templateId: "announcement",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async digest(to: string, options: DigestOptions = {}): Promise<SendEmailResponse> {
    requireRecipient(to);
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

    return this.client.sendTemplate({
      templateId: "digest",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async notificationAlert(to: string, options: NotificationAlertOptions): Promise<SendEmailResponse> {
    requireRecipient(to);
    requireValue("message", options.message);
    const data: Record<string, unknown> = {};
    setNested(data, "message", options.message);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "alertDetails.severity", options.alertDetailsSeverity);
    setNested(data, "alertDetails.source", options.alertDetailsSource);
    setNested(data, "alertDetails.time", options.alertDetailsTime);
    setNested(data, "heading", options.heading);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return this.client.sendTemplate({
      templateId: "notification-alert",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async notificationInfo(to: string, options: NotificationInfoOptions): Promise<SendEmailResponse> {
    requireRecipient(to);
    requireValue("message", options.message);
    const data: Record<string, unknown> = {};
    setNested(data, "message", options.message);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return this.client.sendTemplate({
      templateId: "notification-info",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async notificationSuccess(to: string, options: NotificationSuccessOptions): Promise<SendEmailResponse> {
    requireRecipient(to);
    requireValue("message", options.message);
    const data: Record<string, unknown> = {};
    setNested(data, "message", options.message);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return this.client.sendTemplate({
      templateId: "notification-success",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async notificationWarning(to: string, options: NotificationWarningOptions): Promise<SendEmailResponse> {
    requireRecipient(to);
    requireValue("message", options.message);
    const data: Record<string, unknown> = {};
    setNested(data, "message", options.message);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return this.client.sendTemplate({
      templateId: "notification-warning",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async reminder(to: string, options: ReminderOptions): Promise<SendEmailResponse> {
    requireRecipient(to);
    requireValue("message", options.message);
    const data: Record<string, unknown> = {};
    setNested(data, "message", options.message);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "preheader", options.preheader);
    setNested(data, "reminderDetails.dueAt", options.reminderDetailsDueAt);
    setNested(data, "reminderDetails.reference", options.reminderDetailsReference);
    setNested(data, "subject", options.subject);

    return this.client.sendTemplate({
      templateId: "reminder",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }
}

export class TeamTemplates {
  constructor(private readonly client: EmailsDoneClient) {}

  async approvalApproved(to: string, options: ApprovalApprovedOptions): Promise<SendEmailResponse> {
    requireRecipient(to);
    requireValue("message", options.message);
    const data: Record<string, unknown> = {};
    setNested(data, "message", options.message);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "approvalDetails.approvedAt", options.approvalDetailsApprovedAt);
    setNested(data, "approvalDetails.approvedBy", options.approvalDetailsApprovedBy);
    setNested(data, "approvalDetails.item", options.approvalDetailsItem);
    setNested(data, "heading", options.heading);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return this.client.sendTemplate({
      templateId: "approval-approved",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async approvalNeeded(to: string, options: ApprovalNeededOptions): Promise<SendEmailResponse> {
    requireRecipient(to);
    requireValue("actionButtonUrl", options.actionButtonUrl);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "approvalDetails.item", options.approvalDetailsItem);
    setNested(data, "approvalDetails.requestedAt", options.approvalDetailsRequestedAt);
    setNested(data, "approvalDetails.requestedBy", options.approvalDetailsRequestedBy);
    setNested(data, "heading", options.heading);
    setNested(data, "message", options.message);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return this.client.sendTemplate({
      templateId: "approval-needed",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async approvalRejected(to: string, options: ApprovalRejectedOptions): Promise<SendEmailResponse> {
    requireRecipient(to);
    requireValue("message", options.message);
    const data: Record<string, unknown> = {};
    setNested(data, "message", options.message);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "approvalDetails.item", options.approvalDetailsItem);
    setNested(data, "approvalDetails.reason", options.approvalDetailsReason);
    setNested(data, "approvalDetails.reviewedAt", options.approvalDetailsReviewedAt);
    setNested(data, "approvalDetails.reviewedBy", options.approvalDetailsReviewedBy);
    setNested(data, "heading", options.heading);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return this.client.sendTemplate({
      templateId: "approval-rejected",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async invitationAccepted(to: string, options: InvitationAcceptedOptions = {}): Promise<SendEmailResponse> {
    requireRecipient(to);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "inviteDetails.acceptedAt", options.inviteDetailsAcceptedAt);
    setNested(data, "inviteDetails.acceptedBy", options.inviteDetailsAcceptedBy);
    setNested(data, "inviteDetails.role", options.inviteDetailsRole);
    setNested(data, "inviteDetails.workspace", options.inviteDetailsWorkspace);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return this.client.sendTemplate({
      templateId: "invitation-accepted",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async invitedToWorkspace(to: string, options: InvitedToWorkspaceOptions): Promise<SendEmailResponse> {
    requireRecipient(to);
    requireValue("actionButtonUrl", options.actionButtonUrl);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "inviteDetails.expiresAt", options.inviteDetailsExpiresAt);
    setNested(data, "inviteDetails.invitedBy", options.inviteDetailsInvitedBy);
    setNested(data, "inviteDetails.role", options.inviteDetailsRole);
    setNested(data, "inviteDetails.workspace", options.inviteDetailsWorkspace);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return this.client.sendTemplate({
      templateId: "invited-to-workspace",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async roleChanged(to: string, options: RoleChangedOptions = {}): Promise<SendEmailResponse> {
    requireRecipient(to);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "preheader", options.preheader);
    setNested(data, "roleDetails.changedAt", options.roleDetailsChangedAt);
    setNested(data, "roleDetails.member", options.roleDetailsMember);
    setNested(data, "roleDetails.newRole", options.roleDetailsNewRole);
    setNested(data, "roleDetails.previousRole", options.roleDetailsPreviousRole);
    setNested(data, "subject", options.subject);

    return this.client.sendTemplate({
      templateId: "role-changed",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async teamMemberAdded(to: string, options: TeamMemberAddedOptions = {}): Promise<SendEmailResponse> {
    requireRecipient(to);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "memberDetails.addedAt", options.memberDetailsAddedAt);
    setNested(data, "memberDetails.email", options.memberDetailsEmail);
    setNested(data, "memberDetails.name", options.memberDetailsName);
    setNested(data, "memberDetails.role", options.memberDetailsRole);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return this.client.sendTemplate({
      templateId: "team-member-added",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
  }

  async teamMemberRemoved(to: string, options: TeamMemberRemovedOptions = {}): Promise<SendEmailResponse> {
    requireRecipient(to);
    const data: Record<string, unknown> = {};
    setNested(data, "actionButton.label", options.actionButtonLabel);
    setNested(data, "actionButton.url", options.actionButtonUrl);
    setNested(data, "heading", options.heading);
    setNested(data, "intro", options.intro);
    setNested(data, "memberDetails.email", options.memberDetailsEmail);
    setNested(data, "memberDetails.name", options.memberDetailsName);
    setNested(data, "memberDetails.removedAt", options.memberDetailsRemovedAt);
    setNested(data, "preheader", options.preheader);
    setNested(data, "subject", options.subject);

    return this.client.sendTemplate({
      templateId: "team-member-removed",
      to,
      data,
      templateVersion: options.templateVersion,
      from: options.from,
      fromName: options.fromName,
      replyTo: options.replyTo,
      idempotencyKey: options.idempotencyKey,
    });
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
