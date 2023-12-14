import type { Todo } from "@/lib/types";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { BadgeX, Loader2 } from "lucide-react";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import toast from "react-hot-toast";
import { Checkbox } from "./ui/checkbox";
interface Props {
  todo: Todo;
  i: number;
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

const VARIANTS = {
  initial: {
    opacity: 0,
    scale: 0,
    y: -100,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    y: 100,
    opacity: 0,
    scale: 0.6,
  },
};

const ReorderItem: FC<Props> = ({ todo, i, todos, setTodos }) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(todo?.completed);
  const updateTodo = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
      try {
        setIsUpdating(true);
        const id = e.currentTarget.id;
        const res = await fetch("/api/todos/update/" + id, {
          method: "POST",
          body: JSON.stringify({
            completed: !isCompleted,
          }),
        });
        const data = await res.json();
        setIsCompleted(!isCompleted);
        //arrange the todos array in manner that the completed todo is at the bottom of the list and if the todo is not completed then it is at the top of the list
        setTodos((prev) => {
          const filteredTodos = prev.filter((todo) => todo.id !== id);
          if (data.completed) {
            return [...filteredTodos, data];
          } else {
            return [data, ...filteredTodos];
          }
        });
      } catch (error) {
        toast.error("Failed to update todo");
      } finally {
        setIsUpdating(false);
      }
    },
    [setTodos, isCompleted]
  );

  const handleDeleteTodo = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
      try {
        setIsDeleting(true);
        const id = e.currentTarget.id;
        const res = await fetch("/api/todos/delete/" + id, {
          method: "DELETE",
        });
        const data = await res.json();
        console.log(data);
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
      } catch (error) {
        toast.error("Failed to delete todo");
      } finally {
        setIsDeleting(false);
      }
    },
    []
  );

  return (
    <motion.li
      layout="position"
      value={todo?.id}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={VARIANTS}
      transition={{
        duration: 0.3,
        delay: i * 0.05,
        // ease: [0.87, 0, 0.13, 1],
      }}
      key={todo?.id}
      className={cn(
        "relative flex justify-between items-center p-5 my-4 rounded-xl bg-amethyst-100 dark:bg-zinc-800 w-full"
      )}
    >
      <div className="flex items-center gap-5 justify-start pr-2.5">
        <div>
          {isUpdating ? (
            <Loader2 className="w-5 h-5 text-amethyst-600 dark:text-amethyst-400 animate-spin" />
          ) : (
            <Checkbox
              checked={isCompleted}
              id={todo?.id}
              className="w-5 h-5 bg-amethyst-300 rounded-md border-none data-[state=checked]:text-amethyst-100 dark:data-[state=checked]:text-amethyst-300 data-[state=checked]:bg-amethyst-600 dark:bg-zinc-700 dark:data-[state=checked]:bg-amethyst-700 active:scale-95"
              onClick={updateTodo}
            />
          )}
        </div>
        <div className="flex flex-col items-start flex-wrap flex-1">
          <p className="text-amethyst-600 dark:text-amethyst-400 break-words break-all">
            {todo?.title}
          </p>
          <span className="select-none text-amethyst-600 text-xs font-normal dark:text-amethyst-400">
            last updated: {dayjs(todo?.updatedAt).format("DD MMM YYYY hh:mm A")}
          </span>
        </div>
      </div>
      <div className="flex items-center">
        <button
          id={todo?.id}
          onClick={handleDeleteTodo}
          className={cn(
            "w-10 h-10 flex items-center justify-center rounded-xl dark:bg-zinc-700 dark:border-zinc-800 bg-white border border-amethyst-100 active:scale-95 duration-100"
          )}
        >
          <BadgeX
            className={cn(
              "w-5 h-5 text-amethyst-600 dark:text-amethyst-400",
              isDeleting && "animate-spin"
            )}
          />
        </button>
      </div>
    </motion.li>
  );
};

export default ReorderItem;
