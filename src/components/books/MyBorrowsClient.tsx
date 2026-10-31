
"use client";

export default function MyBorrowsClient() {
  return (
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

        <div className="rounded-2xl border border-[#E8DED2] bg-white px-6 py-16 text-center shadow-sm">
          <h2 className="font-[family-name:var(--font-lora)] text-2xl font-semibold text-[#292421]">
            Your Reading Shelf
          </h2>

          <p className="mt-3 text-[#77716B]">
            Your borrowed books will appear here.
          </p>
        </div>
      </div>
    </section>
  );
}
