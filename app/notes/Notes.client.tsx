"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../lib/api";
import { Note } from "../../types/note";
import css from "./Notes.module.css";

export default function NotesClient() {
  const [search, setSearch] = useState("");

  const { data: notes, isLoading, error } = useQuery<Note[]>({
    queryKey: ["notes", search],
    queryFn: () => fetchNotes(search),
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (error) {
    return <p>Could not fetch notes. {(error as Error).message}</p>;
  }

  return (
    <div className={css.container}>
      <h1 className={css.title}>Notes</h1>

      <input
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={css.searchInput}
      />

      <ul className={css.list}>
        {notes?.map((note) => (
          <li key={note.id} className={css.item}>
            <h3>{note.title}</h3>
            <p>{note.tag}</p>
            <p>{note.content.slice(0, 100)}...</p>
            <a href={`/notes/${note.id}`}>View details</a>
          </li>
        ))}
      </ul>
    </div>
  );
}