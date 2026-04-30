"use client";

import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001/api";

export default function MyBookingsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unauth, setUnauth] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setUnauth(true);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/bookings`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          localStorage.removeItem("token");
          setUnauth(true);
          return;
        }

        const data = await res.json();
        console.log("Fetched bookings:", data);
        setItems(Array.isArray(data.data) ? data.data : data);
      } catch (err) {
        console.error("Failed to load bookings", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <p className="p-6">Loading bookings...</p>;
  }

  if (unauth) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-xl font-semibold mb-2">My bookings</h1>
        <p>Please log in to see your bookings.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-xl font-semibold">My bookings</h1>

      {items.length === 0 && <p>No bookings yet.</p>}

      {Array.isArray(items) && items.length > 0 && (
        items.map((b) => (
          <div key={b.id} className="border rounded p-4">
            <div>
              <span className="font-medium">When:</span>{" "}
              {new Date(b.date_time).toLocaleString()}
            </div>
            <div>
              <span className="font-medium">Guests:</span> {b.guests}
            </div>
            <div>
              <span className="font-medium">Status:</span> {b.status}
            </div>
            {b.notes && (
              <div>
                <span className="font-medium">Notes:</span> {b.notes}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
