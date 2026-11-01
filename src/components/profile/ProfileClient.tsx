
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, UserRound, Mail } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function ProfileClient() {
  const { data: session, isPending } = authClient.useSession();
  
  const router = useRouter();
  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace("/login?callbackUrl=%2Fprofile");
    }
  }, [isPending, session, router]);

  const user = session?.user;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [saving, setSaving] = useState(false);

  if (isPending) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#FAF7F2]">
        <p className="text-[#77716B]">Loading your profile...</p>
      </section>
    );
  }

 if (!user) {
  return (
    <section className="flex min-h-screen items-center justify-center bg-[#FAF7F2]">
      <p className="text-[#77716B]">Redirecting to login...</p>
    </section>
  );
}

  const displayName = name || user.name || "BookNook Reader";
  const displayImage = image || user.image || "";

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setSaving(true);

      const { error } = await authClient.updateUser({
        name: name.trim(),
        image: image.trim() || undefined,
      });

      if (error) {
        throw new Error(error.message || "Unable to update your profile.");
      }

      toast.success("Profile updated successfully!");
      setName("");
      setImage("");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to update your profile."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#FAF7F2] px-5 py-16 md:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#B85C45]">
            Your Account
          </p>

          <h1 className="font-[family-name:var(--font-lora)] text-4xl font-bold text-[#292421] md:text-5xl">
            My Profile
          </h1>

          <p className="mt-4 text-[#77716B]">
            Manage your personal information and account details.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#E8DED2] bg-white shadow-sm">
          <div className="bg-[#F1E9DF] px-6 py-10 text-center">
            <div className="mx-auto flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-[#E8DED2] shadow-sm">
              {displayImage ? (
                <img
                  src={displayImage}
                  alt={displayName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <UserRound size={44} className="text-[#B85C45]" />
              )}
            </div>

            <h2 className="mt-5 font-[family-name:var(--font-lora)] text-2xl font-bold text-[#292421]">
              {displayName}
            </h2>

            <p className="mt-2 text-sm text-[#77716B]">
              BookNook Member
            </p>
          </div>

          <div className="grid gap-8 p-6 md:grid-cols-2 md:p-10">
            <div className="space-y-5">
              <h3 className="font-[family-name:var(--font-lora)] text-xl font-bold text-[#292421]">
                Account Information
              </h3>

              <div className="flex items-center gap-4 rounded-xl bg-[#FAF7F2] p-4">
                <UserRound className="text-[#B85C45]" size={21} />
                <div>
                  <p className="text-xs text-[#99918A]">Full Name</p>
                  <p className="mt-1 font-medium text-[#292421]">
                    {user.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-xl bg-[#FAF7F2] p-4">
                <Mail className="text-[#B85C45]" size={21} />
                <div className="min-w-0">
                  <p className="text-xs text-[#99918A]">Email Address</p>
                  <p className="mt-1 break-all font-medium text-[#292421]">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleUpdate} className="space-y-5">
              <h3 className="font-[family-name:var(--font-lora)] text-xl font-bold text-[#292421]">
                Edit Profile
              </h3>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#292421]">
                  Update Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={user.name}
                  required
                  minLength={2}
                  className="h-12 w-full rounded-xl border border-[#E8DED2] bg-[#FAF7F2] px-4 text-sm outline-none focus:border-[#B85C45]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#292421]">
                  Profile Photo URL
                </label>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="h-12 w-full rounded-xl border border-[#E8DED2] bg-[#FAF7F2] px-4 text-sm outline-none focus:border-[#B85C45]"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#B85C45] px-5 font-semibold text-white transition hover:bg-[#984936] disabled:opacity-60"
              >
                <Camera size={18} />
                {saving ? "Saving Changes..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
