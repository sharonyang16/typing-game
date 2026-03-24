"use client";
import { useEffect, useState } from "react";

/**
 * Custom hook for handling keyboard events for key testing page.
 * @returns keyPressed - the key that was pressed
 */
const useTestKeyboardEvents = () => {
  const [currentPressedKeys, setCurrentPressedKeys] = useState<Set<string>>(
    new Set(),
  );
  const [allPressedKeys, setAllPressedKeys] = useState<Set<string>>(new Set());

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

  return { currentPressedKeys, allPressedKeys };
};

export default useTestKeyboardEvents;
