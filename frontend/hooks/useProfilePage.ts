"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import { patchUser } from "@/services/user-services";
import { AxiosError } from "axios";
import { TypingTest } from "@/types/typing-test";
import { getAllTests } from "@/services/typing-test-services";

const useProfilePage = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [error, setError] = useState("");
  const [tests, setTests] = useState<TypingTest[]>([]);
  const [chartData, setChartData] = useState<{ x: Date; y: number }[]>([]);
  const [chartLoading, setChartLoading] = useState(false);
  const deleteDialogRef = useRef<HTMLDialogElement>(null);
  const { user, setUser, logout, deleteAccount } = useAuthContext();

  if (!user) {
    redirect("/authentication/login");
  }

  // Fetches tests
  useEffect(() => {
    const getTests = async () => {
      setChartLoading(true);
      const tests = await getAllTests(
        `orderByField=date&orderBy=asc&user=${user?.email}`
      );
      setTests(tests);
      setChartLoading(false);
    };

    getTests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sets/cleans chart data if there are tests
  useEffect(() => {
    if (tests.length > 0) {
      setChartData(
        tests.map((test: TypingTest) => {
          return {
            x: test.date,
            y: test.wpm,
          };
        })
      );
    }
  }, [tests]);

  // Sets username
  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
    }
  }, [user]);

  // Handles delete modal open and close
  useLayoutEffect(() => {
    if (!isDeleteModalOpen) {
      deleteDialogRef.current?.close();
    } else {
      deleteDialogRef.current?.showModal();
    }
  }, [isDeleteModalOpen]);

  /**
   * Handles delete model state.
   * @param open If the modal should be open
   * @returns void
   */
  const handleDeleteModelState = (open: boolean): void => {
    setIsDeleteModalOpen(open);
  };

  /**
   * Resets editable user fields.
   * @returns void
   */
  const setDefault = (): void => {
    setUsername(user?.username || "");
  };

  /**
   * Handles profile edit cancel.
   * @returns void
   */
  const handleEditCancel = (): void => {
    setDefault();
    setIsEditingProfile(false);
  };

  /**
   * Handles profile edit save.
   * @returns A Promise that resolves to void.
   */
  const handleEditSave = async (): Promise<void> => {
    try {
      if (!username) {
        setError("Username cannot be empty!");
        return;
      }
      const user = await patchUser({ username });
      setUser(user);
      setIsEditingProfile(false);
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e.response?.data);
      }
    }
  };

  /**
   * Handles logout.
   * @returns A Promise that resolves to void.
   */
  const handleLogout = async (): Promise<void> => {
    await logout();
  };

  /**
   * Handles account deletion.
   * @returns A Promise that resolves to void.
   */
  const handleDeleteAccount = async (): Promise<void> => {
    await deleteAccount();
  };

  return {
    isDeleteModalOpen,
    handleDeleteModelState,
    deleteDialogRef,
    handleLogout,
    handleDeleteAccount,
    username,
    setUsername,
    isEditingProfile,
    setIsEditingProfile,
    handleEditCancel,
    handleEditSave,
    error,
    chartLoading,
    chartData,
  };
};

export default useProfilePage;
