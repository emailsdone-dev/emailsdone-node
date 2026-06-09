# EmailsDone for Node

Template-first transactional email for developers who do not care about email.

This SDK is generated from the EmailsDone OpenAPI contract.

## Install

```bash
npm install @emailsdone/client
```

## API key

Store your EmailsDone API key in server-side configuration. Environment variables are the simplest starting point:

```bash
EMAILSDONE_API_KEY=<your-api-key>
```

Do not put this key in browser JavaScript, mobile apps, public frontend configuration, source control, or client-side logs.

## Send an email

```ts
import { EmailsDoneClient } from "@emailsdone/client";

const client = EmailsDoneClient.fromApiKey(process.env.EMAILSDONE_API_KEY!);

await client.send.authentication.welcome("user@example.com", { actionButtonUrl: "https://app.example.com/action" });
```

## Password reset and idempotency

```ts
await client.send.authentication.passwordReset(
  "user@example.com",
  {
    actionButtonUrl: "https://app.example.com/action",
    idempotencyKey: `password-reset-${userId}-${tokenId}`,
  },
);
```

## Template groups

The generated client mirrors EmailsDone template categories:

- `client.send.authentication`
- `client.send.billing`
- `client.send.developer`
- `client.send.notification`
- `client.send.team`

Each method sends a named EmailsDone template through `/v1/send`.
