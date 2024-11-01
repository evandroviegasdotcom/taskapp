import React from "react";
import {
  Avatar as AvatarComp,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar";
export default function Avatar() {
  return (
    <AvatarComp className="mr-2 h-8 w-8">
      <AvatarImage
        alt="Evandro Viegas"
        src={`https://avatars.githubusercontent.com/u/99356220?v=4`}
      />
      <AvatarFallback>EV</AvatarFallback>
    </AvatarComp>
  );
}
