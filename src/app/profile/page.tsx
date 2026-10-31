
import type { Metadata } from "next";
import ProfileClient from "@/components/profile/ProfileClient";

export const metadata: Metadata = {
  title: "My Profile",
  description: "View your BookNook account profile.",
};

export default function ProfilePage() {
  return <ProfileClient />;
}
