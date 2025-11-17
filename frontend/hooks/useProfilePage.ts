"use client";
import { useLayoutEffect, useRef, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { patchUser } from "@/services/user-services";
import { AxiosError } from "axios";

const useProfilePage = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const deleteDialogRef = useRef<HTMLDialogElement>(null);
  const { user, setUser, logout, deleteAccount } = useAuthContext();
  const router = useRouter();

  if (!user) {
    router.push("/authentication/login");
  }

  const setDefault = () => {
    setUsername(user?.username || "");
  };

  const handleEditCancel = () => {
    setDefault();
    setIsEditingProfile(false);
  };
  const handleEditSave = async () => {
    try {
      const user = await patchUser({ username });
      setUser(user);
      setIsEditingProfile(false);
      setSuccess("Profile updated successfully!");
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
    success,
  };
};

export default useProfilePage;
