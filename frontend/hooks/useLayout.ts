"use client";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";

const useLayout = () => {
  const [headerText, setHeaderText] = useState("Welcome!");
  const { user, checkAuth } = useAuthContext();

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (user) {
      setHeaderText(`Hi, ${user.email}!`);
    } else {
      setHeaderText("Welcome!");
    }
  }, [user]);

  return { headerText };
};

export default useLayout;
