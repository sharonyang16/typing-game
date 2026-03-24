import { Key } from "@/types/keyboard";
import { KEY_VALUES, KEY_LABELS, KEY_WIDTHS } from "@/static/keyboardConstants";
import { useEffect, useState } from "react";

const useKeyboardPage = () => {
  const [currentPressedKeys, setCurrentPressedKeys] = useState<Set<string>>(
    new Set(),
  );
  const [allPressedKeys, setAllPressedKeys] = useState<Set<string>>(new Set());
  const keyboard: Key[][] = KEY_VALUES.map((row) =>
    row.map((value) => ({
      value,
      label: KEY_LABELS[value] ?? value,
      width: KEY_WIDTHS[value] ?? 1,
    })),
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      e.preventDefault();
      e.stopPropagation();

      if (e.repeat) return; // ignore key held auto-repeat events
      setCurrentPressedKeys((prev) => new Set(prev).add(e.key));
      setAllPressedKeys((prev) => new Set(prev).add(e.key));
    };

    const handleKeyUp = (e: KeyboardEvent): void => {
      setCurrentPressedKeys((prev) => {
        const next = new Set(prev);
        next.delete(e.key);
        return next;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  });

  const resetPressedKeys = () => {
    setCurrentPressedKeys(new Set());
    setAllPressedKeys(new Set());
  };

  return { keyboard, currentPressedKeys, allPressedKeys, resetPressedKeys };
};

export default useKeyboardPage;
