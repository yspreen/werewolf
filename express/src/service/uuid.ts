import { getRandomValues } from "crypto";

export function uuid(): string {
  return (([1e7] as any) + -1e3 + -4e3 + -8e3 + -1e11).replace(
    /[018]/g,
    (c: any) =>
      (c ^ (getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(
        16
      )
  );
}
