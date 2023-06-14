import React from "react";
import { Props } from "../button/button.props";

const Badge: React.FC<Props> = (type, position = "top-right") => {
  return (
    <div className="badge badge-accent absolute p-[5px] -top-2 -right-2 text-white">
      0
    </div>
  );
};

export default Badge;
