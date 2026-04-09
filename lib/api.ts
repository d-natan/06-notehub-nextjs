import axios from "axios";
import { Note } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api";

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page: number;
  search: string;
}

export async function fetchNotes(
  params: FetchNotesParams
): Promise<FetchNotesResponse> {
  const response = await axios.get<FetchNotesResponse>(
    `${BASE_URL}/notes`,
    {
      params,
    }
  );

  return response.data;
}

export async function fetchNoteById(
  id: string
): Promise<Note> {
  const response = await axios.get<Note>(
    `${BASE_URL}/notes/${id}`
  );

  return response.data;
}

export type CreateNoteData = {
  title: string;
  content: string;
  tag: string;
};

export async function createNote(
  note: CreateNoteData
): Promise<Note> {
  const response = await axios.post<Note>(
    `${BASE_URL}/notes`,
    note
  );

  return response.data;
}

export async function deleteNote(
  id: string
): Promise<Note> {
  const response = await axios.delete<Note>(
    `${BASE_URL}/notes/${id}`
  );

  return response.data;
}

export type { Note };
