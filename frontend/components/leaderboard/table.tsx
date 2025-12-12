import { Check, X } from "lucide-react";
import { TypingTestLeaderboardEntry } from "@/types/typing-test";

type LeaderboardProps = {
  tests: TypingTestLeaderboardEntry[];
  loading: boolean;
  selectedCapitals: boolean;
};

const Leaderboard = ({
  tests,
  loading,
  selectedCapitals,
}: LeaderboardProps) => {
  return (
    <table className="table table-fixed">
      <thead>
        <tr>
          <th className="w-12"></th>
          <th className="w-48">User</th>
          <th>WPM</th>
          <th>Time</th>
          <th>Acc.</th>
          {!selectedCapitals && <th>Caps</th>}
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {loading &&
          [...Array(5)].map((_, index) => (
            <tr key={`skeleton-row-${index}`}>
              {[...Array(selectedCapitals ? 6 : 7)]
                .fill(selectedCapitals ? 6 : 7)
                .map((_, index) => (
                  <td key={`skeleton-${index}`}>
                    <div className="skeleton h-4" />
                  </td>
                ))}
            </tr>
          ))}
        {!loading && tests.length === 0 ? (
          <tr>
            <td colSpan={selectedCapitals ? 6 : 7} className="py-8 text-center">
              No tests yet
            </td>
          </tr>
        ) : (
          tests.map((test, index) => (
            <tr key={`test-${index}`}>
              <td>{index + 1}</td>
              <td className="whitespace-nowrap overflow-hidden text-ellipsis">
                {test.user}
              </td>
              <td>{test.wpm}</td>
              <td>{test.timeToComplete}</td>
              <td>{test.accuracy}</td>
              {!selectedCapitals && (
                <td>{test.useCapitals ? <Check /> : <X />}</td>
              )}
              <td>
                <div className="tooltip" data-tip={test.dateFull}>
                  {test.date}
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Leaderboard;
