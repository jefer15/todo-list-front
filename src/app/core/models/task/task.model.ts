import { User } from "../auth/auth.model";

export interface Task {
  id?: number;
  title: string;
  description?: string;
  completed: boolean;
  user?: User;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TaskSummary {
  total: number;
  completed: number;
  pending: number;
}
