"use client";
import useProfilePage from "@/hooks/useProfilePage";

const ProfilePage = () => {
  const { handleLogout } = useProfilePage();

  return (
    <div>
      <h1 className="text-xl font-bold">Profile</h1>
      <button className="btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
