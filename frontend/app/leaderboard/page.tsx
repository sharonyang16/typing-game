"use client";

import useLeaderboardPage from "@/hooks/useLeaderboardPage";
import { Check, X } from "lucide-react";
import Link from "next/link";
import numWordsConstant from "@/static/numWords.json";
import capitalsConstant from "@/static/capitalsFilterOptions.json";

const LeaderboardPage = () => {
  const {
    tests,
    showSignUpBanner,
    handleWordCountChange,
    handleCapitalsChange,
    selectedWordCount,
    selectedCapitals,
  } = useLeaderboardPage();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">Leaderboard</h1>
      {showSignUpBanner && (
        <div
          role="alert"
          className="alert alert-vertical sm:alert-horizontal flex justify-between"
        >
          <div>Sign up to join the leaderboard!</div>
          <div className="flex gap-2">
            <Link href="/authentication/login" className="btn btn-sm">
              Login
            </Link>
            <Link
              href="/authentication/sign-up"
              className="btn btn-sm btn-primary"
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
      <div className="flex gap-8 items-start">
        <div className="flex flex-col gap-4">
          <fieldset className="fieldset">
            <label className="label">Word Count</label>
            <div className="join join-vertical">
              {numWordsConstant.map((value) => (
                <input
                  className="join-item btn"
                  key={`numWords-${value}`}
                  type="radio"
                  name="word-count-options"
                  value={value}
                  checked={selectedWordCount === value}
                  aria-label={value.toString()}
                  onChange={handleWordCountChange}
                />
              ))}
            </div>
          </fieldset>
          <fieldset className="fieldset">
            <label className="label">Capitals</label>
            <div className="join join-vertical">
              {capitalsConstant.map(({ label, value }) => (
                <input
                  className="join-item btn"
                  key={`numWords-${value}`}
                  type="radio"
                  name="caps-options"
                  value={value}
                  checked={selectedCapitals === value}
                  aria-label={label}
                  onChange={handleCapitalsChange}
                />
              ))}
            </div>
          </fieldset>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>User</th>
              <th>WPM</th>
              <th>Time</th>
              <th>Accuracy</th>
              {!selectedCapitals && <th>Caps</th>}
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test, index) => (
              <tr key={`test-${index}`}>
                <td>{index + 1}</td>
                <td>{test.user}</td>
                <td>{test.wpm}</td>
                <td>{test.timeToComplete}</td>
                <td>{test.accuracy}</td>
                {!selectedCapitals && (
                  <td>{test.useCapitals ? <Check /> : <X />}</td>
                )}
                <td>{test.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardPage;
