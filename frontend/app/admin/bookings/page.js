"use client";

import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001/api";
export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateStatus = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `${API_URL}/bookings/${id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "CONFIRMED" }),
      }
    );

    if (!res.ok) throw new Error("Failed to update status");

    setBookings((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, status: "CONFIRMED" } : b
      )
    );
  } catch (err) {
    alert(err.message);
  }
};


  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No auth token found");
        }

        const res = await fetch(`${API_URL}/bookings`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await res.json();
        console.log("Fetched bookings:", data.data);
        setBookings(data.data);
      } catch (err) {
        console.error("Bookings fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container py-16">
        <p className="text-red-600 font-semibold">{error}</p>
      </main>
    );
  }

  return (
    <main className="container py-16">
      <h1 className="text-3xl font-semibold mb-6">Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-neutral-600">No bookings found.</p>
      ) : (
        <div className="space-y-4">
{bookings.map((b) => (
  <div
    key={b.id}
    className="p-5 border rounded-xl bg-white shadow-sm flex justify-between items-center"
  >
    <div className="space-y-1">
      <p className="font-semibold">
        User: {b.user?.name ?? "Unknown"}
      </p>
      <p className="text-sm text-neutral-600">
        Date: {b.date_time}
      </p>

      <span
        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full
          ${
            b.status === "PENDING"
              ? "bg-yellow-100 text-yellow-800"
              : b.status === "CONFIRMED"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
      >
        {b.status}
      </span>
    </div>

    {b.status === "PENDING" && (
      <button
        onClick={() => updateStatus(b.id)}
        className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition"
      >
        Accept
      </button>
    )}
  </div>
))}


        </div>
      )}
    </main>
  );
}
