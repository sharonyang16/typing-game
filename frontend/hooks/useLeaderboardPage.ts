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
  const { user } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const wordCount = searchParams.get("wordCount") ?? "10";
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

  const handleWordCountClick = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    try {
      const params = new URLSearchParams(searchParams.toString());
      params.set("wordCount", e.currentTarget.ariaLabel || "");

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
    handleWordCountClick,
  };
};

export default useLeaderboardPage;
