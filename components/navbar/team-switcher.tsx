import React from "react";
import { Popover, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { PopoverContent } from "@radix-ui/react-popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import { PlusCircleIcon } from "lucide-react";

const groups = [
  {
    label: "Personal Account",
    teams: [{ label: "Evandro V." }],
  },
  {
    label: "Teams",
    teams: [
      { label: "Evandro V1." },
      { label: "Evandro V2." },
      { label: "Evandro V3." },
    ],
  },
];

export default function TeamSwitcher() {
  return (
    <Popover>
      <PopoverTrigger>
        <div
          aria-label="Select a team"
          className="px-3 py-2 transition-all hover:bg-secondary flex rounded-2xl items-center gap-1.5 w-[200px] justify-between border"
        >
          <Avatar className="mr-2 h-6 w-6">
            <AvatarImage
              src="http://avatar.vercel.sh/Evandro.png"
              alt="Avatar"
            />
            <AvatarFallback>EV</AvatarFallback>
          </Avatar>
          Evandro Viegas
          <CaretSortIcon />
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-80">
        <Command>
          <CommandInput placeholder="Search Team..." />
          <CommandList>
            <CommandEmpty>No team found.</CommandEmpty>
            {groups.map((group) => (
              <CommandGroup key={group.label} heading={group.label}>
                {group.teams.map((team) => (
                  <CommandItem key={team.label} className="text-sm">
                    <Avatar className="mr-2 h-5 w-5">
                      <AvatarImage
                        alt={team.label}
                        src={`https://avatar.vercel.sh/${team.label}.png`}
                      />
                    <AvatarFallback className="uppercase">
                      {team.label}
                    </AvatarFallback>
                    </Avatar>
                    {team.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
          <CommandSeparator />
            <CommandList>
                <CommandGroup>
                    <CommandItem>
                        <PlusCircleIcon className="mr-2 h-5 w-5" />
                        Create Team
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
