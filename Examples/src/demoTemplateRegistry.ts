import type { EmailsDone, SendEmailResponse } from "../../EmailsDone/dist/index.js";

export interface DemoParameter {
  key: string;
  label: string;
}

export interface DemoTemplate {
  groupName: string;
  templateName: string;
  parameters: DemoParameter[];
  executeAsync: (emailsDone: EmailsDone, values: Record<string, string>) => Promise<SendEmailResponse>;
}

export const demoTemplateRegistry: DemoTemplate[] = [
  {
    groupName: "Authentication",
    templateName: "Account Locked",
    parameters: [
      { key: "to", label: "Recipient email" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .authentication()
      .accountLocked()
      .send(values["to"]!),
  },
  {
    groupName: "Authentication",
    templateName: "Email Changed",
    parameters: [
      { key: "to", label: "Recipient email" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .authentication()
      .emailChanged()
      .send(values["to"]!),
  },
  {
    groupName: "Authentication",
    templateName: "Login Code",
    parameters: [
      { key: "to", label: "Recipient email" },
      { key: "code", label: "Code" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .authentication()
      .loginCode(values["code"]!)
      .send(values["to"]!),
  },
  {
    groupName: "Authentication",
    templateName: "Magic Link",
    parameters: [
      { key: "to", label: "Recipient email" },
      { key: "actionButtonUrl", label: "Url" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .authentication()
      .magicLink(values["actionButtonUrl"]!)
      .send(values["to"]!),
  },
  {
    groupName: "Authentication",
    templateName: "Mfa Disabled",
    parameters: [
      { key: "to", label: "Recipient email" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .authentication()
      .mfaDisabled()
      .send(values["to"]!),
  },
  {
    groupName: "Authentication",
    templateName: "Mfa Enabled",
    parameters: [
      { key: "to", label: "Recipient email" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .authentication()
      .mfaEnabled()
      .send(values["to"]!),
  },
  {
    groupName: "Authentication",
    templateName: "New Device Login",
    parameters: [
      { key: "to", label: "Recipient email" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .authentication()
      .newDeviceLogin()
      .send(values["to"]!),
  },
  {
    groupName: "Authentication",
    templateName: "Password Changed",
    parameters: [
      { key: "to", label: "Recipient email" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .authentication()
      .passwordChanged()
      .send(values["to"]!),
  },
  {
    groupName: "Authentication",
    templateName: "Password Reset",
    parameters: [
      { key: "to", label: "Recipient email" },
      { key: "actionButtonUrl", label: "Url" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .authentication()
      .passwordReset(values["actionButtonUrl"]!)
      .send(values["to"]!),
  },
  {
    groupName: "Authentication",
    templateName: "Suspicious Login",
    parameters: [
      { key: "to", label: "Recipient email" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .authentication()
      .suspiciousLogin()
      .send(values["to"]!),
  },
  {
    groupName: "Authentication",
    templateName: "Verify Email",
    parameters: [
      { key: "to", label: "Recipient email" },
      { key: "actionButtonUrl", label: "Url" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .authentication()
      .verifyEmail(values["actionButtonUrl"]!)
      .send(values["to"]!),
  },
  {
    groupName: "Authentication",
    templateName: "Welcome",
    parameters: [
      { key: "to", label: "Recipient email" },
      { key: "actionButtonUrl", label: "Url" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .authentication()
      .welcome(values["actionButtonUrl"]!)
      .send(values["to"]!),
  },
  {
    groupName: "Billing",
    templateName: "Invoice Overdue",
    parameters: [
      { key: "to", label: "Recipient email" },
      { key: "actionButtonUrl", label: "Url" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .billing()
      .invoiceOverdue({ actionButtonUrl: values["actionButtonUrl"]! })
      .send(values["to"]!),
  },
  {
    groupName: "Billing",
    templateName: "Payment Failed",
    parameters: [
      { key: "to", label: "Recipient email" },
      { key: "actionButtonUrl", label: "Url" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .billing()
      .paymentFailed({ actionButtonUrl: values["actionButtonUrl"]! })
      .send(values["to"]!),
  },
  {
    groupName: "Billing",
    templateName: "Payment Succeeded",
    parameters: [
      { key: "to", label: "Recipient email" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .billing()
      .paymentSucceeded()
      .send(values["to"]!),
  },
  {
    groupName: "Billing",
    templateName: "Refund Issued",
    parameters: [
      { key: "to", label: "Recipient email" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .billing()
      .refundIssued()
      .send(values["to"]!),
  },
  {
    groupName: "Billing",
    templateName: "Subscription Cancelled",
    parameters: [
      { key: "to", label: "Recipient email" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .billing()
      .subscriptionCancelled()
      .send(values["to"]!),
  },
  {
    groupName: "Billing",
    templateName: "Subscription Paused",
    parameters: [
      { key: "to", label: "Recipient email" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .billing()
      .subscriptionPaused()
      .send(values["to"]!),
  },
  {
    groupName: "Billing",
    templateName: "Subscription Renewed",
    parameters: [
      { key: "to", label: "Recipient email" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .billing()
      .subscriptionRenewed()
      .send(values["to"]!),
  },
  {
    groupName: "Billing",
    templateName: "Subscription Started",
    parameters: [
      { key: "to", label: "Recipient email" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .billing()
      .subscriptionStarted()
      .send(values["to"]!),
  },
  {
    groupName: "Billing",
    templateName: "Trial Ending",
    parameters: [
      { key: "to", label: "Recipient email" },
      { key: "actionButtonUrl", label: "Url" },
      { key: "trialEndDate", label: "Trial End Date" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .billing()
      .trialEnding({ actionButtonUrl: values["actionButtonUrl"]!, trialEndDate: values["trialEndDate"]! })
      .send(values["to"]!),
  },
  {
    groupName: "Billing",
    templateName: "Trial Started",
    parameters: [
      { key: "to", label: "Recipient email" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .billing()
      .trialStarted()
      .send(values["to"]!),
  },
  {
    groupName: "Billing",
    templateName: "Usage Threshold",
    parameters: [
      { key: "to", label: "Recipient email" },
      { key: "message", label: "Message" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .billing()
      .usageThreshold({ message: values["message"]! })
      .send(values["to"]!),
  },
  {
    groupName: "Developer",
    templateName: "Api Key Created",
    parameters: [
      { key: "to", label: "Recipient email" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .developer()
      .apiKeyCreated()
      .send(values["to"]!),
  },
  {
    groupName: "Developer",
    templateName: "Api Key Rotated",
    parameters: [
      { key: "to", label: "Recipient email" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .developer()
      .apiKeyRotated()
      .send(values["to"]!),
  },
  {
    groupName: "Developer",
    templateName: "Credits Exhausted",
    parameters: [
      { key: "to", label: "Recipient email" },
      { key: "actionButtonUrl", label: "Url" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .developer()
      .creditsExhausted({ actionButtonUrl: values["actionButtonUrl"]! })
      .send(values["to"]!),
  },
  {
    groupName: "Developer",
    templateName: "Credits Low",
    parameters: [
      { key: "to", label: "Recipient email" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .developer()
      .creditsLow()
      .send(values["to"]!),
  },
  {
    groupName: "Notifications",
    templateName: "Announcement",
    parameters: [
      { key: "to", label: "Recipient email" },
      { key: "message", label: "Message" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .notifications()
      .announcement({ message: values["message"]! })
      .send(values["to"]!),
  },
  {
    groupName: "Notifications",
    templateName: "Approval Approved",
    parameters: [
      { key: "to", label: "Recipient email" },
      { key: "message", label: "Message" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .notifications()
      .approvalApproved({ message: values["message"]! })
      .send(values["to"]!),
  },
  {
    groupName: "Notifications",
    templateName: "Approval Needed",
    parameters: [
      { key: "to", label: "Recipient email" },
      { key: "actionButtonUrl", label: "Url" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .notifications()
      .approvalNeeded({ actionButtonUrl: values["actionButtonUrl"]! })
      .send(values["to"]!),
  },
  {
    groupName: "Notifications",
    templateName: "Approval Rejected",
    parameters: [
      { key: "to", label: "Recipient email" },
      { key: "message", label: "Message" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .notifications()
      .approvalRejected({ message: values["message"]! })
      .send(values["to"]!),
  },
  {
    groupName: "Notifications",
    templateName: "Digest",
    parameters: [
      { key: "to", label: "Recipient email" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .notifications()
      .digest()
      .send(values["to"]!),
  },
  {
    groupName: "Notifications",
    templateName: "Export Ready",
    parameters: [
      { key: "to", label: "Recipient email" },
      { key: "actionButtonUrl", label: "Url" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .notifications()
      .exportReady({ actionButtonUrl: values["actionButtonUrl"]! })
      .send(values["to"]!),
  },
  {
    groupName: "Notifications",
    templateName: "Generation Complete",
    parameters: [
      { key: "to", label: "Recipient email" },
      { key: "actionButtonUrl", label: "Url" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .notifications()
      .generationComplete({ actionButtonUrl: values["actionButtonUrl"]! })
      .send(values["to"]!),
  },
  {
    groupName: "Notifications",
    templateName: "Import Complete",
    parameters: [
      { key: "to", label: "Recipient email" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .notifications()
      .importComplete()
      .send(values["to"]!),
  },
  {
    groupName: "Notifications",
    templateName: "Job Complete",
    parameters: [
      { key: "to", label: "Recipient email" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .notifications()
      .jobComplete()
      .send(values["to"]!),
  },
  {
    groupName: "Notifications",
    templateName: "Notification Alert",
    parameters: [
      { key: "to", label: "Recipient email" },
      { key: "message", label: "Message" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .notifications()
      .notificationAlert({ message: values["message"]! })
      .send(values["to"]!),
  },
  {
    groupName: "Notifications",
    templateName: "Notification Info",
    parameters: [
      { key: "to", label: "Recipient email" },
      { key: "message", label: "Message" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .notifications()
      .notificationInfo({ message: values["message"]! })
      .send(values["to"]!),
  },
  {
    groupName: "Notifications",
    templateName: "Notification Success",
    parameters: [
      { key: "to", label: "Recipient email" },
      { key: "message", label: "Message" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .notifications()
      .notificationSuccess({ message: values["message"]! })
      .send(values["to"]!),
  },
  {
    groupName: "Notifications",
    templateName: "Notification Warning",
    parameters: [
      { key: "to", label: "Recipient email" },
      { key: "message", label: "Message" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .notifications()
      .notificationWarning({ message: values["message"]! })
      .send(values["to"]!),
  },
  {
    groupName: "Notifications",
    templateName: "Processing Failed",
    parameters: [
      { key: "to", label: "Recipient email" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .notifications()
      .processingFailed()
      .send(values["to"]!),
  },
  {
    groupName: "Notifications",
    templateName: "Queued Request Ready",
    parameters: [
      { key: "to", label: "Recipient email" },
      { key: "actionButtonUrl", label: "Url" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .notifications()
      .queuedRequestReady({ actionButtonUrl: values["actionButtonUrl"]! })
      .send(values["to"]!),
  },
  {
    groupName: "Notifications",
    templateName: "Reminder",
    parameters: [
      { key: "to", label: "Recipient email" },
      { key: "message", label: "Message" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .notifications()
      .reminder({ message: values["message"]! })
      .send(values["to"]!),
  },
  {
    groupName: "Notifications",
    templateName: "Report Ready",
    parameters: [
      { key: "to", label: "Recipient email" },
      { key: "actionButtonUrl", label: "Url" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .notifications()
      .reportReady({ actionButtonUrl: values["actionButtonUrl"]! })
      .send(values["to"]!),
  },
  {
    groupName: "Notifications",
    templateName: "Upload Complete",
    parameters: [
      { key: "to", label: "Recipient email" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .notifications()
      .uploadComplete()
      .send(values["to"]!),
  },
  {
    groupName: "Team",
    templateName: "Invitation Accepted",
    parameters: [
      { key: "to", label: "Recipient email" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .team()
      .invitationAccepted()
      .send(values["to"]!),
  },
  {
    groupName: "Team",
    templateName: "Invited To Workspace",
    parameters: [
      { key: "to", label: "Recipient email" },
      { key: "actionButtonUrl", label: "Url" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .team()
      .invitedToWorkspace({ actionButtonUrl: values["actionButtonUrl"]! })
      .send(values["to"]!),
  },
  {
    groupName: "Team",
    templateName: "Role Changed",
    parameters: [
      { key: "to", label: "Recipient email" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .team()
      .roleChanged()
      .send(values["to"]!),
  },
  {
    groupName: "Team",
    templateName: "Team Member Added",
    parameters: [
      { key: "to", label: "Recipient email" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .team()
      .teamMemberAdded()
      .send(values["to"]!),
  },
  {
    groupName: "Team",
    templateName: "Team Member Removed",
    parameters: [
      { key: "to", label: "Recipient email" }
    ],
    executeAsync: (emailsDone, values) => emailsDone
      .team()
      .teamMemberRemoved()
      .send(values["to"]!),
  }
];
