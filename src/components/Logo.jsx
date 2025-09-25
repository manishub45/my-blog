import React from "react";

function Logo({ width = "100px" }) {
  return (
    <div
      className="text-2xl font-bold tracking-tight text-blue-600"
      style={{ width }}
    >
      MegaBlog
    </div>
  );
}

export default Logo;
