import { useEffect, useMemo } from "react";
import useTestKeyboardEvents from "./useTestKeyboardEvents";

type Key = {
  value: string;
  label: string;
  width: number;
  pressed: boolean;
};

const KEY_WIDTHS: Record<string, number> = {
  Escape: 1.5,
  Backspace: 1.5,
  Tab: 1.5,
  CapsLock: 1.75,
  Enter: 1.75,
  Shift: 2.25,
  Control: 1.25,
  Alt: 1.25,
  Meta: 1.25,
  " ": 6.25,
};

const KEY_LABELS: Record<string, string> = {
  Escape: "Esc",
  CapsLock: "Caps",
  Backspace: "⌫",
  Enter: "↵",
  Shift: "⇧",
  Control: "⌃",
  Meta: "⌘",
  Alt: "⌥",
  Tab: "Tab",
  " ": "",
  Power: "⏻",
};

const KEY_VALUES: string[][] = [
  [
    "Escape",
    "F1",
    "F2",
    "F3",
    "F4",
    "F5",
    "F6",
    "F7",
    "F8",
    "F9",
    "F10",
    "F11",
    "F12",
    "Power",
  ],
  [
    "`",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "-",
    "=",
    "Backspace",
  ],
  ["Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"],
  ["CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter"],
  ["Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "Shift"],
  ["Control", "Alt", "Meta", " ", "Meta", "Alt"],
];

const useKeyboardPage = () => {
  const { keyPressed } = useTestKeyboardEvents();
  const keyboard: Key[][] = KEY_VALUES.map((row) =>
    row.map(
      (value): Key => ({
        value,
        label: KEY_LABELS[value] ?? value,
        width: KEY_WIDTHS[value] ?? 1,
        pressed: false,
      }),
    ),
  );
  const keyMap = useMemo(
    () => new Map(KEY_VALUES.flat().map((key) => [key, false])),
    [],
  );

  useEffect(() => {
    console.log(keyPressed);
    const key = keyPressed.length === 1 ? keyPressed.toLowerCase() : keyPressed;
    keyMap.set(key, true);
  }, [keyMap, keyPressed]);

  return { keyboard, keyMap };
};

export default useKeyboardPage;
