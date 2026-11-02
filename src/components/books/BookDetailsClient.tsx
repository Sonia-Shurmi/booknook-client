
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { apiRequest } from "@/lib/api";
import BorrowModal from "@/components/books/BorrowModal";

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
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showBorrowModal, setShowBorrowModal] = useState(false);

 useEffect(() => {
  if (!isPending && !user) {
    router.replace(
      `/login?callbackUrl=${encodeURIComponent(`/books/${id}`)}`
    );
  }
}, [isPending, user, router, id]);

useEffect(() => {
  if (isPending || !user) return;

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
}, [id, isPending, user]);

  if (isPending || !user || loading) {
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
    <>
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
                onClick={() => setShowBorrowModal(true)}
                disabled={book.availableCopies <= 0}
                className="mt-8 w-full rounded-xl bg-[#B85C45] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#984936] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {book.availableCopies > 0 ? "Borrow This Book" : "Currently Unavailable"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {showBorrowModal && (
  <BorrowModal
    bookId={book._id}
    bookTitle={book.title}
    onClose={() => setShowBorrowModal(false)}
    onSuccess={async () => {
      try {
        const updatedBook = await apiRequest(`/books/${id}`);
        setBook(updatedBook);
      } catch (error) {
        console.error("Failed to refresh book details:", error);
      }
    }}
  />
)}
    </>
  );
}
