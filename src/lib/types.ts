interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
  todos?: Todo[];
}

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user?: User;
}

export type { Todo, User };
