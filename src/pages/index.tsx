"use client";

import ReorderItem from "@/components/reorder-item";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Todo } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeX, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
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
}

const Home = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>(null as unknown as Todo[]);
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(false);
  const [userLoading, setUserLoading] = useState<boolean>(false);
  const [skeletonLoading, setSkeletonLoading] = useState<boolean>(true);
  const [todosLoading, setTodosLoading] = useState<boolean>(false);

  const { data: session, status } = useSession();
  console.log(session, status);

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const handleChangeKeyboard = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const addTodo = useCallback(async () => {
    if (session?.user) {
      setLoading(true);
      if (!todo) {
        toast.error("Todo cannot be empty");
        setLoading(false);
        return;
      }
      try {
        const res = await fetch("/api/todos/add/", {
          method: "POST",
          body: JSON.stringify({ title: todo }),
        });
        const data = await res.json();
        setTodos([data, ...todos]);
      } catch (error) {
        toast.error("Failed to add todo");
      } finally {
        setTodo("");
        setLoading(false);
      }
    }
  }, [todo, session?.user, todos]);

  const fetchTodos = useCallback(
    async ({ setTodos }: FetchTodosProps) => {
      if (session?.user) {
        setTodosLoading(true);
        try {
          const res = await fetch("/api/todos/all/" + session?.user.id);
          const data = await res.json();
          setTodos(data);
        } catch (error) {
          toast.error("Failed to load todos");
        } finally {
          setTodosLoading(false);
        }
      }
    },
    [session?.user?.id]
  );

  useEffect(() => {
    if (status == "unauthenticated") {
      router.push("/auth/signin");
      setSkeletonLoading(false);
    }

    if (session?.user) {
      setTodosLoading(true);
      try {
        fetchTodos({ setTodos });
        toast.success("Todos loaded");
      } catch (error) {
        toast.error("Failed to load todos");
      } finally {
        setTodosLoading(false);
        setSkeletonLoading(false);
      }
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="py-20 px-5 flex justify-center items-center">
        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-amethyst-100">
          <BadgeX className="w-5 h-5 animate-spin text-amethyst-600" />
        </div>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-stretch h-full px-5 sm:p-5 overflow-x-hidden overflow-y-auto scrollbar">
      <div className="relative w-full max-w-4xl h-full overflow-y-auto overflow-x-hidden pb-36 sm:pb-44">
        <div className="relative flex flex-col justify-start items-center gap-10 w-full sm:px-7 sm:py-2.5 min-h-full">
          {todosLoading && (
            <div className="flex flex-col justify-start items-center w-full gap-5">
              {Array.from(Array(5)).map((_, i) => (
                <Skeleton key={i} className="w-full h-20 rounded-xl" />
              ))}
            </div>
          )}

          <motion.div
            layout="size"
            className="w-full relative h-full origin-top"
          >
            <AnimatePresence mode="sync">
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
        </div>
      </div>
      <div className="fixed bottom-0 inset-x-0 w-full h-48 z-[100] bg-gradient-to-t dark:from-zinc-900 from-white to-transparent"></div>
      <div className="w-full fixed bottom-10 sm:bottom-24 inset-x-0 flex justify-center z-[200] px-5">
        <div className="max-w-xl mx-auto w-full z-[300]">
          {(loading || todosLoading || userLoading) && (
            <div className="relative flex justify-center items-center w-full py-8">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl dark:bg-zinc-700 dark:border-zinc-800 bg-white border border-amethyst-100">
                <BadgeX className="w-5 h-5 animate-spin text-amethyst-600" />
              </div>
            </div>
          )}
          {session?.user && (
            <div className="relative">
              <Input
                placeholder={
                  todos?.length ? "Need more things to do?" : "Plan your day :)"
                }
                className="w-full py-8 px-6 text-base rounded-[99px] bg-amethyst-50 dark:bg-zinc-700 text-amethyst-600 placeholder:text-amethyst-600 dark:text-amethyst-300 shadow-xl shadow-amethyst-300 border border-amethyst-200 dark:shadow-zinc-900 placeholder:select-none pr-[120px]"
                value={todo}
                onChange={handleChange}
                onKeyDown={handleChangeKeyboard}
              />
              <div
                className="absolute inset-y-1.5 transform font-medium bg-amethyst-600 text-xs select-none hover:bg-amethyst-700 text-amethyst-100 px-5 flex justify-center items-center right-1.5 rounded-[99px] cursor-pointer dark:bg-amethyst-700 dark:text-zinc-900 active:scale-95"
                onClick={addTodo}
              >
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  "ADD TODO"
                )}
                {/* <Plus size={20} className="object-cover" /> */}
              </div>
            </div>
          )}
        </div>
      </div>
      {todos && todos.length === 0 && (
        <div className="flex flex-col justify-center items-center w-full gap-3 pt-5 pb-5">
          <h2 className="text-3xl font-bold dark:text-amethyst-600">
            You have no todos
          </h2>
          <p className="text-lg font-medium text-gray-500 dark:text-amethyst-600">
            Add a todo to get started
          </p>
        </div>
      )}
    </main>
  );
};

export default Home;
