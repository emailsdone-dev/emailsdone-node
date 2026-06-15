# EmailsDone for Node / TypeScript

EmailsDone.dev — Production-ready app email for developers who do not want an email project.

Add password resets, verification, notifications and billing emails without building templates, writing HTML or wiring email infrastructure.

Emails. Done.

## Install

```bash
npm install emailsdone
```

## Run the example

To run the interactive console example from this repository:

```bash
cd libraries/node/Examples
npm install
npm run start
```

The example builds the local SDK, prompts for your API key, validates it with `getQuota()`, and then lets you send templates or check recipient status from a menu.

## API key

Store your EmailsDone API key in server-side configuration. Environment variables are the simplest starting point:

```bash
EMAILSDONE_API_KEY=your_api_key_here
```

Do not put this key in browser JavaScript, mobile apps, public frontend configuration, source control, or client-side logs.

## Send an email

```ts
import { EmailsDoneClient } from "emailsdone";

const emailsDone = EmailsDoneClient.fromApiKey(process.env.EMAILSDONE_API_KEY!);

await emailsDone.authentication().welcome("https://app.example.com/action").send("user@example.com");
```

Templates with required fields expose those fields as typed parameters where that keeps the call obvious:

```ts
await emailsDone
  .authentication()
  .loginCode(
    "123456"
  )
  .send("user@example.com");
```

Optional template fields and send controls use options objects:

```ts
await emailsDone
  .authentication()
  .loginCode(
    "123456",
    {
      footerNote: "If you did not request this code, you can safely ignore this email.",
      fromName: "Acme App",
      idempotencyKey: "email-user-123-v1",
    }
  )
  .send("user@example.com");
```

## Recipient status

```ts
const recipientStatus = await emailsDone
  .recipient("user@example.com")
  .getStatus();

if (recipientStatus.recipient?.subscription?.status !== "subscribed") {
  await emailsDone
    .recipient("user@example.com")
    .resubscribe();
}
```

## Quota

```ts
const quota = await emailsDone.getQuota();
```

## Idempotency

Use an idempotency key for password resets, billing emails, and other flows where your app or worker may retry the same send.

```ts
await emailsDone
  .billing()
  .paymentFailed({
    actionButtonUrl: "https://app.example.com/action",
    idempotencyKey: `payment-failed-${invoiceId}`,
  })
  .send("user@example.com");
```

## Fluent template groups

The generated client mirrors EmailsDone template categories and recipient resource actions:

- `await emailsDone.getQuota()`
- `emailsDone.recipient(email).getStatus()`
- `emailsDone.recipient(email).resubscribe()`
- `emailsDone.authentication()`
- `emailsDone.billing()`
- `emailsDone.developer()`
- `emailsDone.notifications()`
- `emailsDone.team()`

Each method sends a named EmailsDone template through `/v1/send`.
