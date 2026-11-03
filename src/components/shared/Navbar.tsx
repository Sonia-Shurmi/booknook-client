
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  ChevronDown,
  Menu,
  X,
  UserRound,
  LogOut,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const Navbar = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const user = session?.user;

  const handleLogout = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error("Failed to log out. Please try again.");
        return;
      }

      toast.success("You have logged out successfully.");
      setDropdownOpen(false);
      setMobileMenuOpen(false);
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Something went wrong while logging out.");
    }
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E8DED2] bg-[#FAF7F2]/95 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
        {/* Brand */}
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="flex items-center gap-2.5"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#B85C45] text-white">
            <BookOpen size={23} strokeWidth={1.8} />
          </div>

          <span className="font-[family-name:var(--font-lora)] text-2xl font-bold tracking-tight text-[#292421]">
            BookNook<span className="text-[#B85C45]">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 xl:flex">
          <Link href="/" className="text-sm font-medium text-[#292421] transition-colors hover:text-[#B85C45]">
            Home
          </Link>

          <Link href="/books" className="text-sm font-medium text-[#77716B] transition-colors hover:text-[#B85C45]">
            All Books
          </Link>

          {user && (
            <>
              <Link href="/add-book" className="text-sm font-medium text-[#77716B] transition-colors hover:text-[#B85C45]">
                Add Book
              </Link>

              <Link href="/my-books" className="text-sm font-medium text-[#77716B] transition-colors hover:text-[#B85C45]">
                My Books
              </Link>

              <Link href="/my-borrows" className="text-sm font-medium text-[#77716B] transition-colors hover:text-[#B85C45]">
                My Borrows
              </Link>
            </>
          )}
        </div>

        {/* Authentication */}
        <div className="hidden items-center gap-3 xl:flex">
          {isPending ? (
            <div className="h-10 w-24 animate-pulse rounded-full bg-[#E8DED2]" />
          ) : user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 rounded-full border border-[#E8DED2] bg-white py-1.5 pl-1.5 pr-3 transition hover:border-[#B85C45]"
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || "User"}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#B85C45] font-semibold text-white">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}

                <span className="max-w-28 truncate text-sm font-semibold text-[#292421]">
                  {user.name}
                </span>

                <ChevronDown
                  size={16}
                  className={`text-[#77716B] transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-14 z-50 w-56 overflow-hidden rounded-xl border border-[#E8DED2] bg-white py-2 shadow-xl">
                  <div className="border-b border-[#E8DED2] px-4 py-3">
                    <p className="truncate text-sm font-semibold text-[#292421]">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-[#77716B]">
                      {user.email}
                    </p>
                  </div>

                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-[#292421] transition hover:bg-[#FAF7F2] hover:text-[#B85C45]"
                  >
                    <UserRound size={17} />
                    My Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm text-[#B85C45] transition hover:bg-[#FAF7F2]"
                  >
                    <LogOut size={17} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-[#292421] transition-colors hover:text-[#B85C45]"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-full bg-[#B85C45] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#9F4B38] hover:shadow-md"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-[#292421] hover:bg-[#F0EAE1] xl:hidden"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-[#E8DED2] bg-[#FAF7F2] px-5 py-5 shadow-lg xl:hidden">
          <div className="flex flex-col gap-1">
            {[
              { label: "Home", href: "/" },
              { label: "All Books", href: "/books" },
              ...(user
                ? [
                    { label: "Add Book", href: "/add-book" },
                    { label: "My Books", href: "/my-books" },
                    { label: "My Borrows", href: "/my-borrows" },
                    { label: "My Profile", href: "/profile" },
                  ]
                : []),
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className="rounded-lg px-4 py-3 text-sm font-medium text-[#292421] transition hover:bg-[#F0EAE1] hover:text-[#B85C45]"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-4 border-t border-[#E8DED2] pt-4">
            {isPending ? (
              <div className="h-10 animate-pulse rounded-lg bg-[#E8DED2]" />
            ) : user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-3">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || "User"}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#B85C45] font-semibold text-white">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#292421]">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-[#77716B]">
                      {user.email}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-[#B85C45] hover:bg-[#F0EAE1]"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link
                  href="/login"
                  onClick={closeMobileMenu}
                  className="flex-1 rounded-full border border-[#E8DED2] py-3 text-center text-sm font-semibold text-[#292421]"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={closeMobileMenu}
                  className="flex-1 rounded-full bg-[#B85C45] py-3 text-center text-sm font-semibold text-white"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
