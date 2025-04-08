import { atom } from "jotai";

export const ORDER_SIZES = {
  10: "1",
  5: "10",
  4: "5",
  3: "10",
  2: "100",
  1: "1000",
} as const;

export const orderSizeAtom = atom((get) => ORDER_SIZES); 