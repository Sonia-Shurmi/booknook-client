import type { Metadata } from "next";
import MyBooksClient from "@/components/books/MyBooksClient";

export const metadata: Metadata = {
  title: "My Books",
  description: "Manage the books you have added to BookNook.",
};

export default function MyBooksPage() {
  return <MyBooksClient />;
}