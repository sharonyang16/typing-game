import useTestKeyboardEvents from "./useTestKeyboardEvents";
import { Key } from "@/types/keyboard";
import { KEY_VALUES, KEY_LABELS, KEY_WIDTHS } from "@/static/keyboardConstants";

const useKeyboardPage = () => {
  const { currentPressedKeys, allPressedKeys } = useTestKeyboardEvents();
  const keyboard: Key[][] = KEY_VALUES.map((row) =>
    row.map((value) => ({
      value,
      label: KEY_LABELS[value] ?? value,
      width: KEY_WIDTHS[value] ?? 1,
    })),
  );

  return { keyboard, currentPressedKeys, allPressedKeys };
};

export default useKeyboardPage;
