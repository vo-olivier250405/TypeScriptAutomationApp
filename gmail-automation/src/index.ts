import { getFilteredMessages } from "./lib/commands";
import { menuSelect, cs, openDefaultBrowser } from "./lib/helper";
import type { MenuItem } from "./types";

console.log(cs("Searching messages...", "green"));

const mails = await getFilteredMessages("UNREAD");

const options: MenuItem[] = mails.map((mail) => ({
  name: mail.object,
  function: () => openDefaultBrowser(mail.link),
}));

mails.length > 0
  ? menuSelect(options, `   Unread Messages (${mails.length})`)
  : console.log(cs("No unread messages.", "yellow"));
