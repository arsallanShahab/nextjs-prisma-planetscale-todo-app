interface User {
  id: string;
  name: string;
  email: string;
}

interface Todo {
  id: string;
  title: string;
  user: User;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type { Todo, User };
