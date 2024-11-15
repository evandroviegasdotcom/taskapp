import React from "react";
import TeamSwitcher from "./team-switcher";
import Links from "./links";
import Search from "./search";
import Avatar from "./avatar";
import Logout from "./logout";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-4 py-2 border-b">
      <div className="flex items-center gap-12">
        <TeamSwitcher />
        <Links />
      </div>
      <div className="flex items-center gap-4">
        <Search />
        <Avatar />
        <Logout />
      </div>
    </nav>
  );
}
