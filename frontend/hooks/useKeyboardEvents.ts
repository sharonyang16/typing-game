import { useEffect, useState } from "react";

const useKeyboardEvents = () => {
  const [keyPressed, setKeyPressed] = useState("");

  const handleKeyDown = (e: KeyboardEvent) => {
    setKeyPressed(e.key);
  };

  const handleKeyUp = () => {
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
