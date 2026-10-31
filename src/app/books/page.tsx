
import type { Metadata } from "next";
import BooksCatalog from "@/components/books/BooksCatalog";

export const metadata: Metadata = {
  title: "All Books",
  description:
    "Explore the BookNook collection and discover your next favorite book.",
};

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  availableCopies: number;
}

async function getBooks(): Promise<Book[]> {
  try {
    const response = await fetch(
      `${process.env.API_URL}/books`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }

    return await response.json();
  } catch (error) {
    console.error("All Books error:", error);
    return [];
  }
}

export default async function BooksPage() {
  const books = await getBooks();

  return (
    <section className="min-h-[70vh] bg-[#FAF7F2] px-5 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#B85C45]">
            The BookNook Collection
          </p>

          <h1 className="mb-4 text-4xl font-bold text-[#292421] md:text-5xl">
            Explore All Books
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-7 text-[#77716B]">
            From timeless classics to exciting new discoveries,
            find the stories waiting for you.
          </p>
        </div>

        <BooksCatalog books={books} />
      </div>
    </section>
  );
}
