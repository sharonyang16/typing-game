const firebaseErrors: Record<string, string> = {
  "auth/email-already-in-use":
    "The email address is already in use by another account.",
  "auth/invalid-credential": "Invalid user credentials.",
  "auth/invalid-email": "Email is invalid.",
  "auth/password-does-not-meet-requirements":
    "The password does not meet the requirements.",
  "auth/user-disabled":
    "The user account has been disabled by an administrator.",
  "auth/weak-password": "The password must be 6 characters long or more.",
};

export default firebaseErrors;
