"use client";

import Footer from "@/components/Footer";
import Input from "@/components/Input";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

useEffect(() => {
  const fetchUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsLoading(false);
      setUser(null);
      return;
    }

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001/api";
      const res = await fetch(`${API_URL}/me`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response status:", res);
      if (!res.ok) {
        localStorage.removeItem("token");
        setUser(null);
        return;
      }

      const data = await res.json();
      console.log("Fetched user data:", data.user);
      setUser(data.user);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  fetchUser();
}, []);


  if (isLoading) {
    return (
      <>
        <main className="container py-16">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto mb-4"></div>
              <p className="text-neutral-600">Loading your profile...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!user) {
    return (
      <>
        <main className="container py-16">
          <div className="text-center min-h-[50vh] flex items-center justify-center">
            <div className="max-w-md">
              <h1 className="text-3xl font-semibold mb-4 font-serif">
                Access Required
              </h1>
              <p className="text-neutral-600 mb-6">
                Please log in to view your profile and manage your account.
              </p>
              <div className="space-y-3">
                <a
                  href="/login"
                  className="block w-full rounded-full bg-rose-600 px-6 py-3 font-semibold text-white hover:bg-rose-700 transition"
                >
                  Sign In
                </a>
                <a
                  href="/register"
                  className="block w-full rounded-full border px-6 py-3 font-semibold text-neutral-700 hover:bg-neutral-50 transition"
                >
                  Create Account
                </a>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>

      <section className="bg-neutral-50 py-16">
        <div className="container text-center">
          <h1 className="text-4xl font-serif font-semibold mb-2">
            My Profile
          </h1>
          <p className="text-neutral-600">
            Manage your Bistro Bliss account
          </p>
        </div>
      </section>

      <main className="container py-12">
        <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow border">
            <h2 className="text-2xl font-serif font-semibold mb-6">
              Account Information
            </h2>

            <div className="space-y-6">
              <Input label="Full Name" value={user.name ?? ""} readOnly />
              <Input label="Email Address" value={user.email} readOnly />
              <Input
                label="Account Type"
                value={user.role === "ADMIN" ? "Administrator" : "Customer"}
                readOnly
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow border">
              <h3 className="font-serif font-semibold mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <a href="/bookings" className="block border rounded-lg p-3">
                  View My Bookings
                </a>
                <a href="/book-a-table" className="block border rounded-lg p-3">
                  Book a Table
                </a>
                {user.role === "ADMIN" && (
                  <a
                    href="/admin"
                    className="block bg-rose-600 text-white rounded-lg p-3"
                  >
                    Admin Dashboard
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
