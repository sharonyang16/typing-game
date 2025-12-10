"use client";

import useLeaderboardPage from "@/hooks/useLeaderboardPage";
import Link from "next/link";
import numWordsConstant from "@/static/numWords.json";
import capitalsConstant from "@/static/capitalsFilterOptions.json";
import Banner from "@/components/banner/banner";
import Leaderboard from "@/components/leaderboard/table";

const LeaderboardPage = () => {
  const {
    tests,
    showSignUpBanner,
    handleWordCountChange,
    handleCapitalsChange,
    selectedWordCount,
    selectedCapitals,
    loading,
  } = useLeaderboardPage();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">Leaderboard</h1>
      {showSignUpBanner && (
        <Banner
          message="Sign up to join the leaderboard!"
          action={
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
          }
        />
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

        <Leaderboard
          tests={tests}
          loading={loading}
          selectedCapitals={!!selectedCapitals}
        />
      </div>
    </div>
  );
};

export default LeaderboardPage;
