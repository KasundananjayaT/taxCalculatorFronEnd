import React from "react";
import { Outlet } from "react-router-dom";

export default function Layot() {
  return (
    <div>
      <div className="flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden ">
        <div className="flex-1">
          <div>{<Outlet />}</div>
          {/*Used to add other dyanamic components */}
        </div>
      </div>
    </div>
  );
}
