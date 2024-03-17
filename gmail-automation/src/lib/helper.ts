import type { MenuItem } from "@/types";
import * as readline from "readline";
import { exec } from "child_process";

export function menuSelect(options: MenuItem[], caption: string | null = null) {
  let currentChoice: number = 0;

  const handleOnChange = (offset: -1 | 1) => {
    currentChoice = (currentChoice + offset + options.length) % options.length;
    displayMenu();
  };

  const displayMenu = () => {
    console.clear();
    console.log(caption ? `\n${caption}: \n` : "");
    options.forEach((option: MenuItem, index: number) => {
      console.log(
        index === currentChoice
          ? `\n   ${cs(`> ${option.name}`, "cyan")}\n`
          : `   - ${option.name}`
      );
    });
    console.log(cs("\n   Press q to quit.", "yellow"));
  };

  displayMenu(); // Afficher le menu initial

  readline.emitKeypressEvents(process.stdin);
  if (process.stdin.isTTY) process.stdin.setRawMode(true);

  process.stdin.on("keypress", (_chunk, key) => {
    if (!key) return;
    if (key.name == "q") process.exit();
    if (key.name == "return") options[currentChoice].function();
    if (["up", "down"].includes(key.name))
      handleOnChange(key.name === "up" ? -1 : 1);
  });
}

const ansiCodes = {
  black: 30,
  red: 31,
  green: 32,
  yellow: 33,
  blue: 34,
  magenta: 35,
  cyan: 36,
  white: 37,
};

export function cs(str: string, color: keyof typeof ansiCodes) {
  return `\x1b[${ansiCodes[color]}m${str}\x1b[0m`;
}

export function openDefaultBrowser(link: string) {
  exec(`open ${link}`);
}
