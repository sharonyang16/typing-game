"use client";
import { useState, useEffect } from "react";
import { getAllTests } from "@/services/typing-test-services";
import { PopulatedTypingTest } from "@/types/typing-test";
import { useAuthContext } from "@/context/AuthContext";

const useLeaderboardPage = () => {
  const [tests, setTests] = useState<PopulatedTypingTest[]>([]);
  const [showBanner, setShowBanner] = useState(false);

  const { user } = useAuthContext();

  useEffect(() => {
    const getTests = async () => {
      const tests = await getAllTests();
      setTests(tests);
    };
    getTests();
  }, []);

  useEffect(() => {
    if (user) {
      setShowBanner(false);
    } else {
      setShowBanner(true);
    }
  }, [user]);

  return {
    tests,
    showBanner,
  };
};

export default useLeaderboardPage;
