
"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, X } from "lucide-react";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  availableCopies: number;
}

interface BooksCatalogProps {
  books: Book[];
}

const categories = [
  "All Categories",
  "Fiction",
  "Novels",
  "Science",
  "History",
  "Kids",
  "Others",
];

export default function BooksCatalog({ books }: BooksCatalogProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");

  const filteredBooks = books.filter((book) => {
    const searchTerm = search.toLowerCase().trim();

    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm);

    const matchesCategory =
      category === "All Categories" || book.category === category;

    return matchesSearch && matchesCategory;
  });

  const clearFilters = () => {
    setSearch("");
    setCategory("All Categories");
  };

  return (
    <div>
      {/* Search and Filter Toolbar */}
      <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-[#E8DED2] bg-white p-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-md">
          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#99918A]"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by book title or author..."
            className="h-12 w-full rounded-xl border border-[#E8DED2] bg-[#FAF7F2] pl-11 pr-4 text-sm text-[#292421] outline-none transition focus:border-[#B85C45] focus:ring-2 focus:ring-[#B85C45]/10"
          />
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
          <div className="relative flex-1 md:w-52">
            <SlidersHorizontal
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#B85C45]"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-12 w-full appearance-none rounded-xl border border-[#E8DED2] bg-[#FAF7F2] pl-10 pr-4 text-sm text-[#292421] outline-none transition focus:border-[#B85C45]"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={clearFilters}
            disabled={!search && category === "All Categories"}
            className="flex h-12 items-center justify-center gap-2 rounded-xl border border-[#E8DED2] px-5 text-sm font-medium text-[#77716B] transition hover:border-[#B85C45] hover:text-[#B85C45] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <X size={16} />
            Clear
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-[#77716B]">
          Showing{" "}
          <span className="font-semibold text-[#292421]">
            {filteredBooks.length}
          </span>{" "}
          of {books.length} books
        </p>
      </div>

      {/* Book Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBooks.map((book) => (
            <article
              key={book._id}
              className="overflow-hidden rounded-2xl border border-[#E8DED2] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="aspect-[5/4] overflow-hidden ">
                <img
                  src={book.image}
                  alt={book.title}
                  className="h-full w-full object-contain object-center py-8 rounded-lg transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="p-6">
                <span className="inline-block rounded-full bg-[#F5E9E4] px-3 py-1 text-xs font-semibold text-[#B85C45]">
                  {book.category}
                </span>

                <h2 className="mt-4 line-clamp-1 font-[family-name:var(--font-lora)] text-xl font-semibold text-[#292421]">
                  {book.title}
                </h2>

                <p className="mt-2 text-sm text-[#77716B]">
                  By {book.author}
                </p>

                <p className="mt-4 text-sm text-[#77716B]">
                  Available copies:{" "}
                  <span className="font-semibold text-[#292421]">
                    {book.availableCopies}
                  </span>
                </p>

                <Link
                  href={`/books/${book._id}`}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-[#B85C45] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#984936]"
                >
                  View Details
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-[#E8DED2] bg-white px-6 py-16 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F5E9E4]">
            <Search size={25} className="text-[#B85C45]" />
          </div>

          <h2 className="mb-2 font-[family-name:var(--font-lora)] text-2xl font-semibold text-[#292421]">
            No Books Found
          </h2>

          <p className="mb-6 text-sm text-[#77716B]">
            Try another title, author, or category.
          </p>

          <button
            onClick={clearFilters}
            className="rounded-lg bg-[#B85C45] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#984936]"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
