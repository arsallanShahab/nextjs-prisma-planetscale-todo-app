"use client";

import ReorderItem from "@/components/reorder-item";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import type { Todo, User } from "@/lib/types";
import { cn } from "@/lib/utils";
import { AnimatePresence, Reorder, motion } from "framer-motion";
import { BadgeX, Plus } from "lucide-react";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

interface User {
  id: string;
}

interface FetchTodosProps {
  setTodos: Dispatch<SetStateAction<any>>;
  user: User;
}

const Home = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(false);
  const [userLoading, setUserLoading] = useState<boolean>(false);
  const [skeletonLoading, setSkeletonLoading] = useState<boolean>(true);
  const [todosLoading, setTodosLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const handleChangeKeyboard = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const addTodo = useCallback(async () => {
    if (user) {
      setLoading(true);
      if (!todo) {
        toast.error("Todo cannot be empty");
        setLoading(false);
        return;
      }
      toast.promise(
        fetch("/api/todos/add", {
          method: "POST",
          body: JSON.stringify({ title: todo, userId: user?.id }),
        })
          .then((res) => {
            res.json();
            setTodo("");
          })
          .finally(() => {
            setLoading(false);
          }),
        {
          loading: "Adding todo...",
          success: "Todo Added",
          error: "Failed to add todos",
        }
      );
    }
  }, [user, todo]);

  useEffect(() => {
    setUserLoading(true);
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .then(() => {
        setUserLoading(false);
      });
  }, []);

  const fetchTodos = async ({
    setTodos,
    user,
  }: FetchTodosProps): Promise<void> => {
    toast.promise(
      fetch("/api/todos/all/" + user?.id)
        .then((res) => res.json())
        .then((data) => {
          setTodos(data);
        }),
      {
        loading: "Loading todos...",
        success: "Todos loaded",
        error: "Failed to load todos",
      }
    );
  };

  useEffect(() => {
    if (user) {
      setTodosLoading(true);
      toast.promise(
        fetch("/api/todos/all/" + user?.id)
          .then((res) => res.json())
          .then((data) => {
            setTodos(data);
          })
          .finally(() => {
            setTodosLoading(false);
            setSkeletonLoading(false);
          }),
        {
          loading: "Loading todos...",
          success: "Todos loaded",
          error: "Failed to load todos",
        }
      );
    }
  }, [user, loading]);

  return (
    <main className="flex flex-col items-center justify-stretch h-full p-5 overflow-x-hidden overflow-y-auto scrollbar">
      <div className="relative w-full max-w-4xl h-full overflow-y-auto overflow-x-hidden pb-36 sm:pb-44">
        <div className="relative flex flex-col justify-start items-center gap-10 w-full sm:px-7 py-2.5 min-h-full">
          {skeletonLoading && (
            <div className="flex flex-col justify-start items-center w-full gap-5">
              {Array.from(Array(5)).map((_, i) => (
                <Skeleton key={i} className="w-full h-20 rounded-xl" />
              ))}
            </div>
          )}
          <AnimatePresence>
            <motion.div
              layout="size"
              className="w-full relative h-full origin-top"
            >
              <AnimatePresence>
                {todos &&
                  todos.map((todo, i) => {
                    return (
                      <ReorderItem
                        i={i}
                        setTodos={setTodos}
                        todo={todo}
                        todos={todos}
                        key={todo?.id}
                      />
                    );
                  })}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="fixed bottom-0 inset-x-0 w-full h-48 z-[100] bg-gradient-to-t dark:from-zinc-900 from-white to-transparent"></div>
      <div className="w-full fixed bottom-10 sm:bottom-24 inset-x-0 flex justify-center z-[200] px-2.5">
        <div className="max-w-xl mx-auto w-full z-[300]">
          {(loading || todosLoading || userLoading) && (
            <div className="relative flex justify-center items-center w-full py-8">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl dark:bg-zinc-700 dark:border-zinc-800 bg-white border border-amethyst-100">
                <BadgeX className="w-5 h-5 animate-spin text-amethyst-600" />
              </div>
            </div>
          )}
          <div className="relative">
            <Input
              placeholder="What's up for Today"
              className="w-full py-8 px-6 text-base rounded-xl bg-amethyst-50 dark:bg-zinc-700 text-amethyst-600 placeholder:text-amethyst-600 dark:text-amethyst-300 shadow-xl shadow-amethyst-300 border border-amethyst-200 dark:shadow-zinc-900 placeholder:select-none pr-[120px]"
              value={todo}
              onChange={handleChange}
              onKeyDown={handleChangeKeyboard}
            />
            <div
              className="absolute inset-y-1.5 transform font-medium bg-amethyst-600 text-sm hover:bg-amethyst-700 text-amethyst-100 px-4 flex justify-center items-center right-1.5 rounded-xl cursor-pointer dark:bg-amethyst-700 dark:text-zinc-900 active:scale-95"
              onClick={addTodo}
            >
              ADD TODO
              {/* <Plus size={20} className="object-cover" /> */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
