import api from "./api";

export type TaskItem = {
  id: number;
  title: string;
  isDone: boolean;
  projectId: number;
};
export type CreateTaskDto = { title: string; projectId: number };

export async function getTasks() {
  const { data } = await api.get<TaskItem[]>("/api/tasks");
  return data;
}
export async function createTask(dto: CreateTaskDto) {
  const { data } = await api.post<TaskItem>("/api/tasks", dto);
  return data;
}
export async function toggleDone(id: number, isDone: boolean) {
  const { data } = await api.put<TaskItem>(`/api/tasks/${id}`, { isDone });
  return data;
}
export async function deleteTask(id: number) {
  await api.delete(`/api/tasks/${id}`);
}
