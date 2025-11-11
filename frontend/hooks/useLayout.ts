"use client";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect } from "react";

const useLayout = () => {
  const { checkAuth } = useAuthContext();

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line
  }, []);
};

export default useLayout;
