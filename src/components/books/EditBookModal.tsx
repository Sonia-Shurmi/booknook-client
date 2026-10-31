
"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  totalCopies: number;
}

interface EditBookModalProps {
  book: Book;
  onClose: () => void;
  onSuccess: () => void;
}

const categories = [
  "Fiction",
  "Novels",
  "Science",
  "History",
  "Kids",
  "Others",
];

export default function EditBookModal({
  book,
  onClose,
  onSuccess,
}: EditBookModalProps) {
  const [formData, setFormData] = useState({
    title: book.title,
    author: book.author,
    category: book.category,
    image: book.image,
    description: book.description,
    totalCopies: String(book.totalCopies),
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const copies = Number(formData.totalCopies);

    if (!Number.isInteger(copies) || copies < 1) {
      toast.error("Total copies must be at least 1.");
      return;
    }

    try {
      setSubmitting(true);

      await apiRequest(`/books/${book._id}`, {
        method: "PATCH",
        body: JSON.stringify({
          ...formData,
          totalCopies: copies,
        }),
      });

      toast.success("Book updated successfully!");
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to update this book."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "h-11 w-full rounded-xl border border-[#E8DED2] bg-[#FAF7F2] px-4 text-sm text-[#292421] outline-none transition focus:border-[#B85C45] focus:ring-2 focus:ring-[#B85C45]/10";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
        <div className="mb-7 flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B85C45]">
              Manage Your Collection
            </p>

            <h2 className="mt-2 font-[family-name:var(--font-lora)] text-2xl font-bold text-[#292421]">
              Edit Book Details
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            aria-label="Close modal"
            className="rounded-full p-2 text-[#77716B] transition hover:bg-[#F5E9E4] hover:text-[#B85C45] disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#292421]">
                Book Title
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#292421]">
                Author
              </label>
              <input
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#292421]">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={inputClass}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#292421]">
                Total Copies
              </label>
              <input
                type="number"
                name="totalCopies"
                min="1"
                step="1"
                value={formData.totalCopies}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#292421]">
              Book Cover Image URL
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#292421]">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
              className="w-full rounded-xl border border-[#E8DED2] bg-[#FAF7F2] px-4 py-3 text-sm leading-7 text-[#292421] outline-none transition focus:border-[#B85C45] focus:ring-2 focus:ring-[#B85C45]/10"
            />
          </div>

          <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="h-12 flex-1 rounded-xl border border-[#E8DED2] text-sm font-semibold text-[#77716B] transition hover:bg-[#FAF7F2] disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="h-12 flex-1 rounded-xl bg-[#B85C45] text-sm font-semibold text-white transition hover:bg-[#984936] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
