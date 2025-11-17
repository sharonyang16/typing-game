"use client";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useProfilePage = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { user, logout, deleteAccount } = useAuthContext();
  const router = useRouter();

  if (!user) {
    router.push("/authentication/login");
  }
  const handleLogout = async () => {
    await logout();
  };

  const handleDeleteAccount = async () => {
    await deleteAccount();
  };

  return {
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleLogout,
    handleDeleteAccount,
  };
};

export default useProfilePage;
