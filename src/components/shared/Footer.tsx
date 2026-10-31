
import Link from "next/link";
import { BookOpen, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-[#E8DED2] bg-[#F0EAE1]">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 inline-flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#B85C45] text-white">
                <BookOpen size={22} />
              </div>
              <span className="font-[family-name:var(--font-lora)] text-2xl font-bold text-[#292421]">
                BookNook<span className="text-[#B85C45]">.</span>
              </span>
            </Link>

            <p className="max-w-sm text-sm leading-7 text-[#77716B]">
              Every book holds a world. Find yours. Discover wonderful stories,
              explore new ideas, and share the joy of reading with BookNook.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 font-[family-name:var(--font-lora)] text-lg font-semibold text-[#292421]">
              Explore
            </h3>

            <ul className="space-y-3 text-sm text-[#77716B]">
              <li>
                <Link href="/" className="transition-colors hover:text-[#B85C45]">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/books" className="transition-colors hover:text-[#B85C45]">
                  All Books
                </Link>
              </li>
              <li>
                <Link href="/register" className="transition-colors hover:text-[#B85C45]">
                  Join BookNook
                </Link>
              </li>
              <li>
                <Link href="/login" className="transition-colors hover:text-[#B85C45]">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 font-[family-name:var(--font-lora)] text-lg font-semibold text-[#292421]">
              Get in Touch
            </h3>

            <ul className="space-y-4 text-sm text-[#77716B]">
              <li className="flex items-center gap-3">
                <Mail size={17} className="shrink-0 text-[#B85C45]" />
                <span>hello@booknook.com</span>
              </li>

              <li className="flex items-center gap-3">
                <Phone size={17} className="shrink-0 text-[#B85C45]" />
                <span>Contact us anytime</span>
              </li>

              <li className="flex items-center gap-3">
                <MapPin size={17} className="shrink-0 text-[#B85C45]" />
                <span>Online Library</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-[#DDD2C5] pt-6 text-center">
          <p className="text-sm text-[#77716B]">
            © {new Date().getFullYear()} BookNook. All rights reserved.
            Made for book lovers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
