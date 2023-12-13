import React from "react";
import { ModeToggle } from "./theme-toggler";
import { Button } from "./ui/button";

type Props = {};

function Navbar({}: Props) {
  return (
    <div className="w-full dark:bg-zinc-900">
      <div className="max-w-screen-2xl mx-auto px-5 sm:px-10">
        <div className="flex justify-between items-center py-5">
          <div className="flex items-center">
            <h3 className="text-2xl font-bold dark:text-amethyst-600">
              UiTodo
            </h3>
          </div>
          <div className="flex items-center gap-5">
            <ModeToggle />
            <Button className="px-5 rounded-lg bg-amethyst-600 dark:bg-amethyst-600 dark:text-zinc-900 hover:bg-amethyst-700 active:bg-amethyst-600 active:scale-95">
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
