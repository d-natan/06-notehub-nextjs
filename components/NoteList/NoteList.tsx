"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { deleteNote, Note } from "../../lib/api";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      // Використовуємо об'єкт із queryKey замість масиву
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id} className="border p-2 mb-2">
          <Link href={`/notes/${note.id}`}>
            <h2 className="font-bold">{note.title}</h2>
          </Link>
          <p>{note.content}</p>
          <p className="italic">{note.tag}</p>
          <button
            className="text-red-500 mt-2"
            onClick={() => deleteMutation.mutate(note.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}