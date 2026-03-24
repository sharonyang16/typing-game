"use client";

import useKeyboardPage from "@/hooks/useKeyboardPage";

const KeyboardPage = () => {
  const { keyboard, currentPressedKeys, allPressedKeys, resetPressedKeys } =
    useKeyboardPage();
  return (
    <div className="flex flex-col gap-16">
      <h1 className="text-xl font-bold">Key Tester</h1>

      <div className="w-full flex justify-center align-center">
        <div className="flex flex-col gap-4">
          <button
            className="btn btn-primary w-fit self-end"
            onClick={resetPressedKeys}
          >
            Reset
          </button>
          <div className="flex flex-col gap-1">
            {keyboard.map((row, index) => (
              <div className=" flex gap-1 w-full" key={`keyboard-row-${index}`}>
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
    </div>
  );
};

export default KeyboardPage;
