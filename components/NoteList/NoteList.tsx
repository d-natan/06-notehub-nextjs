import Link from "next/link";
import type { Note } from "../../types/note";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];                // передаємо масив нотаток
  handleDelete: (id: string) => void; // функція видалення нотатки
}

export default function NoteList({ notes, handleDelete }: NoteListProps) {
  if (!notes || notes.length === 0) {
    return <p>No notes available.</p>;
  }

  return (
    <ul className={css.list}>
      {notes.map(note => (
        <li key={note.id} className={css.item}>
          <Link href={`/notes/${note.id}`}>
            <h3>{note.title}</h3>
          </Link>

          <p>{note.content}</p>
          <p>{note.tag}</p>

          <button onClick={() => handleDelete(note.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}