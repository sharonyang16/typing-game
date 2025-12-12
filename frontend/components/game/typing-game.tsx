import numWordsConstant from "@/static/numWords.json";

type TypingGameProps = {
  wordsToType: string;
  wordsTyped: string;
  charMatches: (index: number) => boolean;
  started: boolean;
  handleNumWordsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCapsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  numWords: number;
  useCaps: boolean;
};

const TypingGame = ({
  wordsToType,
  wordsTyped,
  charMatches,
  started,
  handleNumWordsChange,
  handleCapsChange,
  numWords,
  useCaps,
}: TypingGameProps) => {
  return (
    <div className="flex flex-col gap-16">
      <div
        className={`flex justify-between ${
          started && " pointer-events-none opacity-50"
        }`}
      >
        <div className="join">
          {numWordsConstant.map((num) => (
            <input
              key={`numWords-${num}`}
              className="join-item btn btn-square"
              type="radio"
              value={num}
              onChange={handleNumWordsChange}
              checked={numWords == num}
              aria-label={num.toString()}
            />
          ))}
        </div>
        <fieldset className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={useCaps}
            onChange={handleCapsChange}
            className="toggle"
            id="toggle-caps"
          />
          <label htmlFor="toggle-caps"> Capital Letters</label>
        </fieldset>
      </div>

      <div>
        <p className="text-xl">
          {wordsToType.split("").map((char, index) => {
            return (
              <span
                key={index}
                className={`${
                  index === wordsTyped.length
                    ? "bg-blue-700"
                    : index >= wordsTyped.length
                    ? "text-gray-400"
                    : charMatches(index)
                    ? "text-white"
                    : "bg-red-800"
                }`}
              >
                {char}
              </span>
            );
          })}
        </p>
      </div>
    </div>
  );
};

export default TypingGame;
