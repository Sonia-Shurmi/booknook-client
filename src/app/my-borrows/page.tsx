
import type { Metadata } from "next";
import MyBorrowsClient from "@/components/books/MyBorrowsClient";

export const metadata: Metadata = {
  title: "My Borrows",
  description: "View and manage your borrowed books on BookNook.",
};

export default function MyBorrowsPage() {
  return <MyBorrowsClient />;
}
