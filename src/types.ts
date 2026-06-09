export interface EmailsDoneClientOptions {
  apiKey: string;
  apiBaseUrl?: string;
}

export interface SendEmailResponse {
  ok: boolean;
  status?: string | null;
  messageId?: string | null;
  idempotent: boolean;
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

export type TemplateOptions = SendOptions & Record<string, unknown>;

export interface AccountLockedOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  heading?: string;
  intro?: string;
  lockDetailsLockedAt?: string;
  lockDetailsReason?: string;
  notice?: string;
  preheader?: string;
  subject?: string;
}

export interface EmailChangedOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  changeDetailsChangedAt?: string;
  changeDetailsNewEmail?: string;
  changeDetailsOldEmail?: string;
  footerNote?: string;
  heading?: string;
  intro?: string;
  preheader?: string;
  subject?: string;
}

export interface LoginCodeOptions extends SendOptions {
  code: string;
  footerNote?: string;
  heading?: string;
  intro?: string;
  preheader?: string;
  securityNote?: string;
  subject?: string;
}

export interface MagicLinkOptions extends SendOptions {
  actionButtonUrl: string;
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
  securityDetailsCountry?: string;
  securityDetailsDevice?: string;
  securityDetailsDisabledAt?: string;
  securityDetailsIp?: string;
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
  securityDetailsDevice?: string;
  securityDetailsEnabledAt?: string;
  securityDetailsMethod?: string;
  subject?: string;
}

export interface NewDeviceLoginOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  footerNote?: string;
  heading?: string;
  intro?: string;
  loginDetailsCountry?: string;
  loginDetailsDevice?: string;
  loginDetailsIp?: string;
  loginDetailsSignedInAt?: string;
  preheader?: string;
  subject?: string;
}

export interface PasswordChangedOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  changeDetailsChangedAt?: string;
  changeDetailsCountry?: string;
  changeDetailsDevice?: string;
  changeDetailsIp?: string;
  footerNote?: string;
  heading?: string;
  intro?: string;
  preheader?: string;
  subject?: string;
}

export interface PasswordResetOptions extends SendOptions {
  actionButtonUrl: string;
  actionButtonLabel?: string;
  footerNote?: string;
  heading?: string;
  intro?: string;
  preheader?: string;
  requestDetailsCountry?: string;
  requestDetailsDevice?: string;
  requestDetailsIp?: string;
  requestDetailsRequestedAt?: string;
  securityNote?: string;
  subject?: string;
}

export interface SuspiciousLoginOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  heading?: string;
  intro?: string;
  loginDetailsAttemptedAt?: string;
  loginDetailsCountry?: string;
  loginDetailsDevice?: string;
  loginDetailsIp?: string;
  notice?: string;
  preheader?: string;
  subject?: string;
}

export interface VerifyEmailOptions extends SendOptions {
  actionButtonUrl: string;
  actionButtonLabel?: string;
  footerNote?: string;
  heading?: string;
  intro?: string;
  preheader?: string;
  securityNote?: string;
  subject?: string;
}

export interface WelcomeOptions extends SendOptions {
  actionButtonUrl: string;
  actionButtonLabel?: string;
  callToActionHeading?: string;
  callToActionParagraph?: string;
  heading?: string;
  intro?: string;
  preheader?: string;
  subject?: string;
}

export interface CreditsExhaustedOptions extends SendOptions {
  actionButtonUrl: string;
  actionButtonLabel?: string;
  creditDetailsPeriodEndsAt?: string;
  creditDetailsRemaining?: number;
  creditDetailsUsed?: number;
  heading?: string;
  intro?: string;
  preheader?: string;
  subject?: string;
}

export interface CreditsLowOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  creditDetailsPeriodEndsAt?: string;
  creditDetailsRemaining?: number;
  creditDetailsThreshold?: number;
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
  invoiceDetailsAmount?: string;
  invoiceDetailsDaysOverdue?: number;
  invoiceDetailsDueDate?: string;
  invoiceDetailsInvoiceNumber?: string;
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
  paymentDetailsAmount?: string;
  paymentDetailsDueDate?: string;
  paymentDetailsPaymentMethod?: string;
  paymentDetailsReason?: string;
  preheader?: string;
  subject?: string;
}

export interface PaymentSucceededOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  heading?: string;
  intro?: string;
  paymentDetailsAmount?: string;
  paymentDetailsPaidAt?: string;
  paymentDetailsPaymentMethod?: string;
  paymentDetailsReference?: string;
  preheader?: string;
  subject?: string;
}

export interface RefundIssuedOptions extends SendOptions {
  footerNote?: string;
  heading?: string;
  intro?: string;
  preheader?: string;
  refundDetailsAmount?: string;
  refundDetailsIssuedAt?: string;
  refundDetailsPaymentMethod?: string;
  refundDetailsReference?: string;
  subject?: string;
}

export interface SubscriptionCancelledOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  heading?: string;
  intro?: string;
  preheader?: string;
  subject?: string;
  subscriptionDetailsAccessEndsAt?: string;
  subscriptionDetailsCancelledAt?: string;
  subscriptionDetailsPlan?: string;
}

export interface SubscriptionPausedOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  heading?: string;
  intro?: string;
  preheader?: string;
  subject?: string;
  subscriptionDetailsPausedAt?: string;
  subscriptionDetailsPlan?: string;
  subscriptionDetailsResumesAt?: string;
}

export interface SubscriptionRenewedOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  heading?: string;
  intro?: string;
  preheader?: string;
  subject?: string;
  subscriptionDetailsAmount?: string;
  subscriptionDetailsNextRenewalAt?: string;
  subscriptionDetailsPlan?: string;
  subscriptionDetailsRenewedAt?: string;
}

export interface SubscriptionStartedOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  heading?: string;
  intro?: string;
  preheader?: string;
  subject?: string;
  subscriptionDetailsAmount?: string;
  subscriptionDetailsPlan?: string;
  subscriptionDetailsRenewsAt?: string;
  subscriptionDetailsStartedAt?: string;
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
  trialDetailsEndsAt?: string;
  trialDetailsPlan?: string;
  trialDetailsStartedAt?: string;
}

export interface UsageThresholdOptions extends SendOptions {
  message: string;
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  heading?: string;
  preheader?: string;
  subject?: string;
  usageDetailsLimit?: number;
  usageDetailsPercentage?: number;
  usageDetailsPeriodEndsAt?: string;
  usageDetailsUsed?: number;
}

export interface ApiKeyCreatedOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  apiKeyDetailsCreatedAt?: string;
  apiKeyDetailsCreatedBy?: string;
  apiKeyDetailsEnvironment?: string;
  apiKeyDetailsName?: string;
  heading?: string;
  intro?: string;
  notice?: string;
  preheader?: string;
  subject?: string;
}

export interface ApiKeyRotatedOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  apiKeyDetailsEnvironment?: string;
  apiKeyDetailsName?: string;
  apiKeyDetailsRotatedAt?: string;
  apiKeyDetailsRotatedBy?: string;
  heading?: string;
  intro?: string;
  preheader?: string;
  subject?: string;
}

export interface ExportReadyOptions extends SendOptions {
  actionButtonUrl: string;
  actionButtonLabel?: string;
  exportDetailsCreatedAt?: string;
  exportDetailsExpiresAt?: string;
  exportDetailsFormat?: string;
  exportDetailsSize?: string;
  heading?: string;
  intro?: string;
  preheader?: string;
  subject?: string;
}

export interface GenerationCompleteOptions extends SendOptions {
  actionButtonUrl: string;
  actionButtonLabel?: string;
  generationDetailsCompletedAt?: string;
  generationDetailsReference?: string;
  generationDetailsType?: string;
  heading?: string;
  intro?: string;
  preheader?: string;
  subject?: string;
}

export interface ImportCompleteOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  heading?: string;
  importDetailsCompletedAt?: string;
  importDetailsFileName?: string;
  importDetailsRecordsImported?: number;
  importDetailsRecordsSkipped?: number;
  message?: string;
  preheader?: string;
  subject?: string;
}

export interface JobCompleteOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  heading?: string;
  jobDetailsCompletedAt?: string;
  jobDetailsDuration?: string;
  jobDetailsJobName?: string;
  jobDetailsReference?: string;
  message?: string;
  preheader?: string;
  subject?: string;
}

export interface ProcessingFailedOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  heading?: string;
  message?: string;
  preheader?: string;
  processingDetailsFailedAt?: string;
  processingDetailsItem?: string;
  processingDetailsReason?: string;
  processingDetailsReference?: string;
  subject?: string;
}

export interface QueuedRequestReadyOptions extends SendOptions {
  actionButtonUrl: string;
  actionButtonLabel?: string;
  heading?: string;
  intro?: string;
  preheader?: string;
  requestDetailsCompletedAt?: string;
  requestDetailsReference?: string;
  requestDetailsRequestedAt?: string;
  subject?: string;
}

export interface ReportReadyOptions extends SendOptions {
  actionButtonUrl: string;
  actionButtonLabel?: string;
  heading?: string;
  intro?: string;
  preheader?: string;
  reportDetailsCreatedAt?: string;
  reportDetailsName?: string;
  reportDetailsPeriod?: string;
  subject?: string;
}

export interface UploadCompleteOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  heading?: string;
  message?: string;
  preheader?: string;
  subject?: string;
  uploadDetailsFileName?: string;
  uploadDetailsSize?: string;
  uploadDetailsUploadedAt?: string;
}

export interface AnnouncementOptions extends SendOptions {
  message: string;
  actionButtonLabel?: string;
  actionButtonUrl?: string;
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

export interface NotificationAlertOptions extends SendOptions {
  message: string;
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  alertDetailsSeverity?: string;
  alertDetailsSource?: string;
  alertDetailsTime?: string;
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

export interface ReminderOptions extends SendOptions {
  message: string;
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  heading?: string;
  preheader?: string;
  reminderDetailsDueAt?: string;
  reminderDetailsReference?: string;
  subject?: string;
}

export interface ApprovalApprovedOptions extends SendOptions {
  message: string;
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  approvalDetailsApprovedAt?: string;
  approvalDetailsApprovedBy?: string;
  approvalDetailsItem?: string;
  heading?: string;
  preheader?: string;
  subject?: string;
}

export interface ApprovalNeededOptions extends SendOptions {
  actionButtonUrl: string;
  actionButtonLabel?: string;
  approvalDetailsItem?: string;
  approvalDetailsRequestedAt?: string;
  approvalDetailsRequestedBy?: string;
  heading?: string;
  message?: string;
  preheader?: string;
  subject?: string;
}

export interface ApprovalRejectedOptions extends SendOptions {
  message: string;
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  approvalDetailsItem?: string;
  approvalDetailsReason?: string;
  approvalDetailsReviewedAt?: string;
  approvalDetailsReviewedBy?: string;
  heading?: string;
  preheader?: string;
  subject?: string;
}

export interface InvitationAcceptedOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  heading?: string;
  intro?: string;
  inviteDetailsAcceptedAt?: string;
  inviteDetailsAcceptedBy?: string;
  inviteDetailsRole?: string;
  inviteDetailsWorkspace?: string;
  preheader?: string;
  subject?: string;
}

export interface InvitedToWorkspaceOptions extends SendOptions {
  actionButtonUrl: string;
  actionButtonLabel?: string;
  heading?: string;
  intro?: string;
  inviteDetailsExpiresAt?: string;
  inviteDetailsInvitedBy?: string;
  inviteDetailsRole?: string;
  inviteDetailsWorkspace?: string;
  preheader?: string;
  subject?: string;
}

export interface RoleChangedOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  heading?: string;
  intro?: string;
  preheader?: string;
  roleDetailsChangedAt?: string;
  roleDetailsMember?: string;
  roleDetailsNewRole?: string;
  roleDetailsPreviousRole?: string;
  subject?: string;
}

export interface TeamMemberAddedOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  heading?: string;
  intro?: string;
  memberDetailsAddedAt?: string;
  memberDetailsEmail?: string;
  memberDetailsName?: string;
  memberDetailsRole?: string;
  preheader?: string;
  subject?: string;
}

export interface TeamMemberRemovedOptions extends SendOptions {
  actionButtonLabel?: string;
  actionButtonUrl?: string;
  heading?: string;
  intro?: string;
  memberDetailsEmail?: string;
  memberDetailsName?: string;
  memberDetailsRemovedAt?: string;
  preheader?: string;
  subject?: string;
}
