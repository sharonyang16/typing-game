"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
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
  const deleteDialogRef = useRef<HTMLDialogElement>(null);
  const { user, setUser, logout, deleteAccount } = useAuthContext();
  const router = useRouter();

  if (!user) {
    router.push("/authentication/login");
  }

  useEffect(() => {
    const getTests = async () => {
      const tests = await getAllTests(
        `orderByField=date&orderBy=asc&user=${user?.email}`
      );
      setTests(tests);
    };

    getTests();
  }, []);

  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
    }
  }, [user]);

  const setDefault = () => {
    setUsername(user?.username || "");
  };

  const handleEditCancel = () => {
    setDefault();
    setIsEditingProfile(false);
  };
  const handleEditSave = async () => {
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

  useLayoutEffect(() => {
    if (!isDeleteModalOpen) {
      deleteDialogRef.current?.close();
    } else {
      deleteDialogRef.current?.showModal();
    }
  }, [isDeleteModalOpen]);

  const handleLogout = async () => {
    await logout();
  };

  const handleDeleteAccount = async () => {
    await deleteAccount();
  };

  return {
    isDeleteModalOpen,
    setIsDeleteModalOpen,
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
    tests,
  };
};

export default useProfilePage;
