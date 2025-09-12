import api from "./api";

export type Project = { id: number; name: string };

export async function getProjects() {
  const { data } = await api.get<Project[]>("/api/projects");
  return data;
}
