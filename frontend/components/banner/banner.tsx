import { Check, CircleAlert, Info, TriangleAlert } from "lucide-react";
import React from "react";
type BannerProps = {
  message: string;
  action?: React.ReactNode;
  type?: "success" | "error" | "warning" | "info";
};

const BannerIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "success":
      return <Check />;
    case "error":
      return <CircleAlert />;
    case "warning":
      return <TriangleAlert />;
    case "info":
      return <Info />;
    default:
      return null;
  }
};

const BannerStyle = (type: string) => {
  switch (type) {
    case "success":
      return "alert-success";
    case "error":
      return "alert-error";
    case "warning":
      return "alert-warning";
    case "info":
      return "alert-info";
    default:
      return "";
  }
};

const Banner = ({ message, action, type }: BannerProps) => {
  return (
    <div
      role="alert"
      className={`alert ${BannerStyle(
        type || ""
      )} alert-vertical sm:alert-horizontal flex justify-between`}
    >
      <div className="flex gap-2 items-center">
        <BannerIcon type={type || ""} />
        <span>{message}</span>
      </div>
      {action}
    </div>
  );
};

export default Banner;
