import { getFilteredMessages } from "./lib/commands";
import { menuSelect, cs } from "./lib/helper";
import type { MenuItem } from "./types";

console.log(cs("Searching messages...", "green"));
const mails = await getFilteredMessages("UNREAD");

let options: MenuItem[] = [];

mails.forEach((mail) => {
  options.push({
    name: mail.object,
    function: () => {
      console.log(`\n   Link: ${cs(mail.link, "green")}`);
    },
  });
});

mails.length > 0
  ? menuSelect(options, `   Unread Messages (${mails.length})`)
  : console.log(cs("No unread messages.", "yellow"));
