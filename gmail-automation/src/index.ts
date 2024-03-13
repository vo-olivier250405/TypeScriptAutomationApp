import { auth, google } from "./lib/auth";

async function listMessages() {
  const gmail = google.gmail({ version: "v1", auth });
  const res = await gmail.users.messages.list({ userId: "me" });
  const messages = res.data.messages;

  if (!messages || messages.length === 0) {
    console.log("No message found");
    return;
  }

  console.log("Messages: ");

  messages.forEach(async (message) => {
    if (!message.id) return;
    const data = await gmail.users.messages.get({
      userId: "me",
      id: message.id,
    });
    console.log("\n --- ");
    if (!data.data.payload?.headers) return;
    const headers = data.data.payload.headers.find(
      (element) => element.name === "Subject"
    );
    console.log(
      headers?.value +
        ` | https://mail.google.com/mail/u/0/#inbox/${message.id}
    `
    );
  });
}

listMessages();
