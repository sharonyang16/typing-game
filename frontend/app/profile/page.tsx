"use client";
import useProfilePage from "@/hooks/useProfilePage";

const ProfilePage = () => {
  const {
    setIsDeleteModalOpen,
    handleLogout,
    handleDeleteAccount,
    deleteDialogRef,
  } = useProfilePage();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">Profile</h1>

      <dialog ref={deleteDialogRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Deleting account</h3>
          <p className="py-4">Are you sure you want to delete your account?</p>
          <div className="w-full flex gap-2 justify-end">
            <button
              className="btn btn-outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </button>
            <button className="btn btn-error" onClick={handleDeleteAccount}>
              Delete
            </button>
          </div>
        </div>
      </dialog>
      <div className="flex flex-col gap-4 w-fit">
        <button
          className="btn btn-error btn-outline"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          Delete Account
        </button>
        <button className="btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
