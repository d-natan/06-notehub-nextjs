import Link from "next/link";
import { Note } from "../../lib/api";

export interface NoteListProps {
  notes: Note[];
  handleDelete: (id: string) => void;
}

export default function NoteList({ notes, handleDelete }: NoteListProps) {
  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id} className="note-item">
          <Link href={`/notes/${note.id}`}>
            <h2>{note.title}</h2>
          </Link>

          <p>{note.content}</p>

          <span>{note.tag}</span>

          <p>
            Created:{" "}
            {new Date(note.createdAt).toLocaleString()}
          </p>

          <button
            type="button"
            onClick={() => handleDelete(note.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}