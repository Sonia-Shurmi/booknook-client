
"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  addedByName: string;
  addedByEmail: string;
  addedAt: string;
  totalCopies: number;
  availableCopies: number;
}

export default function BookDetailsClient({ id }: { id: string }) {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await apiRequest(`/books/${id}`);
        setBook(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unable to load this book."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-[#77716B]">Loading book details...</p>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-5">
        <p className="text-center text-[#B85C45]">
          {error || "Book not found."}
        </p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#FAF7F2] px-5 py-16 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-2 md:items-start">
          <div className="overflow-hidden rounded-2xl border border-[#E8DED2] bg-white p-4 shadow-sm">
            <img
              src={book.image}
              alt={book.title}
              className="h-[420px] w-full rounded-xl object-cover md:h-[560px]"
            />
          </div>

          <div className="py-3">
            <span className="inline-block rounded-full bg-[#F5E9E4] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#B85C45]">
              {book.category}
            </span>

            <h1 className="mt-6 font-[family-name:var(--font-lora)] text-4xl font-bold leading-tight text-[#292421] md:text-5xl">
              {book.title}
            </h1>

            <p className="mt-4 text-lg text-[#77716B]">
              Written by{" "}
              <span className="font-semibold text-[#292421]">
                {book.author}
              </span>
            </p>

            <div className="my-8 h-px bg-[#E8DED2]" />

            <h2 className="mb-3 font-[family-name:var(--font-lora)] text-2xl font-semibold text-[#292421]">
              About This Book
            </h2>

            <p className="text-base leading-8 text-[#77716B]">
              {book.description}
            </p>

            <div className="my-8 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-white p-5">
                <p className="text-sm text-[#77716B]">Total Copies</p>
                <p className="mt-2 text-2xl font-bold text-[#292421]">
                  {book.totalCopies}
                </p>
              </div>

              <div className="rounded-xl bg-white p-5">
                <p className="text-sm text-[#77716B]">Available Copies</p>
                <p className="mt-2 text-2xl font-bold text-[#87917B]">
                  {book.availableCopies}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-[#E8DED2] bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#99918A]">
                Added to BookNook by
              </p>
              <p className="mt-2 font-semibold text-[#292421]">
                {book.addedByName}
              </p>
              <p className="mt-1 text-sm text-[#77716B]">
                {book.addedByEmail}
              </p>
            </div>

            <button
              disabled
              className="mt-8 w-full cursor-not-allowed rounded-xl bg-[#B85C45] px-6 py-4 text-base font-semibold text-white opacity-70"
            >
              Borrow Feature Coming Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
