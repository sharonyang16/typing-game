"use client";
import { useState, useEffect } from "react";
import { getAllTests } from "@/services/typing-test-services";
import {
  PopulatedTypingTest,
  TypingTestLeaderboardEntry,
} from "@/types/typing-test";
import { useAuthContext } from "@/context/AuthContext";
import { format } from "date-fns";

const useLeaderboardPage = () => {
  const [tests, setTests] = useState<TypingTestLeaderboardEntry[]>([]);
  const [showSignUpBanner, setShowSignUpBanner] = useState(false);

  const { user } = useAuthContext();

  useEffect(() => {
    const getTests = async () => {
      const tests = await getAllTests("orderByField=wpm");

      setTests(
        tests.map((test: PopulatedTypingTest) => {
          return {
            ...test,
            user: test.user.username || test.user.email,
            date: format(test.date, "MM-dd-yyyy"),
            words: test.wordsTyped.split(" ").length,
          };
        })
      );
    };
    getTests();
  }, []);

  useEffect(() => {
    setShowSignUpBanner(!user);
  }, [user]);

  return {
    tests,
    showSignUpBanner,
  };
};

export default useLeaderboardPage;
