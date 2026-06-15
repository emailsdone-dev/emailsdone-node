import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { EmailsDone } from "../../EmailsDone/dist/index.js";
import { demoTemplateRegistry } from "./demoTemplateRegistry.js";

async function main(): Promise<void> {
  const readline = createInterface({ input, output });

  try {
    console.log("EmailsDone Node console example");
    console.log("");

    const apiKey = await promptForApiKey(readline);
    const emailsDone = EmailsDone.fromApiKey(apiKey);

    try {
      const quota = await emailsDone.getQuota();

      if (!quota.ok) {
        console.log("The API key could not be validated.");
        return;
      }
    } catch (error) {
      console.log(`Could not validate the API key: ${messageFromError(error)}`);
      return;
    }

    while (true) {
      console.log("");
      console.log("1. Send Template");
      console.log("2. Check Recipient Status");
      console.log("0. Exit");

      const choice = await readline.question("Choose an option: ");

      if (choice === "0") {
        return;
      }

      if (choice === "1") {
        await sendTemplateMenu(readline, emailsDone);
        continue;
      }

      if (choice === "2") {
        await recipientStatusMenu(readline, emailsDone);
        continue;
      }

      console.log("Invalid option.");
    }
  } finally {
    readline.close();
  }
}

async function promptForApiKey(readline: ReturnType<typeof createInterface>): Promise<string> {
  while (true) {
    const apiKey = (await readline.question("EmailsDone API key: ")).trim();

    if (apiKey) {
      return apiKey;
    }

    console.log("API key is required.");
  }
}

async function sendTemplateMenu(
  readline: ReturnType<typeof createInterface>,
  emailsDone: EmailsDone,
): Promise<void> {
  const groups = Array.from(new Set(demoTemplateRegistry.map((template) => template.groupName)))
    .sort((a, b) => a.localeCompare(b));

  if (groups.length === 0) {
    console.log("No demo templates are available.");
    return;
  }

  console.log("");
  console.log("Template groups:");

  for (const [index, group] of groups.entries()) {
    console.log(`${index + 1}. ${group}`);
  }

  const groupIndex = await promptForSelection(readline, groups.length, "Choose a group");
  const selectedGroup = groups[groupIndex]!;
  const templates = demoTemplateRegistry
    .filter((template) => template.groupName === selectedGroup)
    .sort((a, b) => a.templateName.localeCompare(b.templateName));

  console.log("");
  console.log(`${selectedGroup} templates:`);

  for (const [index, template] of templates.entries()) {
    console.log(`${index + 1}. ${template.templateName}`);
  }

  const templateIndex = await promptForSelection(readline, templates.length, "Choose a template");
  const selectedTemplate = templates[templateIndex]!;
  const values: Record<string, string> = {};

  console.log("");

  for (const parameter of selectedTemplate.parameters) {
    values[parameter.key] = await promptForValue(readline, parameter.label);
  }

  try {
    const response = await selectedTemplate.executeAsync(emailsDone, values);
    console.log(`Send result: ok=${response.ok}, status=${response.status ?? "unknown"}, messageId=${response.messageId ?? "n/a"}, idempotent=${response.idempotent}`);
  } catch (error) {
    console.log(`Send failed: ${messageFromError(error)}`);
  }
}

async function recipientStatusMenu(
  readline: ReturnType<typeof createInterface>,
  emailsDone: EmailsDone,
): Promise<void> {
  console.log("");
  const email = await promptForValue(readline, "Recipient email");

  try {
    const status = await emailsDone
      .recipient(email)
      .getStatus();

    const recipientStatus = status.recipient?.subscription?.status;

    console.log(`Recipient status: ${recipientStatus ?? "unknown"}`);

    if (!recipientStatus || recipientStatus.toLowerCase() !== "subscribed") {
      const choice = (await readline.question("Recipient is not subscribed. Resubscribe? y/n: ")).trim().toLowerCase();

      if (choice === "y") {
        const response = await emailsDone
          .recipient(email)
          .resubscribe();

        console.log(`Resubscribe result: ok=${response.ok}`);
      }
    }
  } catch (error) {
    console.log(`Recipient lookup failed: ${messageFromError(error)}`);
  }
}

async function promptForSelection(
  readline: ReturnType<typeof createInterface>,
  count: number,
  label: string,
): Promise<number> {
  while (true) {
    const raw = (await readline.question(`${label} (1-${count}): `)).trim();
    const selected = Number.parseInt(raw, 10);

    if (Number.isInteger(selected) && selected >= 1 && selected <= count) {
      return selected - 1;
    }

    console.log("Invalid selection.");
  }
}

async function promptForValue(
  readline: ReturnType<typeof createInterface>,
  label: string,
): Promise<string> {
  while (true) {
    const value = (await readline.question(`${label}: `)).trim();

    if (value) {
      return value;
    }

    console.log(`${label} is required.`);
  }
}

function messageFromError(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

void main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
