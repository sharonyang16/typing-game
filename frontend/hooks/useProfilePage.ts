"use client";
import { useLayoutEffect, useRef, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const useProfilePage = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const deleteDialogRef = useRef<HTMLDialogElement>(null);
  const { user, logout, deleteAccount } = useAuthContext();
  const router = useRouter();

  if (!user) {
    router.push("/authentication/login");
  }

  useLayoutEffect(() => {
    if (!isDeleteModalOpen ) {
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
  };
};

export default useProfilePage;
