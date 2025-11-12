"use client";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const useProfilePage = () => {
  const { user, logout } = useAuthContext();
  const router = useRouter();

  if (!user) {
    router.push("/authentication/login");
  }
  const handleLogout = async () => {
    await logout();
  };
  return { handleLogout };
};

export default useProfilePage;
