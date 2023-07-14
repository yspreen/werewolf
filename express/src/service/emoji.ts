import * as emoji from "random-unicode-emoji";

const modifiers = [
  "\u{1f3fb}", // skin type 1-2
  "\u{1f3fc}", // skin type 3
  "\u{1f3fd}", // skin type 4
  "\u{1f3fe}", // skin type 5
  "\u{1f3ff}", // skin type 6
];

export function randomEmoji(): string {
  let str: string = emoji.random({ count: 1 })[0];
  modifiers.forEach((modifier) => {
    str = str.replace(new RegExp(modifier, "g"), "");
  });
  return str;
}
