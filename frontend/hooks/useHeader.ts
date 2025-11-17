"use client";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";

const useHeader = () => {
  const [headerText, setHeaderText] = useState("");
  const [link, setLink] = useState("/authentication/login");
  const { user, checkAuth } = useAuthContext();

  useEffect(() => {
    const loginPersistenceCheck = async () => {
      await checkAuth();
    };

    loginPersistenceCheck();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (user) {
      setHeaderText(user.username || user.email);
      setLink("/profile");
    } else {
      setHeaderText("");
      setLink("/authentication/login");
    }
  }, [user]);

  return { headerText, link };
};

export default useHeader;
