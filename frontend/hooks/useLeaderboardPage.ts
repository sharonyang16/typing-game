"use client";
import { useState, useEffect } from "react";
import { getAllTests } from "@/services/typing-test-services";
import {
  PopulatedTypingTest,
  TypingTestLeaderboardEntry,
} from "@/types/typing-test";
import { useAuthContext } from "@/context/AuthContext";
import { format } from "date-fns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useLeaderboardPage = () => {
  const [tests, setTests] = useState<TypingTestLeaderboardEntry[]>([]);
  const [showSignUpBanner, setShowSignUpBanner] = useState(false);
  const [selectedWordCount, setSelectedWordCount] = useState(25);
  const [selectedCapitals, setSelectedCapitals] = useState("");
  const { user } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const wordCount = searchParams.get("wordCount") ?? "25";
    setSelectedWordCount(parseInt(wordCount));
    const useCapitals = searchParams.get("usedCapitals");

    const getTests = async () => {
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
            date: format(test.date, "MM-dd-yyyy"),
            words: test.wordsTyped.split(" ").length,
          };
        })
      );
    };
    getTests();
  }, [searchParams]);

  const handleWordCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const params = new URLSearchParams(searchParams.toString());
      params.set("wordCount", e.target.value || "");
      setSelectedWordCount(parseInt(e.target.value || "25"));

      router.push(pathname + "?" + params.toString());
    } catch {
      // do nothing
    }
  };

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

  useEffect(() => {
    setShowSignUpBanner(!user);
  }, [user]);

  return {
    tests,
    showSignUpBanner,
    handleWordCountChange,
    handleCapitalsChange,
    selectedWordCount,
    selectedCapitals,
  };
};

export default useLeaderboardPage;
