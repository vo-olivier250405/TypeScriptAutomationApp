import { auth, google } from "./lib/auth";

async function getAllMessages() {
  const gmail = google.gmail({ version: "v1", auth });
  const res = await gmail.users.messages.list({ userId: "me" });
  const messages = res.data.messages;

  if (!messages || messages.length === 0) {
    console.log("No message found");
    return;
  }

  const mesagesData = await Promise.all(
    messages.map(async (message) => {
      if (!message.id) return;
      return await gmail.users.messages.get({
        userId: "me",
        id: message.id,
      });
    })
  );

  return mesagesData;
}

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
        ` | https://mail.google.com/mail/u/1/#inbox/${message.id}
    `
    );
  });
}

async function getFilteredMessages(filterBy: string) {
  const messagesData = await getAllMessages();
  const mails: { object: string; link: string }[] = [];

  messagesData?.forEach((data) => {
    if (data?.data.labelIds?.includes(filterBy)) {
      const header = data?.data.payload?.headers?.find(
        (header) => header.name === "Subject"
      );
      if (header) {
        mails.push({ object: header.value!, link: data?.data.id! });
      }
    }
  });

  console.log(mails);
  return messagesData?.filter((data) =>
    data?.data.labelIds?.includes(filterBy)
  );
}

await getFilteredMessages("UNREAD");
