import axios from "axios";
import { Note } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api";

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

axios.defaults.headers.common.Authorization =
  `Bearer ${token}`;

export async function fetchNotes(
  search = ""
): Promise<Note[]> {
  const res = await axios.get(
    `${BASE_URL}/notes`,
    {
      params: {
        search,
      },
    }
  );

  return res.data;
}

export async function fetchNoteById(
  id: string
): Promise<Note> {
  const res = await axios.get(
    `${BASE_URL}/notes/${id}`
  );

  return res.data;
}

export async function createNote(note: Omit<Note, "id" | "createdAt" | "updatedAt">) {
  const response = await axios.post(`${BASE_URL}/notes`, note, {
    headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}` },
  });
  return response.data;
}