"use client";

import { FormEvent, useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Store,
} from "lucide-react";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Veuillez saisir votre adresse e-mail.");
      return;
    }

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    // Frontend only.
    // Authentication / API integration will be added later.
    console.log("Sign up form submitted", {
      email,
      password,
    });
  }

  return (
    <main className="min-h-screen bg-[#080a0b] text-white">
      <div className="relative min-h-screen overflow-hidden">
        {/* Background effects */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[-220px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-red-600/10 blur-[120px]" />
          <div className="absolute bottom-[-200px] left-[-150px] h-[400px] w-[400px] rounded-full bg-red-600/5 blur-[100px]" />
        </div>

        <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-10">
          <div className="w-full max-w-[440px]">
            {/* Brand */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-600/10 shadow-[0_0_40px_rgba(239,32,40,0.12)]">
                <Store size={26} className="text-red-500" />
              </div>

              <h1 className="text-3xl font-bold tracking-tight">
                Algeria<span className="text-red-500">Commerce</span>
              </h1>

              <p className="mt-2 text-sm text-zinc-500">
                Create your merchant account
              </p>
            </div>

            {/* Card */}
            <div className="rounded-3xl border border-white/[0.08] bg-[#111315]/95 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8">
              <div className="mb-7">
                <h2 className="text-xl font-semibold">
                  Create your account
                </h2>

                <p className="mt-1.5 text-sm leading-6 text-zinc-500">
                  Set up your merchant account to manage your store,
                  products and landing pages.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-zinc-300"
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
                    />

                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="merchant@example.com"
                      className="h-12 w-full rounded-xl border border-white/[0.08] bg-[#181a1c] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-red-500/60 focus:ring-2 focus:ring-red-500/10"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-zinc-300"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={18}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
                    />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="••••••••"
                      className="h-12 w-full rounded-xl border border-white/[0.08] bg-[#181a1c] pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-red-500/60 focus:ring-2 focus:ring-red-500/10"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-zinc-600 transition hover:text-zinc-300"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-medium text-zinc-300"
                  >
                    Confirm password
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={18}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
                    />

                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      placeholder="••••••••"
                      className="h-12 w-full rounded-xl border border-white/[0.08] bg-[#181a1c] pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-red-500/60 focus:ring-2 focus:ring-red-500/10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword((value) => !value)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-zinc-600 transition hover:text-zinc-300"
                      aria-label={
                        showConfirmPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {error}
                  </div>
                )}

                {/* Security */}
                <div className="flex gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <ShieldCheck
                    size={19}
                    className="mt-0.5 shrink-0 text-red-500"
                  />

                  <p className="text-xs leading-5 text-zinc-500">
                    Your merchant account is private and protected.
                    Authentication will be connected to the backend later.
                  </p>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-red-600 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(239,32,40,0.18)] transition hover:bg-red-500 hover:shadow-[0_14px_35px_rgba(239,32,40,0.25)] active:scale-[0.99]"
                >
                  Create account

                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </button>
              </form>
            </div>

            <p className="mt-6 text-center text-xs text-zinc-600">
              AlgeriaCommerce Merchant Platform
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
