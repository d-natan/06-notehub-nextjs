"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { fetchNotes, deleteNote, FetchNotesResponse } from "../../lib/api";

import SearchBox from "../../components/SearchBox/SearchBox";
import NoteList from "../../components/NoteList/NoteList";
import Pagination from "../../components/Pagination/Pagination";
import Modal from "../../components/Modal/Modal";
import NoteForm from "../../components/NoteForm/NoteForm";

export default function NotesClient() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const handleSearch = (value: string) => debouncedSearch(value);
  const handlePageChange = (page: number) => setPage(page);

  const { data, isLoading, isError } = useQuery<FetchNotesResponse, Error>({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes({ page, search }),
  });

  // Використовуємо useMutation для видалення нотатки
  const deleteMutation = useMutation({
  mutationFn: (id: string) => deleteNote(id),
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
  });

  const handleDelete = (id: string) => {
  deleteMutation.mutate(id);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading notes</p>;

  return (
    <>
      <button type="button" onClick={() => setIsModalOpen(true)}>
        Create note
      </button>

      <SearchBox onSearch={handleSearch} />

      {data && (
        <>
          <NoteList notes={data.notes} handleDelete={handleDelete} />

          <Pagination
            totalPages={data.totalPages}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </>
  );
}