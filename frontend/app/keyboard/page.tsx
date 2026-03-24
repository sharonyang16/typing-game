"use client";

import useKeyboardPage from "@/hooks/useKeyboardPage";

const KeyboardPage = () => {
  const { keyboard, currentPressedKeys, allPressedKeys } = useKeyboardPage();
  return (
    <div className="flex flex-col gap-16">
      <h1 className="text-xl font-bold">Key Tester</h1>
      <div className="w-full flex justify-center align-center">
        <div className="flex-col">
          {keyboard.map((row, index) => (
            <div
              className="my-1 flex w-full gap-1"
              key={`keyboard-row-${index}`}
            >
              {row.map((key, index) => (
                <kbd
                  className={`kbd ${currentPressedKeys.has(key.value) ? "bg-accent/60" : allPressedKeys.has(key.value) && "bg-accent text-accent-content"}`}
                  style={{
                    minWidth: key.width * 48,
                    minHeight: 48,
                  }}
                  key={key.value + index}
                >
                  {key.label}
                </kbd>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KeyboardPage;
