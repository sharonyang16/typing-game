"use client";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";

/**
 * Custom hook for the header.
 * @returns headerText - the text to be displayed in the header
 * @returns profileLink - the link for the profile icon in the header
 */
const useHeader = () => {
  const [headerText, setHeaderText] = useState("");
  const [profileLink, setProfileLink] = useState("/authentication/login");
  const { user, checkAuth } = useAuthContext();

  // Logs in the user if there's a valid session
  useEffect(() => {
    const loginPersistenceCheck = async () => {
      await checkAuth();
    };

    loginPersistenceCheck();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sets the text and link in the header based on if there's a user
  useEffect(() => {
    if (user) {
      setHeaderText(user.username || user.email);
      setProfileLink("/profile");
    } else {
      setHeaderText("");
      setProfileLink("/authentication/login");
    }
  }, [user]);

  return { headerText, profileLink };
};

export default useHeader;
