export interface EmailsDoneOptions {
  apiKey: string;
  apiBaseUrl?: string;
}

export type EmailsDoneClientOptions = EmailsDoneOptions;

export interface GetRecipientStatusOptions {
  limit?: number | undefined;
}

export interface SendOptions {
  templateVersion?: string | undefined;
  from?: string | undefined;
  fromName?: string | undefined;
  replyTo?: string | undefined;
  idempotencyKey?: string | undefined;
}

export interface SendTemplatePayload extends SendOptions {
  templateId: string;
  to: string;
  data: Record<string, unknown>;
}

export interface TemplateOptions extends SendOptions {
  [key: string]: unknown;
}

export interface SendEmailResponse {
  idempotent: boolean;
  messageId: string;
  ok: boolean;
  status: "accepted";
}

export interface GetQuotaQuotaEnvironment {
  usedThisMonth: number;
}

export interface GetQuotaQuotaMonthly {
  limit: number;
  remaining: number;
  status: string;
  used: number;
}

export interface GetQuotaQuotaPeriod {
  id: string;
}

export interface GetQuotaQuota {
  accessStatus: string;
  environment: GetQuotaQuotaEnvironment;
  environmentId: string;
  monthly: GetQuotaQuotaMonthly;
  period: GetQuotaQuotaPeriod;
  planId: string;
  projectId: string;
  sendingStatus: string;
  tenantId: string;
}

export interface GetQuotaResponse {
  ok: boolean;
  quota: GetQuotaQuota;
}

export interface GetRecipientStatusRecipientDelivery {
  complainedAt?: string;
  complaintCount: number;
  cooldownUntil?: string;
  hardBounceCount: number;
}

export interface GetRecipientStatusRecipientSubscription {
  resubscribedAt?: string;
  scope?: string;
  status: string;
  unsubscribedAt?: string;
}

export interface GetRecipientStatusRecipient {
  canSendNotifications: boolean;
  delivery: GetRecipientStatusRecipientDelivery;
  emailMasked: string;
  recipientDomain: string;
  state: string;
  subscription: GetRecipientStatusRecipientSubscription;
}

export interface GetRecipientStatusResponse {
  messages: Array<Record<string, unknown>>;
  ok: boolean;
  recipient: GetRecipientStatusRecipient;
}

export interface ResubscribeRecipientResponse {
  ok: boolean;
}

export interface AccountLockedOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  heading?: string;
  intro?: string;
  lockDetails?: { lockedAt?: string; reason?: string };
  notice?: string;
  preheader?: string;
  subject?: string;
}

export interface EmailChangedOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  changeDetails?: { changedAt?: string; newEmail?: string; oldEmail?: string };
  footerNote?: string;
  heading?: string;
  intro?: string;
  preheader?: string;
  subject?: string;
}

export interface LoginCodeOptions extends SendOptions {
  footerNote?: string;
  heading?: string;
  intro?: string;
  preheader?: string;
  securityNote?: string;
  subject?: string;
}

export interface MagicLinkOptions extends SendOptions {
  actionButtonLabel?: string;
  footerNote?: string;
  heading?: string;
  intro?: string;
  preheader?: string;
  subject?: string;
}

export interface MfaDisabledOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  footerNote?: string;
  heading?: string;
  intro?: string;
  notice?: string;
  preheader?: string;
  securityDetails?: { country?: string; device?: string; disabledAt?: string; ip?: string };
  subject?: string;
}

export interface MfaEnabledOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  footerNote?: string;
  heading?: string;
  intro?: string;
  notice?: string;
  preheader?: string;
  securityDetails?: { device?: string; enabledAt?: string; method?: string };
  subject?: string;
}

export interface NewDeviceLoginOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  footerNote?: string;
  heading?: string;
  intro?: string;
  loginDetails?: { country?: string; device?: string; ip?: string; signedInAt?: string };
  preheader?: string;
  subject?: string;
}

export interface PasswordChangedOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  changeDetails?: { changedAt?: string; country?: string; device?: string; ip?: string };
  footerNote?: string;
  heading?: string;
  intro?: string;
  preheader?: string;
  subject?: string;
}

export interface PasswordResetOptions extends SendOptions {
  actionButtonLabel?: string;
  footerNote?: string;
  heading?: string;
  intro?: string;
  preheader?: string;
  requestDetails?: { country?: string; device?: string; ip?: string; requestedAt?: string };
  securityNote?: string;
  subject?: string;
}

export interface SuspiciousLoginOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  heading?: string;
  intro?: string;
  loginDetails?: { attemptedAt?: string; country?: string; device?: string; ip?: string };
  notice?: string;
  preheader?: string;
  subject?: string;
}

export interface VerifyEmailOptions extends SendOptions {
  actionButtonLabel?: string;
  footerNote?: string;
  heading?: string;
  intro?: string;
  preheader?: string;
  securityNote?: string;
  subject?: string;
}

export interface WelcomeOptions extends SendOptions {
  actionButtonLabel?: string;
  callToActionHeading?: string;
  callToActionParagraph?: string;
  heading?: string;
  intro?: string;
  preheader?: string;
  subject?: string;
}

export interface InvoiceOptions extends SendOptions {
  invoice: Record<string, unknown>;
  invoiceNumber: string;
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  heading?: string;
  intro?: string;
  preheader?: string;
  subject?: string;
}

export interface InvoiceOverdueOptions extends SendOptions {
  actionButtonUrl: string;
  actionButtonLabel?: string;
  heading?: string;
  intro?: string;
  invoiceDetails?: { amount?: string; daysOverdue?: number; dueDate?: string; invoiceNumber?: string };
  preheader?: string;
  subject?: string;
}

export interface PaymentFailedOptions extends SendOptions {
  actionButtonUrl: string;
  actionButtonLabel?: string;
  actionNote?: string;
  footerNote?: string;
  heading?: string;
  intro?: string;
  paymentDetails?: { amount?: string; dueDate?: string; paymentMethod?: string; reason?: string };
  preheader?: string;
  subject?: string;
}

export interface PaymentSucceededOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  heading?: string;
  intro?: string;
  paymentDetails?: { amount?: string; paidAt?: string; paymentMethod?: string; reference?: string };
  preheader?: string;
  subject?: string;
}

export interface RefundIssuedOptions extends SendOptions {
  footerNote?: string;
  heading?: string;
  intro?: string;
  preheader?: string;
  refundDetails?: { amount?: string; issuedAt?: string; paymentMethod?: string; reference?: string };
  subject?: string;
}

export interface SubscriptionCancelledOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  heading?: string;
  intro?: string;
  preheader?: string;
  subject?: string;
  subscriptionDetails?: { accessEndsAt?: string; cancelledAt?: string; plan?: string };
}

export interface SubscriptionPausedOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  heading?: string;
  intro?: string;
  preheader?: string;
  subject?: string;
  subscriptionDetails?: { pausedAt?: string; plan?: string; resumesAt?: string };
}

export interface SubscriptionRenewedOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  heading?: string;
  intro?: string;
  preheader?: string;
  subject?: string;
  subscriptionDetails?: { amount?: string; nextRenewalAt?: string; plan?: string; renewedAt?: string };
}

export interface SubscriptionStartedOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  heading?: string;
  intro?: string;
  preheader?: string;
  subject?: string;
  subscriptionDetails?: { amount?: string; plan?: string; renewsAt?: string; startedAt?: string };
}

export interface TrialEndingOptions extends SendOptions {
  actionButtonUrl: string;
  trialEndDate: string;
  actionButtonLabel?: string;
  heading?: string;
  intro?: string;
  preheader?: string;
  subject?: string;
  upgradeNote?: string;
}

export interface TrialStartedOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  heading?: string;
  intro?: string;
  preheader?: string;
  subject?: string;
  trialDetails?: { endsAt?: string; plan?: string; startedAt?: string };
}

export interface UsageThresholdOptions extends SendOptions {
  message: string;
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  heading?: string;
  preheader?: string;
  subject?: string;
  usageDetails?: { limit?: number; percentage?: number; periodEndsAt?: string; used?: number };
}

export interface ApiKeyCreatedOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  apiKeyDetails?: { createdAt?: string; createdBy?: string; environment?: string; name?: string };
  heading?: string;
  intro?: string;
  notice?: string;
  preheader?: string;
  subject?: string;
}

export interface ApiKeyRotatedOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  apiKeyDetails?: { environment?: string; name?: string; rotatedAt?: string; rotatedBy?: string };
  heading?: string;
  intro?: string;
  preheader?: string;
  subject?: string;
}

export interface CreditsExhaustedOptions extends SendOptions {
  actionButtonUrl: string;
  actionButtonLabel?: string;
  creditDetails?: { periodEndsAt?: string; remaining?: number; used?: number };
  heading?: string;
  intro?: string;
  preheader?: string;
  subject?: string;
}

export interface CreditsLowOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  creditDetails?: { periodEndsAt?: string; remaining?: number; threshold?: number };
  heading?: string;
  intro?: string;
  preheader?: string;
  subject?: string;
}

export interface AnnouncementOptions extends SendOptions {
  message: string;
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  heading?: string;
  preheader?: string;
  subject?: string;
}

export interface ApprovalApprovedOptions extends SendOptions {
  message: string;
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  approvalDetails?: { approvedAt?: string; approvedBy?: string; item?: string };
  heading?: string;
  preheader?: string;
  subject?: string;
}

export interface ApprovalNeededOptions extends SendOptions {
  actionButtonUrl: string;
  actionButtonLabel?: string;
  approvalDetails?: { item?: string; requestedAt?: string; requestedBy?: string };
  heading?: string;
  message?: string;
  preheader?: string;
  subject?: string;
}

export interface ApprovalRejectedOptions extends SendOptions {
  message: string;
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  approvalDetails?: { item?: string; reason?: string; reviewedAt?: string; reviewedBy?: string };
  heading?: string;
  preheader?: string;
  subject?: string;
}

export interface DigestOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  heading?: string;
  intro?: string;
  message?: string;
  preheader?: string;
  subject?: string;
  summaryAlerts?: number;
  summaryNewItems?: number;
  summaryUpdates?: number;
}

export interface ExportReadyOptions extends SendOptions {
  actionButtonUrl: string;
  actionButtonLabel?: string;
  exportDetails?: { createdAt?: string; expiresAt?: string; format?: string; size?: string };
  heading?: string;
  intro?: string;
  preheader?: string;
  subject?: string;
}

export interface GenerationCompleteOptions extends SendOptions {
  actionButtonUrl: string;
  actionButtonLabel?: string;
  generationDetails?: { completedAt?: string; reference?: string; "type"?: string };
  heading?: string;
  intro?: string;
  preheader?: string;
  subject?: string;
}

export interface ImportCompleteOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  heading?: string;
  importDetails?: { completedAt?: string; fileName?: string; recordsImported?: number; recordsSkipped?: number };
  message?: string;
  preheader?: string;
  subject?: string;
}

export interface JobCompleteOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  heading?: string;
  jobDetails?: { completedAt?: string; duration?: string; jobName?: string; reference?: string };
  message?: string;
  preheader?: string;
  subject?: string;
}

export interface NotificationAlertOptions extends SendOptions {
  message: string;
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  alertDetails?: { severity?: string; source?: string; time?: string };
  heading?: string;
  preheader?: string;
  subject?: string;
}

export interface NotificationInfoOptions extends SendOptions {
  message: string;
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  heading?: string;
  preheader?: string;
  subject?: string;
}

export interface NotificationSuccessOptions extends SendOptions {
  message: string;
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  heading?: string;
  preheader?: string;
  subject?: string;
}

export interface NotificationWarningOptions extends SendOptions {
  message: string;
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  heading?: string;
  preheader?: string;
  subject?: string;
}

export interface ProcessingFailedOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  heading?: string;
  message?: string;
  preheader?: string;
  processingDetails?: { failedAt?: string; item?: string; reason?: string; reference?: string };
  subject?: string;
}

export interface QueuedRequestReadyOptions extends SendOptions {
  actionButtonUrl: string;
  actionButtonLabel?: string;
  heading?: string;
  intro?: string;
  preheader?: string;
  requestDetails?: { completedAt?: string; reference?: string; requestedAt?: string };
  subject?: string;
}

export interface ReminderOptions extends SendOptions {
  message: string;
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  heading?: string;
  preheader?: string;
  reminderDetails?: { dueAt?: string; reference?: string };
  subject?: string;
}

export interface ReportReadyOptions extends SendOptions {
  actionButtonUrl: string;
  actionButtonLabel?: string;
  heading?: string;
  intro?: string;
  preheader?: string;
  reportDetails?: { createdAt?: string; name?: string; period?: string };
  subject?: string;
}

export interface UploadCompleteOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  heading?: string;
  message?: string;
  preheader?: string;
  subject?: string;
  uploadDetails?: { fileName?: string; size?: string; uploadedAt?: string };
}

export interface InvitationAcceptedOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  heading?: string;
  intro?: string;
  inviteDetails?: { acceptedAt?: string; acceptedBy?: string; role?: string; workspace?: string };
  preheader?: string;
  subject?: string;
}

export interface InvitedToWorkspaceOptions extends SendOptions {
  actionButtonUrl: string;
  actionButtonLabel?: string;
  heading?: string;
  intro?: string;
  inviteDetails?: { expiresAt?: string; invitedBy?: string; role?: string; workspace?: string };
  preheader?: string;
  subject?: string;
}

export interface RoleChangedOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  heading?: string;
  intro?: string;
  preheader?: string;
  roleDetails?: { changedAt?: string; member?: string; newRole?: string; previousRole?: string };
  subject?: string;
}

export interface TeamMemberAddedOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  heading?: string;
  intro?: string;
  memberDetails?: { addedAt?: string; email?: string; name?: string; role?: string };
  preheader?: string;
  subject?: string;
}

export interface TeamMemberRemovedOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  heading?: string;
  intro?: string;
  memberDetails?: { email?: string; name?: string; removedAt?: string };
  preheader?: string;
  subject?: string;
}
