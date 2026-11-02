
import Link from "next/link";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  availableCopies: number;
}

const NewArrivals = async () => {
  let books: Book[] = [];

  try {
    const response = await fetch(
      `${process.env.API_URL}/books?limit=6`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }

    books = await response.json();
  } catch (error) {
    console.error("New Arrivals error:", error);
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
      <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#B85C45]">
            Fresh From Our Shelves
          </p>

          <h2 className="text-3xl font-bold text-[#292421] md:text-4xl">
            New Arrivals
          </h2>

          <p className="mt-3 max-w-xl text-[#77716B]">
            Explore the latest additions to our growing collection.
            Your next favorite story might be waiting here.
          </p>
        </div>

        <Link
          href="/books"
          className="inline-flex w-fit items-center rounded-full border border-[#B85C45] px-6 py-3 text-sm font-semibold text-[#B85C45] transition hover:bg-[#B85C45] hover:text-white"
        >
          See All Books →
        </Link>
      </div>

      {books.length > 0 ? (
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <article
              key={book._id}
              className="group overflow-hidden rounded-2xl border border-[#E8DED2] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="aspect-[5/4] overflow-hidden">
                <img
                  src={book.image}
                  alt={book.title}
                  className="h-full w-full object-contain py-8 rounded-lg object-center transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <span className="rounded-full bg-[#F0EAE1] px-3 py-1 text-xs font-medium text-[#87917B]">
                  {book.category}
                </span>

                <h3 className="mt-4 font-[family-name:var(--font-lora)] text-xl font-bold text-[#292421]">
                  {book.title}
                </h3>

                <p className="mt-2 text-sm text-[#77716B]">
                  By {book.author}
                </p>

                <p className="mt-3 text-sm text-[#77716B]">
                  Available copies: {book.availableCopies}
                </p>

                <Link
                  href={`/books/${book._id}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#B85C45] transition hover:gap-3"
                >
                  View Details →
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="rounded-2xl bg-white p-10 text-center text-[#77716B]">
          No books have been added yet. Check back soon!
        </p>
      )}
    </section>
  );
};

export default NewArrivals;
