
"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { apiRequest } from "@/lib/api";
import EditBookModal from "@/components/books/EditBookModal";
import DeleteBookModal from "@/components/books/DeleteBookModal";
import { useRouter } from "next/dist/client/components/navigation";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  addedByName: string;
  addedByEmail: string;
  totalCopies: number;
  availableCopies: number;
}

export default function MyBooksClient() {
  const { data: session, isPending } = authClient.useSession();

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [deletingBook, setDeletingBook] = useState<Book | null>(null);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const userEmail = session?.user?.email?.toLowerCase();
  useEffect(() => {
  if (!isPending && !userEmail) {
    router.replace("/login?callbackUrl=%2Fmy-books");
  }
  }, [isPending, userEmail, router]);

  useEffect(() => {
  if (isPending || !userEmail) return;

  const fetchBooks = async () => {
      try {
        setError("");

        const data = await apiRequest("/books");

        const myBooks = data.filter(
          (book: Book) =>
            book.addedByEmail?.toLowerCase() === userEmail
        );

        setBooks(myBooks);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load your books."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [isPending, userEmail]);

  const refreshBooks = async () => {
    try {
      const data = await apiRequest("/books");

      const myBooks = data.filter(
        (book: Book) =>
          book.addedByEmail?.toLowerCase() === userEmail
      );

      setBooks(myBooks);
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Unable to refresh your books."
      );
    }
  };

  const handleDelete = async () => {
    if (!deletingBook) return;

    try {
      setDeleting(true);

      await apiRequest(`/books/${deletingBook._id}`, {
        method: "DELETE",
      });

      setBooks((previousBooks) =>
        previousBooks.filter(
          (book) => book._id !== deletingBook._id
        )
      );

      setDeletingBook(null);
      toast.success("Book deleted successfully!");
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Unable to delete this book."
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <section className="min-h-screen bg-[#FAF7F2] px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#B85C45]">
              Your Collection
            </p>

            <h1 className="font-[family-name:var(--font-lora)] text-4xl font-bold text-[#292421] md:text-5xl">
              My Books
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-[#77716B]">
              Manage the books you have added to the BookNook library.
            </p>
          </div>

          {isPending || loading ? (
            <div className="py-20 text-center text-[#77716B]">
              Loading your books...
            </div>
          ) : error ? (
            <div className="rounded-xl bg-white p-8 text-center text-[#B85C45]">
              {error}
            </div>
          ) : books.length === 0 ? (
            <div className="rounded-2xl border border-[#E8DED2] bg-white px-6 py-16 text-center shadow-sm">
              <h2 className="font-[family-name:var(--font-lora)] text-2xl font-semibold text-[#292421]">
                Your Collection Is Empty
              </h2>

              <p className="mt-3 text-[#77716B]">
                You haven't added any books yet.
              </p>
            </div>
          ) : (
            <>
              <p className="mb-6 text-sm text-[#77716B]">
                You have added{" "}
                <span className="font-semibold text-[#292421]">
                  {books.length} {books.length === 1 ? "book" : "books"}
                </span>{" "}
                to BookNook.
              </p>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {books.map((book) => (
                  <div
                    key={book._id}
                    className="overflow-hidden rounded-2xl border border-[#E8DED2] bg-white shadow-sm"
                  >
                    <img
                      src={book.image}
                      alt={book.title}
                      className="h-64 w-full object-cover"
                    />

                    <div className="p-6">
                      <span className="rounded-full bg-[#F5E9E4] px-3 py-1.5 text-xs font-semibold text-[#B85C45]">
                        {book.category}
                      </span>

                      <h2 className="mt-4 font-[family-name:var(--font-lora)] text-xl font-bold text-[#292421]">
                        {book.title}
                      </h2>

                      <p className="mt-2 text-sm text-[#77716B]">
                        By {book.author}
                      </p>

                      <div className="mt-5 flex justify-between border-t border-[#E8DED2] pt-4 text-sm">
                        <span className="text-[#77716B]">
                          Total: {book.totalCopies}
                        </span>

                        <span className="font-semibold text-[#87917B]">
                          Available: {book.availableCopies}
                        </span>
                      </div>

                      <div className="mt-5 grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setSelectedBook(book)}
                          className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[#E8DED2] text-sm font-semibold text-[#292421] transition hover:border-[#B85C45] hover:bg-[#FAF7F2] hover:text-[#B85C45]"
                        >
                          <Pencil size={16} />
                          Edit
                        </button>

                        <button
                          onClick={() => setDeletingBook(book)}
                          className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[#F0D8D0] text-sm font-semibold text-[#B85C45] transition hover:bg-[#FFF1ED]"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {selectedBook && (
        <EditBookModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onSuccess={refreshBooks}
        />
      )}

      {deletingBook && (
        <DeleteBookModal
          bookTitle={deletingBook.title}
          onConfirm={handleDelete}
          onClose={() => setDeletingBook(null)}
          loading={deleting}
        />
      )}
    </>
  );
}
