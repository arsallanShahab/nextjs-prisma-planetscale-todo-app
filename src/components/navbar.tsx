import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "./theme-toggler";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type Props = {};

function Navbar({}: Props) {
  const { data: session, status } = useSession();
  return (
    <div className="w-full">
      <div className="max-w-screen-2xl mx-auto px-5 sm:px-10">
        <div className="flex justify-between items-center py-5">
          <div className="flex items-center">
            <h3 className="text-2xl font-bold dark:text-amethyst-600">
              UiTodo
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <ModeToggle />
            {status === "unauthenticated" && (
              <Link
                href={"/api/auth/signin"}
                className="px-5 py-2 rounded-lg text-white bg-amethyst-600 dark:bg-amethyst-600 dark:text-zinc-900 hover:bg-amethyst-700 active:bg-amethyst-600 active:scale-95"
              >
                Login
              </Link>
            )}
            {status === "authenticated" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="rounded-3xl px-2 sm:pl-5 sm:pr-1 sm:py-1 h-auto gap-3"
                  >
                    <span className="hidden sm:block">{session.user.name}</span>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-2xl"
                    >
                      <Avatar className="h-8 w-8 rounded-2xl">
                        <AvatarImage
                          src={session.user.image as string}
                          alt={session.user.name as string}
                        />
                        <AvatarFallback>
                          {session.user.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 mt-2"
                  align="end"
                  forceMount
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {session.user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {session.user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  {/* <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    Profile
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Billing
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Settings
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>New Team</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator /> */}
                  <DropdownMenuItem onClick={() => signOut()}>
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
