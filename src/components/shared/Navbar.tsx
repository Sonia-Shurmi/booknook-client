
import Link from "next/link";
import { BookOpen } from "lucide-react";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E8DED2] bg-[#FAF7F2]/95 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#B85C45] text-white">
            <BookOpen size={23} strokeWidth={1.8} />
          </div>

          <span className="font-[family-name:var(--font-lora)] text-2xl font-bold tracking-tight text-[#292421]">
            BookNook<span className="text-[#B85C45]">.</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-sm font-medium text-[#292421] transition-colors hover:text-[#B85C45]">
            Home
          </Link>

          <Link href="/books" className="text-sm font-medium text-[#77716B] transition-colors hover:text-[#B85C45]">
            All Books
          </Link>

          <Link href="/add-book" className="text-sm font-medium text-[#77716B] transition-colors hover:text-[#B85C45]">
            Add Book
          </Link>

          <Link href="/my-books" className="text-sm font-medium text-[#77716B] transition-colors hover:text-[#B85C45]">
            My Books
          </Link>

          <Link href="/my-borrows" className="text-sm font-medium text-[#77716B] transition-colors hover:text-[#B85C45]">
            My Borrows
          </Link>
        </div>

        {/* Authentication Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden rounded-full px-5 py-2.5 text-sm font-semibold text-[#292421] transition-colors hover:text-[#B85C45] sm:inline-flex"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-full bg-[#B85C45] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#9F4B38] hover:shadow-md"
          >
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
