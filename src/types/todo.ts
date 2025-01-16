export interface Todo {
  id: number;
  title: string;
  status: "pending" | "completed";
  createdDate: Date | string;
}
