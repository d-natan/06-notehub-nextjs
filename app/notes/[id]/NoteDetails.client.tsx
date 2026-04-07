"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { fetchNoteById } from "../../../lib/api";

export default function NoteDetailsClient() {
  const params = useParams<{ id: string }>();

  const id = params.id;

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading note</p>;
  }

  if (!data) {
    return <p>No data</p>;
  }

  return (
    <div>
      <h2>{data.title}</h2>

      <p>{data.content}</p>

      <p>{data.tag}</p>
    </div>
  );
}