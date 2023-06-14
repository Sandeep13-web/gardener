import React from "react";
import { Props } from "./button.props";

const Button: React.FC<Props> = ({
  htmlType = "button",
  children,
  type,
  disabled = false,
  className,
  onClick,
  size = "md",
  icon,
  iconPosition = "left",
  outline = false,
  loading = false,
}) => {
  return (
    <button
      onClick={onClick}
      type={htmlType}
      disabled={disabled}
      className={`btn btn-${size} btn-${type} ${className} ${
        outline ? "btn-outline" : ""
      }`}
    >
      {loading ? (
        <span className={`loading loading-ring loading-${size}`} />
      ) : (
        ""
      )}
      {iconPosition === "left" ? icon : ""}
      {children}
      {iconPosition === "right" ? icon : ""}
    </button>
  );
};

export default Button;
