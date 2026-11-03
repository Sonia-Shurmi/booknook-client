import Link from "next/link";
import { BookOpen, Home, Search } from "lucide-react";

const NotFound = () => {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-[#FAF7F2] px-6 py-16">
      <div className="mx-auto max-w-xl text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-[#B85C45]/10 p-5">
            <BookOpen className="h-12 w-12 text-[#B85C45]" />
          </div>
        </div>

        <p className="mb-3 text-sm font-semibold tracking-[0.3em] text-[#B85C45]">
          ERROR 404
        </p>

        <h1 className="font-serif text-4xl font-bold text-[#292421] sm:text-5xl">
          Lost Between Pages?
        </h1>

        <p className="mx-auto mt-5 max-w-md leading-7 text-[#6B625D]">
          The page you're looking for seems to have wandered off the shelf.
          Let's help you find your way back to a good read.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#B85C45] px-6 py-3 font-medium text-white transition hover:bg-[#984735]"
          >
            <Home size={18} />
            Back to Home
          </Link>

          <Link
            href="/books"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#B85C45] px-6 py-3 font-medium text-[#B85C45] transition hover:bg-[#B85C45]/10"
          >
            <Search size={18} />
            Explore Library
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;