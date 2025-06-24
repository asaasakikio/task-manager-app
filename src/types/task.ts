export type Priority = 'high' | 'medium' | 'low';

export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  created_at: string;
}