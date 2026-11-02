
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { apiRequest } from "@/lib/api";
import ReturnConfirmModal from "@/components/books/ReturnConfirmModal";

interface Borrow {
  _id: string;
  bookId: string;
  bookTitle: string;
  bookImage: string;
  borrowDate: string;
  returnDate: string;
  status: string;
}

export default function MyBorrowsClient() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBorrow, setSelectedBorrow] = useState<Borrow | null>(null);
  const [returning, setReturning] = useState(false);

  useEffect(() => {
  if (isPending || !user) {
    return;
  }

  const fetchBorrows = async () => {
    try {
      const data = await apiRequest("/borrows");
      setBorrows(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load your borrowed books."
      );
    } finally {
      setLoading(false);
    }
  };

  fetchBorrows();
}, [isPending, user]);

useEffect(() => {
  if (!isPending && !user) {
    router.replace("/login?callbackUrl=%2Fmy-borrows");
  }
}, [isPending, user, router]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleReturn = async () => {
    if (!selectedBorrow) return;

    try {
      setReturning(true);

      await apiRequest(`/borrows/${selectedBorrow._id}`, {
        method: "DELETE",
      });

      setBorrows((previousBorrows) =>
        previousBorrows.filter(
          (borrow) => borrow._id !== selectedBorrow._id
        )
      );

      setSelectedBorrow(null);
      toast.success("Book returned successfully!");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Unable to return this book."
      );
    } finally {
      setReturning(false);
    }
  };

  return (
    <>
      <section className="min-h-screen bg-[#FAF7F2] px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#B85C45]">
              Your Reading Shelf
            </p>

            <h1 className="font-[family-name:var(--font-lora)] text-4xl font-bold text-[#292421] md:text-5xl">
              My Borrowed Books
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-[#77716B]">
              Keep track of your borrowed books, return dates, and reading journey.
            </p>
          </div>

          {loading ? (
            <div className="py-20 text-center text-[#77716B]">
              Loading your borrowed books...
            </div>
          ) : error ? (
            <div className="rounded-xl bg-white p-8 text-center text-[#B85C45]">
              {error}
            </div>
          ) : borrows.length === 0 ? (
            <div className="rounded-2xl border border-[#E8DED2] bg-white px-6 py-16 text-center shadow-sm">
              <h2 className="font-[family-name:var(--font-lora)] text-2xl font-semibold text-[#292421]">
                Your Reading Shelf Is Empty
              </h2>

              <p className="mt-3 text-[#77716B]">
                You haven't borrowed any books yet.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-[#E8DED2] bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[750px] text-left">
                  <thead className="bg-[#F0EAE1]">
                    <tr className="text-sm text-[#292421]">
                      <th className="px-6 py-5 font-semibold">Book</th>
                      <th className="px-6 py-5 font-semibold">Borrow Date</th>
                      <th className="px-6 py-5 font-semibold">Return Date</th>
                      <th className="px-6 py-5 font-semibold">Status</th>
                      <th className="px-6 py-5 font-semibold">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#E8DED2]">
                    {borrows.map((borrow) => (
                      <tr key={borrow._id} className="text-sm">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <img
                              src={borrow.bookImage}
                              alt={borrow.bookTitle}
                              className="h-16 w-12 rounded-lg object-cover"
                            />
                            <span className="font-semibold text-[#292421]">
                              {borrow.bookTitle}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-5 text-[#77716B]">
                          {formatDate(borrow.borrowDate)}
                        </td>

                        <td className="px-6 py-5 text-[#77716B]">
                          {formatDate(borrow.returnDate)}
                        </td>

                        <td className="px-6 py-5">
                          <span className="rounded-full bg-[#E8F0E5] px-3 py-1.5 text-xs font-semibold text-[#58724F]">
                            Active
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <button
                            onClick={() => setSelectedBorrow(borrow)}
                            className="rounded-lg bg-[#B85C45] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#984936]"
                          >
                            Return Book
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>

      {selectedBorrow && (
        <ReturnConfirmModal
          bookTitle={selectedBorrow.bookTitle}
          onConfirm={handleReturn}
          onClose={() => setSelectedBorrow(null)}
          loading={returning}
        />
      )}
    </>
  );
}
