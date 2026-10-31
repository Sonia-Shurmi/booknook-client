
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, Eye, EyeOff, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
      toast.error("Password must contain uppercase and lowercase letters.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    try {
      setLoading(true);

      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: image.trim() || undefined,
      });

      if (error) {
        toast.error(error.message || "Registration failed.");
        return;
      }

      toast.success("Account created successfully! Please log in.");
      router.push("/login");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      setGoogleLoading(true);

      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Google sign-in failed.");
        setGoogleLoading(false);
      }
    } catch (error) {
      toast.error("Unable to continue with Google.");
      setGoogleLoading(false);
    }
  };

  return (
    <section className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-5 py-12">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-[#E8DED2] bg-white shadow-xl md:grid-cols-2">

        {/* Left side */}
        <div className="relative hidden min-h-[650px] flex-col justify-between overflow-hidden bg-[#292421] p-10 text-white md:flex">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(184,92,69,0.8),rgba(41,36,33,0.95))]" />

          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#B85C45]">
                <BookOpen size={25} />
              </div>
              <span className="font-[family-name:var(--font-lora)] text-2xl font-bold">
                BookNook.
              </span>
            </div>
          </div>

          <div className="relative z-10">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#F3C6B7]">
              Your next chapter starts here
            </p>
            <h1 className="mb-6 font-[family-name:var(--font-lora)] text-4xl font-bold leading-tight lg:text-5xl">
              A world of stories, waiting for you.
            </h1>
            <p className="max-w-sm leading-7 text-white/75">
              Discover new books, explore different worlds, and make reading
              part of your everyday life.
            </p>
          </div>

          <p className="relative z-10 text-sm text-white/60">
            Every book holds a world. Find yours.
          </p>
        </div>

        {/* Registration form */}
        <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
          <div className="mb-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#B85C45]">
              Join our community
            </p>
            <h2 className="font-[family-name:var(--font-lora)] text-3xl font-bold text-[#292421]">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-[#77716B]">
              Start discovering your next favorite book.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-[#292421]">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                className="w-full rounded-xl border border-[#E8DED2] bg-[#FAF7F2] px-4 py-3 outline-none transition focus:border-[#B85C45] focus:ring-2 focus:ring-[#B85C45]/15"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#292421]">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full rounded-xl border border-[#E8DED2] bg-[#FAF7F2] px-4 py-3 outline-none transition focus:border-[#B85C45] focus:ring-2 focus:ring-[#B85C45]/15"
              />
            </div>

            <div>
              <label htmlFor="image" className="mb-2 block text-sm font-medium text-[#292421]">
                Profile Photo URL <span className="text-[#77716B]">(Optional)</span>
              </label>
              <input
                id="image"
                type="url"
                placeholder="https://example.com/photo.jpg"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full rounded-xl border border-[#E8DED2] bg-[#FAF7F2] px-4 py-3 outline-none transition focus:border-[#B85C45] focus:ring-2 focus:ring-[#B85C45]/15"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-[#292421]">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-[#E8DED2] bg-[#FAF7F2] px-4 py-3 pr-12 outline-none transition focus:border-[#B85C45] focus:ring-2 focus:ring-[#B85C45]/15"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#77716B]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
              <p className="mt-2 text-xs text-[#77716B]">
                At least 6 characters, including uppercase and lowercase letters.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || googleLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#B85C45] py-3.5 font-semibold text-white transition hover:bg-[#9F4A36] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading && <Loader2 size={18} className="animate-spin" />}
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#E8DED2]" />
            <span className="text-xs text-[#77716B]">OR CONTINUE WITH</span>
            <div className="h-px flex-1 bg-[#E8DED2]" />
          </div>

          <button
            type="button"
            onClick={handleGoogleRegister}
            disabled={loading || googleLoading}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#E8DED2] py-3 font-medium text-[#292421] transition hover:bg-[#FAF7F2] disabled:opacity-60"
          >
            {googleLoading ? (
              <Loader2 size={19} className="animate-spin" />
            ) : (
              <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.42 37.99 46.98 31.85 46.98 24.55Z" />
                <path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" />
              </svg>
            )}
            Continue with Google
          </button>

          <p className="mt-7 text-center text-sm text-[#77716B]">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-[#B85C45] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
