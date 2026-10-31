
import type { Metadata } from "next";
import Link from "next/link";

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

        {books.length === 0 ? (
          <div className="rounded-2xl border border-[#E8DED2] bg-white px-6 py-16 text-center">
            <h2 className="mb-2 font-[family-name:var(--font-lora)] text-2xl font-semibold text-[#292421]">
              No Books Found
            </h2>
            <p className="text-[#77716B]">
              There are no books available in the collection yet.
            </p>
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm text-[#77716B]">
              Showing {books.length} books
            </p>

            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {books.map((book) => (
                <article
                  key={book._id}
                  className="overflow-hidden rounded-2xl border border-[#E8DED2] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="aspect-[5/4] overflow-hidden bg-[#F0EAE1]">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
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
          </>
        )}
      </div>
    </section>
  );
}
