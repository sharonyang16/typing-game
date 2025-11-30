"use client";
import useProfilePage from "@/hooks/useProfilePage";
import {
  VictoryChart,
  VictoryTheme,
  VictoryArea,
  VictoryAxis,
  VictoryVoronoiContainer,
  VictoryTooltip,
} from "victory";
import { format } from "date-fns";
import Banner from "@/components/banner/banner";
import Link from "next/link";

const ProfilePage = () => {
  const {
    setIsDeleteModalOpen,
    handleLogout,
    handleDeleteAccount,
    deleteDialogRef,
    username,
    setUsername,
    isEditingProfile,
    setIsEditingProfile,
    handleEditCancel,
    handleEditSave,
    error,
    chartData,
    chartLoading,
  } = useProfilePage();

  const axisLabelStyle = {
    fill: "white",
    fontSize: 6,
    fontFamily: "var(--font-mono)",
    fontWeight: "500",
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">Profile</h1>
      <div className="flex flex-col gap-8">
        <div className="card card-border">
          {isEditingProfile ? (
            <div className="card-body">
              <h2 className="card-title">Edit Account Info</h2>
              {error && <Banner message={error} type="error" />}
              <fieldset className="fieldset w-fit">
                <label className="label">Username</label>
                <input
                  type="text"
                  className="input"
                  placeholder="example@example.com"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
              </fieldset>

              <div className="card-actions justify-end items-end">
                <button className="btn" onClick={handleEditCancel}>
                  Cancel
                </button>
                <button
                  className="btn btn-primary mt-4"
                  onClick={handleEditSave}
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className="card-body">
              <h2 className="card-title">Account Info</h2>
              <div className="flex gap-2">
                Username: <div>{username || "No username set"}</div>
              </div>
              <div className="card-actions justify-end">
                <button
                  className="btn "
                  onClick={() => setIsEditingProfile(true)}
                >
                  Edit
                </button>
              </div>
            </div>
          )}
        </div>
        <div>
          {chartLoading ? (
            <div className="flex gap-4 justify-center items-center">
              <div className="skeleton h-12 w-4" />
              <div className="self-stretch flex flex-col justify-between">
                {[...Array(6)].fill(6).map((_, index) => (
                  <div
                    key={`skeleton-${index}`}
                    className="skeleton h-4 w-12 "
                  />
                ))}
              </div>
              <div className="skeleton h-90 w-190" />
            </div>
          ) : chartData.length > 0 ? (
            <VictoryChart
              theme={VictoryTheme.clean}
              domainPadding={{ y: [0, 30] }}
              containerComponent={
                <VictoryVoronoiContainer
                  labels={({ datum }) =>
                    `${datum.y} WPM, ${format(datum.x, "MM/dd, HH:mm")}`
                  }
                  labelComponent={
                    <VictoryTooltip
                      constrainToVisibleArea
                      style={axisLabelStyle}
                      flyoutStyle={{
                        fill: "var(--color-base-100)",
                      }}
                    />
                  }
                />
              }
            >
              <VictoryArea
                data={chartData}
                style={{
                  data: {
                    fill: "var(--color-primary)",
                    fillOpacity: 0.3,
                    stroke: "var(--color-primary)",
                    strokeWidth: 2,
                  },
                }}
              />

              <VictoryAxis
                dependentAxis
                label="WPM"
                style={{
                  axisLabel: axisLabelStyle,
                  tickLabels: axisLabelStyle,
                }}
              />
            </VictoryChart>
          ) : (
            <Banner
              message="No tests completed yet! Complete tests while logged in to track your progress."
              type="info"
              action={
                <Link href="/" className="btn btn-sm btn-primary">
                  Complete a test
                </Link>
              }
            />
          )}
        </div>
        <dialog ref={deleteDialogRef} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Deleting account</h3>
            <p className="py-4">
              Are you sure you want to delete your account?
            </p>
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
    </div>
  );
};

export default ProfilePage;
