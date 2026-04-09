"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById, Note } from "../../../lib/api";

export default function NoteDetailsClient() {
  const { id } = useParams() as { id: string };

  const { data: note, isLoading, isError } = useQuery<Note, Error>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading note...</p>;
  if (isError) return <p>Error loading note.</p>;
  if (!note) return <p>Note not found.</p>;

  return (
    <div className="note-details">
      <h1>{note.title}</h1>
      <p>{note.content}</p>
      <span>{note.tag}</span>
      <p>Created: {new Date(note.createdAt).toLocaleString()}</p>
    </div>
  );
}