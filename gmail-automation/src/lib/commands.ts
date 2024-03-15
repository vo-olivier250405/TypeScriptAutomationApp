import { auth, google } from "./auth";

export async function getAllMessages() {
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

export async function getFilteredMessages(filterBy: string) {
  const messagesData = await getAllMessages();
  let mails: { object: string; link: string }[] = [];

  messagesData?.forEach((data) => {
    if (data?.data.labelIds?.includes(filterBy)) {
      mails = formatMessages(mails, data);
    }
  });

  console.log("Unread messages:\n");
  console.log(mails);
  return messagesData?.filter((data) =>
    data?.data.labelIds?.includes(filterBy)
  );
}

function formatMessages(mails: { object: string; link: string }[], data: any) {
  const headers = data?.data.payload?.headers?.find(
    (header: any) => header.name === "Subject"
  );
  if (headers) {
    mails.push({
      object: headers.value!,
      link: `https://mail.google.com/mail/u/1/#inbox/${data.data.id}`,
    });
  }
  return mails;
}
