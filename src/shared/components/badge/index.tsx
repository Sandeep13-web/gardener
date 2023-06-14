import React from "react";
import { BadgeProps } from "./badge.props";

const Badge: React.FC<BadgeProps> = ({
  type = "accent",
  badgePosition = "top-right",
  size = "md",
  children,
  textColor = "white",
  position = "absolute",
  className,
}) => {
  const basePosition =
    {
      top: "-top-2",
      "top-right": "-top-2 -right-2",
      "top-left": "-top-2 -left-2",
      bottom: "-bottom-2",
      "bottom-left": "-bottom-2 -left-2",
      "bottom-right": "-bottom-2 -right-2",
    }[badgePosition] || "-top-2 -right-2";

  // 'top' | 'top-right' | 'top-left' | 'bottom' | 'bottom-right' | 'bottom-left' ;
  return (
    <div
      className={`badge ${
        type ? `badge-${type}` : "badge-accent"
      } badge-${size} p-[5px] text-${textColor} ${position} ${basePosition}
      ${className ? className : ""}`}
    >
      {children}
    </div>
  );
};

export default Badge;
