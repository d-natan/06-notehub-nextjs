"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { fetchNotes, FetchNotesResponse } from "../../lib/api";

import SearchBox from "../../components/SearchBox/SearchBox";
import NoteList from "../../components/NoteList/NoteList";
import Pagination from "../../components/Pagination/Pagination";
import Modal from "../../components/Modal/Modal";
import NoteForm from "../../components/NoteForm/NoteForm";

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const handleSearch = (value: string) => debouncedSearch(value);
  const handlePageChange = (page: number) => setPage(page);

  const { data, isLoading, isError } = useQuery<
    FetchNotesResponse,
    Error
  >({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes({ page, search }),

    // ключова зміна — правильний seamless pagination
    placeholderData: (previousData) => previousData,

    // можна залишити для кешування, але не для UX пагінації
    staleTime: 1000,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading notes</p>;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
      >
        Create note
      </button>

      <SearchBox onSearch={handleSearch} />

      {data?.notes.length ? (
        <>
          <NoteList notes={data.notes} />

          {data.totalPages > 1 && (
            <Pagination
              totalPages={data.totalPages}
              currentPage={page}
              onPageChange={handlePageChange}
            />
          )}
        </>
      ) : (
        <p>No notes found.</p>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </>
  );
}