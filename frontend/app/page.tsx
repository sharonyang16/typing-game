"use client";
import { RotateCcw } from "lucide-react";
import useGame from "@/hooks/useGame";
import Results from "@/components/game/results";
import TypingGame from "@/components/game/typing-game";

const Game = () => {
  const {
    numWords,
    useCaps,
    handleCapsChange,
    wordsToType,
    handleRestart,
    wordsTyped,
    charMatches,
    handleNumWordsChange,
    secondsTaken,
    showResults,
    rawWpm,
    accuracy,
    wpm,
    showSignUpBanner,
    started,
    showAccuracyWarningBanner,
  } = useGame();

  return (
    <div className="flex flex-col h-full">
      <div className="pb-8">
        {showResults ? (
          <Results
            showSignUpBanner={showSignUpBanner}
            showAccuracyWarningBanner={showAccuracyWarningBanner}
            wpm={wpm}
            accuracy={accuracy}
            secondsTaken={secondsTaken}
            rawWpm={rawWpm}
            numWords={numWords}
          />
        ) : (
          <TypingGame
            wordsToType={wordsToType}
            wordsTyped={wordsTyped}
            charMatches={charMatches}
            started={started}
            handleNumWordsChange={handleNumWordsChange}
            handleCapsChange={handleCapsChange}
            numWords={numWords}
            useCaps={useCaps}
          />
        )}
      </div>
      <div className="flex justify-center">
        <button onClick={handleRestart}>
          <RotateCcw />
        </button>
      </div>
    </div>
  );
};

export default Game;
