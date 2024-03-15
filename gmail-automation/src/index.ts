import { getFilteredMessages } from "./lib/commands";
import { menuSelect, cs } from "./lib/helper";

const mails = await getFilteredMessages("UNREAD");

let options: { name: string; function: () => void }[] = [];

mails.forEach((mail) => {
  options.push({
    name: mail.object,
    function: () => {
      console.log(`\n   Link: ${cs(mail.link, "cyan")}`);
    },
  });
});

menuSelect(options, `   Unread Messages (${mails.length})`);
