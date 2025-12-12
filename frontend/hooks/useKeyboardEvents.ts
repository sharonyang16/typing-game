"use client";
import { useEffect, useState } from "react";

/**
 * Custom hook for handling keyboard events.
 * @returns keyPressed - the key that was pressed
 */
const useKeyboardEvents = () => {
  const [keyPressed, setKeyPressed] = useState("");
  const [nextKeyUpperCase, setNextKeyUpperCase] = useState(false);

  // Listens for key events
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  });

  /**
   * Handles the keydown event.
   * @param e - the keydown event
   * @returns void
   */
  const handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === "Shift") {
      setNextKeyUpperCase(true);
    }

    if (nextKeyUpperCase) {
      setKeyPressed(e.key.toUpperCase());
      setNextKeyUpperCase(false);
      return;
    } else {
      setKeyPressed(e.key);
    }
  };

  /**
   * Handles the keyup event.
   * @param e - the keyup event
   * @returns void
   */
  const handleKeyUp = (e: KeyboardEvent): void => {
    if (e.key === "Shift") {
      setNextKeyUpperCase(false);
    }

    setKeyPressed("");
  };

  return { keyPressed };
};

export default useKeyboardEvents;
