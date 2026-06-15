export { EmailsDone, EmailsDone as EmailsDoneClient } from "./client.js";
export { EmailsDoneError } from "./errors.js";
export {
  AuthenticationTemplates,
  BillingTemplates,
  DeveloperTemplates,
  NotificationsTemplates,
  PendingTemplateRequest,
  RecipientClient,
  TeamTemplates,
} from "./templates.js";
export type {
  EmailsDoneClientOptions,
  EmailsDoneOptions,
  GetQuotaResponse,
  GetRecipientStatusOptions,
  GetRecipientStatusResponse,
  ResubscribeRecipientResponse,
  SendEmailResponse,
  SendOptions,
  TemplateOptions,
} from "./types.js";
export type * from "./types.js";
