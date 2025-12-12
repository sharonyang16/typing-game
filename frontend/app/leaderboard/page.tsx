"use client";

import useLeaderboardPage from "@/hooks/useLeaderboardPage";
import Link from "next/link";
import Banner from "@/components/banner/banner";
import Leaderboard from "@/components/leaderboard/table";
import Filters from "@/components/leaderboard/filters";

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
        <Filters
          selectedWordCount={selectedWordCount}
          selectedCapitals={selectedCapitals}
          handleWordCountChange={handleWordCountChange}
          handleCapitalsChange={handleCapitalsChange}
        />
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
