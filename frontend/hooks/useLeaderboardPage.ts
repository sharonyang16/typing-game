"use client";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getAllTests } from "@/services/typing-test-services";
import {
  PopulatedTypingTest,
  TypingTestLeaderboardEntry,
} from "@/types/typing-test";
import { useAuthContext } from "@/context/AuthContext";

/**
 * Custom hook for the leaderboard page.
 * @returns tests - the tests to be displayed
 * @returns showSignUpBanner - if the sign up banner should be shown
 * @returns handleWordCountChange - the function to handle word count change
 * @returns handleCapitalsChange - the function to handle capitals change
 * @returns selectedWordCount - the currently selected word count
 * @returns selectedCapitals - the currently selected capitals
 * @returns loading - if the tests are loading
 */
const useLeaderboardPage = () => {
  const [tests, setTests] = useState<TypingTestLeaderboardEntry[]>([]);
  const [showSignUpBanner, setShowSignUpBanner] = useState(false);
  const [selectedWordCount, setSelectedWordCount] = useState(25);
  const [selectedCapitals, setSelectedCapitals] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Fetches tests on search params change
  useEffect(() => {
    const wordCount = searchParams.get("wordCount") ?? "25";
    setSelectedWordCount(parseInt(wordCount));
    const useCapitals = searchParams.get("usedCapitals");

    const getTests = async () => {
      setTests([]);
      setLoading(true);
      const tests = await getAllTests(
        `orderByField=wpm&wordCount=${wordCount}${
          useCapitals ? `&usedCapitals=${useCapitals}` : ""
        }`
      );

      setTests(
        tests.map((test: PopulatedTypingTest) => {
          return {
            ...test,
            user: test.user.username || test.user.email,
            date: format(test.date, "MM/dd"),
            dateFull: format(test.date, "LLL dd, yyyy @ h:mm aaa"),
            words: test.wordsTyped.split(" ").length,
          };
        })
      );
      setLoading(false);
    };

    getTests();
  }, [searchParams]);

  // Show sign up banner if user is not logged in
  useEffect(() => {
    setShowSignUpBanner(!user);
  }, [user]);

  /**
   * Pushes the new word count param value to the url on input change.
   * @param e The event object from the input change event.
   * @returns void
   */
  const handleWordCountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    try {
      const params = new URLSearchParams(searchParams.toString());
      params.set("wordCount", e.target.value || "");
      setSelectedWordCount(parseInt(e.target.value || "25"));

      router.push(pathname + "?" + params.toString());
    } catch {
      // do nothing
    }
  };

  /**
   * Pushes the used capital param value to the url on input change.
   * @param e The event object from the input change event.
   * @returns void
   */
  const handleCapitalsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const params = new URLSearchParams(searchParams.toString());
      params.set("usedCapitals", e.target.value || "");
      setSelectedCapitals(e.target.value || "");

      router.push(pathname + "?" + params.toString());
    } catch {
      // do nothing
    }
  };

  return {
    tests,
    showSignUpBanner,
    handleWordCountChange,
    handleCapitalsChange,
    selectedWordCount,
    selectedCapitals,
    loading,
  };
};

export default useLeaderboardPage;
