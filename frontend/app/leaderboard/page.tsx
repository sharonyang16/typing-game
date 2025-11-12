"use client";

import useLeaderboardPage from "@/hooks/useLeaderboardPage";

const LeaderboardPage = () => {
  const { tests } = useLeaderboardPage();
  return (
    <main>
      <h1>Leaderboard</h1>
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
    </main>
  );
};

export default LeaderboardPage;
