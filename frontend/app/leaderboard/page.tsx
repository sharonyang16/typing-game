"use client";

import useLeaderboardPage from "@/hooks/useLeaderboardPage";
import { Check, X } from "lucide-react";
import Link from "next/link";
import numWordsConstant from "@/static/numWords.json";

const LeaderboardPage = () => {
  const { tests, showSignUpBanner, handleWordCountClick } =
    useLeaderboardPage();

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
      <div className="flex gap-8">
        <div className="join join-vertical">
          {numWordsConstant.map((value) => (
            <input
              className="join-item btn"
              key={`numWords-${value}`}
              type="radio"
              name="options"
              aria-label={value.toString()}
              onClick={handleWordCountClick}
            />
          ))}
        </div>
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>User</th>
              {/*<th>Words</th>*/}
              <th>WPM</th>
              <th>Time</th>
              <th>Accuracy</th>
              {/*<th>Caps</th>*/}
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test, index) => (
              <tr key={`test-${index}`}>
                <td>{index + 1}</td>
                <td>{test.user}</td>
                {/*<td>{test.words}</td>*/}
                <td>{test.wpm}</td>
                <td>{test.timeToComplete}</td>
                <td>{test.accuracy}</td>
                {/*<td>{test.useCapitals ? <Check /> : <X />}</td>*/}
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
