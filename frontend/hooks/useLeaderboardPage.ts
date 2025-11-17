"use client";
import { useState, useEffect } from "react";
import { getAllTests } from "@/services/typing-test-services";
import {
  PopulatedTypingTest,
  TypingTestLeaderboardEntry,
} from "@/types/typing-test";
import { useAuthContext } from "@/context/AuthContext";

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
            date: new Date(test.date).toLocaleDateString(),
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
