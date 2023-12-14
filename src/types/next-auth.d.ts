import { Todo } from "@/lib/types";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultSession["user"] {
    id: string;
    todos: Todo[];
  }

  interface Session {
    user: {
      id: string;
      todos: Todo[];
    } & DefaultSession["user"];
  }
}

// declare module "next-auth/jwt" {
//   /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
//   interface JWT extends DefaultSession["user"] {
//     id: string;
//     todos: Todo[];
//   }
// }
