"use client";
import { useEffect, useState } from "react";

const useKeyboardEvents = () => {
  const [keyPressed, setKeyPressed] = useState("");
  const [nextKeyUpperCase, setNextKeyUpperCase] = useState(false);

  const handleKeyDown = (e: KeyboardEvent) => {
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

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === "Shift") {
      setNextKeyUpperCase(false);
    }

    setKeyPressed("");
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  });

  return { keyPressed };
};

export default useKeyboardEvents;
