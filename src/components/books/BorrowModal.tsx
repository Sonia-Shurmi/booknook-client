
"use client";

import { useState } from "react";
import { X, BookOpen, CalendarDays } from "lucide-react";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";

interface BorrowModalProps {
  bookId: string;
  bookTitle: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function BorrowModal({
  bookId,
  bookTitle,
  onClose,
  onSuccess,
}: BorrowModalProps) {
  const [returnDate, setReturnDate] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const handleBorrow = async () => {
    if (!returnDate) {
      toast.error("Please select a return date.");
      return;
    }

    try {
      setSubmitting(true);

      await apiRequest("/borrows", {
        method: "POST",
        body: JSON.stringify({
          bookId,
          returnDate,
        }),
      });

      toast.success("Book borrowed successfully!");
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to borrow this book."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B85C45]">
              BookNook Library
            </p>

            <h2 className="mt-2 font-[family-name:var(--font-lora)] text-2xl font-bold text-[#292421]">
              Borrow This Book
            </h2>
          </div>

          <button
            onClick={onClose}
            disabled={submitting}
            aria-label="Close modal"
            className="rounded-full p-2 text-[#77716B] transition hover:bg-[#F5E9E4] hover:text-[#B85C45] disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-6 flex items-center gap-3 rounded-xl bg-[#FAF7F2] p-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#F5E9E4] text-[#B85C45]">
            <BookOpen size={21} />
          </div>

          <div>
            <p className="text-xs text-[#77716B]">Selected Book</p>
            <p className="font-semibold text-[#292421]">
              {bookTitle}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-semibold text-[#292421]">
            Return Date
          </label>

          <div className="relative">
            <CalendarDays
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B85C45]"
            />

            <input
              type="date"
              value={returnDate}
              min={today}
              disabled={submitting}
              onChange={(e) => setReturnDate(e.target.value)}
              className="h-12 w-full rounded-xl border border-[#E8DED2] bg-[#FAF7F2] pl-11 pr-4 text-sm text-[#292421] outline-none transition focus:border-[#B85C45] focus:ring-2 focus:ring-[#B85C45]/10"
            />
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          <button
            onClick={onClose}
            disabled={submitting}
            className="h-12 flex-1 rounded-xl border border-[#E8DED2] text-sm font-semibold text-[#77716B] transition hover:bg-[#FAF7F2] disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={handleBorrow}
            disabled={!returnDate || submitting}
            className="h-12 flex-1 rounded-xl bg-[#B85C45] text-sm font-semibold text-white transition hover:bg-[#984936] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Processing..." : "Confirm Borrow"}
          </button>
        </div>
      </div>
    </div>
  );
}
