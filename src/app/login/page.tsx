
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, Eye, EyeOff, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "Invalid email or password.");
        return;
      }

      toast.success("Welcome back to BookNook!");
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);

      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Google login failed.");
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
        <div className="relative hidden min-h-[600px] flex-col justify-between overflow-hidden bg-[#292421] p-10 text-white md:flex">
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
              Welcome back, reader
            </p>
            <h1 className="mb-6 font-[family-name:var(--font-lora)] text-4xl font-bold leading-tight lg:text-5xl">
              Your next favorite story is waiting.
            </h1>
            <p className="max-w-sm leading-7 text-white/75">
              Sign in to explore our collection, borrow books, and continue
              your reading journey.
            </p>
          </div>

          <p className="relative z-10 text-sm text-white/60">
            Every book holds a world. Find yours.
          </p>
        </div>

        {/* Login form */}
        <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
          <div className="mb-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#B85C45]">
              Your reading journey
            </p>
            <h2 className="font-[family-name:var(--font-lora)] text-3xl font-bold text-[#292421]">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-[#77716B]">
              Sign in to your BookNook account.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
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
              <div className="mb-2 flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-[#292421]">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => toast.info("Please contact support if you need help accessing your account.")}
                  className="text-xs font-medium text-[#B85C45] hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
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
            </div>

            <button
              type="submit"
              disabled={loading || googleLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#B85C45] py-3.5 font-semibold text-white transition hover:bg-[#9F4A36] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading && <Loader2 size={18} className="animate-spin" />}
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#E8DED2]" />
            <span className="text-xs text-[#77716B]">OR CONTINUE WITH</span>
            <div className="h-px flex-1 bg-[#E8DED2]" />
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
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
            Don't have an account?{" "}
            <Link href="/register" className="font-semibold text-[#B85C45] hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
