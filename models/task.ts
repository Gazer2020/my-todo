export type TaskStatus = "TODO" | "DONE";

export interface Task {
  id: string;             // UUID or Firestore Document ID
  title: string;          // Task name
  status: TaskStatus;     // Current execution status
  priority: number;       // 1: High, 2: Medium, 3: Low
  due_date: number;       // Unix timestamp for priority sorting
  created_at: number;     // Creation timestamp
  tags: string[];         // Reserved field for tags
}
