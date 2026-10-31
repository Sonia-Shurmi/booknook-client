
"use client";

import { BookOpen, X, Trash2 } from "lucide-react";

interface DeleteBookModalProps {
  bookTitle: string;
  onConfirm: () => void;
  onClose: () => void;
  loading: boolean;
}

export default function DeleteBookModal({
  bookTitle,
  onConfirm,
  onClose,
  loading,
}: DeleteBookModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B85C45]">
              Manage Your Collection
            </p>

            <h2 className="mt-2 font-[family-name:var(--font-lora)] text-2xl font-bold text-[#292421]">
              Delete This Book?
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
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

          <div className="min-w-0">
            <p className="text-xs text-[#77716B]">Selected Book</p>
            <p className="truncate font-semibold text-[#292421]">
              {bookTitle}
            </p>
          </div>
        </div>

        <div className="mb-6 rounded-xl bg-[#FFF1ED] p-4">
          <div className="flex items-start gap-3">
            <Trash2 size={19} className="mt-0.5 shrink-0 text-[#B85C45]" />

            <p className="text-sm leading-6 text-[#984936]">
              This action cannot be undone. The book will be permanently
              removed from the library. Books with active borrows cannot be
              deleted.
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="h-12 flex-1 rounded-xl border border-[#E8DED2] text-sm font-semibold text-[#77716B] transition hover:bg-[#FAF7F2] disabled:opacity-50"
          >
            Keep Book
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="h-12 flex-1 rounded-xl bg-[#B85C45] text-sm font-semibold text-white transition hover:bg-[#984936] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Yes, Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
