"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001/api";

export default function BookPage() {
  const r = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    guests: 2,
    date: "",
    time: ""
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  function setField(k, v) {
    setForm((prev) => ({ ...prev, [k]: v }));
  }

  // helper: combine separate date ("YYYY-MM-DD") + time ("HH:mm") to ISO
  function toISO(dateStr, timeStr) {
    if (!dateStr || !timeStr) return null;
    // build "YYYY-MM-DDTHH:mm:00"
    const isoLocal = `${dateStr}T${timeStr}:00`;
    // send as ISO string; server will new Date(dateTime)
    return isoLocal;
  }

  async function submit(e) {
    e.preventDefault();
    setErr("");
    setOk("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErr("Please log in to book a table.");
        r.push("/login");
        return;
      }

      const { date, time, guests } = form;
      const date_time = toISO(date, time);
      if (!date_time) throw new Error("Please choose both date and time.");

      const res = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          date_time,              // matches backend field name
          guests: Number(guests),
          notes: "",
        }),
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        setErr("Session expired. Please log in again.");
        r.push("/login");
        return;
      }
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Failed to create booking.");
      }

      setOk("Reservation sent! We’ll email you when it’s accepted.");
      // clear only date/time/guests if you want to keep name/email in the form:
      setForm((p) => ({ ...p, date: "", time: "", guests: 2 }));
      r.refresh(); // update any server components that read /api/bookings
    } catch (e) {
      setErr(e.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="container py-12">
        <h1 className="text-3xl font-bold">Book a Table</h1>

        {err && <p className="mt-4 text-sm text-red-600">{err}</p>}
        {ok && <p className="mt-4 text-sm text-green-600">{ok}</p>}

        <form onSubmit={submit} className="mt-6 grid gap-4 rounded-xl bg-white p-6 shadow-card md:max-w-lg">
          {/* Optional UX fields (not required by backend) */}
          <Input label="Full name" value={form.name} onChange={(e) => setField("name", e.target.value)} />
          <Input label="Email" type="email" value={form.email} onChange={(e) => setField("email", e.target.value)} />

          <Select label="Guests" value={form.guests} onChange={(e) => setField("guests", e.target.value)}>
            {[1,2,3,4,5,6,7,8].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </Select>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Date"
              type="date"
              value={form.date}
              onChange={(e) => setField("date", e.target.value)}
            />
            <Input
              label="Time"
              type="time"
              value={form.time}
              onChange={(e) => setField("time", e.target.value)}
            />
          </div>

          <button
            className="mt-2 rounded bg-black px-4 py-2 font-semibold text-white disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Reserving..." : "Reserve"}
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}