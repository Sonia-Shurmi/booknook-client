
"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { apiRequest } from "@/lib/api";

const categories = [
  "Fiction",
  "Novels",
  "Science",
  "History",
  "Kids",
  "Others",
];

export default function AddBookForm() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "Fiction",
    image: "",
    description: "",
    totalCopies: "1",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [submitting, setSubmitting] = useState(false);

  const user = session?.user;
  useEffect(() => {
  if (!isPending && !user) {
    router.replace("/login?callbackUrl=%2Fadd-book");
  }
}, [isPending, user, router]);

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

  
const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch("/api/upload-image", {
    method: "POST",
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Image upload failed.");
  }

  return result.imageUrl as string;
};


 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!user) {
    toast.error("Please log in to add a book.");
    router.push("/login");
    return;
  }

  if (!imageFile) {
    toast.error("Please select a book cover image.");
    return;
  }

  if (Number(formData.totalCopies) < 1) {
    toast.error("Please enter at least one copy.");
    return;
  }

  try {
    setSubmitting(true);

    // Upload the selected image to ImgBB
    const imageUrl = await uploadImage(imageFile);

    // Save book information with the uploaded image URL
    await apiRequest("/books", {
      method: "POST",
      body: JSON.stringify({
        ...formData,
        image: imageUrl,
        totalCopies: Number(formData.totalCopies),
      }),
    });

    toast.success("Your book has been added successfully!");
    router.push("/my-books");
    router.refresh();
  } catch (error) {
    toast.error(
      error instanceof Error
        ? error.message
        : "Unable to add this book."
    );
  } finally {
    setSubmitting(false);
  }
};

  const inputClass =
    "h-12 w-full rounded-xl border border-[#E8DED2] bg-[#FAF7F2] px-4 text-sm text-[#292421] outline-none transition focus:border-[#B85C45] focus:ring-2 focus:ring-[#B85C45]/10";

  return (
    <section className="min-h-screen bg-[#FAF7F2] px-5 py-16 md:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#B85C45]">
            Grow the Collection
          </p>

          <h1 className="font-[family-name:var(--font-lora)] text-4xl font-bold text-[#292421] md:text-5xl">
            Add a New Book
          </h1>

          <p className="mt-4 leading-7 text-[#77716B]">
            Share a new story with the BookNook reading community.
          </p>
        </div>

        {isPending ? (
          <div className="rounded-2xl bg-white p-10 text-center text-[#77716B]">
            Loading your account...
          </div>
          ) : !user ? (
            <div className="rounded-2xl bg-white p-10 text-center">
              <p className="text-[#77716B]">
                Redirecting to login...
              </p>
            </div>
          ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-7 rounded-2xl border border-[#E8DED2] bg-white p-6 shadow-sm sm:p-9"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#292421]">
                  Book Title
                </label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter book title"
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
                  placeholder="Enter author's name"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
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
                  value={formData.totalCopies}
                  onChange={handleChange}
                  min="1"
                  step="1"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <div>
            <label className="mb-2 block text-sm font-semibold text-[#292421]">
              Book Cover Image
            </label>

            <input
              type="file"
              name="image"
              accept="image/*"
              required
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (file) {
                  const allowedTypes = [
                    "image/jpeg",
                    "image/png",
                    "image/webp",
                  ];

                  if (!allowedTypes.includes(file.type)) {
                    toast.error("Only JPG, PNG, and WEBP images are allowed.");
                    e.target.value = "";
                    setImageFile(null);
                    return;
                  }

                  if (file.size > 5 * 1024 * 1024) {
                    toast.error("Image size must not exceed 5 MB.");
                    e.target.value = "";
                    setImageFile(null);
                    return;
                  }

                  setImageFile(file);
                }

              }}
              className={inputClass}
            />

            <p className="mt-2 text-xs text-[#99918A]">
              Choose a book cover image from your computer. It will be uploaded to ImgBB.
            </p>

            {imageFile && (
              <div className="mt-4">
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Book cover preview"
                  className="h-48 w-32 rounded-lg border border-[#E8E0D8] object-cover"
                />
              </div>
            )}
          </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#292421]">
                Book Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write a short description about this book..."
                rows={5}
                required
                className="w-full rounded-xl border border-[#E8DED2] bg-[#FAF7F2] px-4 py-3 text-sm leading-7 text-[#292421] outline-none transition focus:border-[#B85C45] focus:ring-2 focus:ring-[#B85C45]/10"
              />
            </div>

            <div className="rounded-xl border border-[#E8DED2] bg-[#FAF7F2] p-5">
              <p className="mb-4 text-sm font-semibold text-[#292421]">
                Added By
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs text-[#77716B]">
                    Your Name
                  </label>
                  <input
                    value={user.name || ""}
                    readOnly
                    className={`${inputClass} cursor-not-allowed bg-[#F0EAE1]`}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs text-[#77716B]">
                    Your Email
                  </label>
                  <input
                    value={user.email || ""}
                    readOnly
                    className={`${inputClass} cursor-not-allowed bg-[#F0EAE1]`}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="h-14 w-full rounded-xl bg-[#B85C45] px-6 text-base font-semibold text-white transition hover:bg-[#984936] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Adding Book..." : "Add Book to Library"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
