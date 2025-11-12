"use client";

import useLeaderboardPage from "@/hooks/useLeaderboardPage";
import Link from "next/link";

const LeaderboardPage = () => {
  const { tests, showBanner } = useLeaderboardPage();
  return (
    <div className="flex flex-col gap-4">
      <h1>Leaderboard</h1>
      {showBanner && (
        <div
          role="alert"
          className="alert alert-vertical sm:alert-horizontal flex justify-between"
        >
          <div>Login to join the leaderboard!</div>
          <div>
            <Link href="/authentication/login" className="btn btn-sm">
              Sign In
            </Link>
          </div>
        </div>
      )}
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>User</th>
            <th>WPM</th>
            <th>Time</th>
            <th>Accuracy</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {tests.map((test, index) => (
            <tr key={`test-${index}`}>
              <td>{index + 1}</td>
              <td>{test.username}</td>
              <td>{test.wpm}</td>
              <td>{test.timeToComplete}</td>
              <td>{test.accuracy}</td>
              <td>{test.date.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardPage;
