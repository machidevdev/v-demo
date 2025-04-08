import { atom } from "jotai";

export const ORDER_SIZES = {
  10: "1",
  4: "10",
  3: "100",
  2: "1000",
} as const;

export const orderSizeAtom = atom((get) => ORDER_SIZES); 