'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UpdateStatus({ id, initial = 'PENDING' }) {
  const r = useRouter();
  const [status, setStatus] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  async function apply(nextStatus) {
    setErr('');
    setSaving(true);
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || 'Failed to update status');
      }
      setStatus(nextStatus);
      r.refresh();
    } catch (e) {
      setErr(e.message || 'Error');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mt-4 flex items-center gap-2">
      <button
        onClick={() => apply('ACCEPTED')}
        className="rounded bg-emerald-600 px-3 py-1 text-white text-sm hover:opacity-90 disabled:opacity-50"
        disabled={saving || status === 'ACCEPTED'}
      >
        Accept
      </button>
      <button
        onClick={() => apply('REJECTED')}
        className="rounded bg-rose-600 px-3 py-1 text-white text-sm hover:opacity-90 disabled:opacity-50"
        disabled={saving || status === 'REJECTED'}
      >
        Reject
      </button>
      <button
        onClick={() => apply('CANCELLED')}
        className="rounded bg-neutral-800 px-3 py-1 text-white text-sm hover:opacity-90 disabled:opacity-50"
        disabled={saving || status === 'CANCELLED'}
      >
        Cancel
      </button>
      {err && <span className="text-xs text-rose-700">{err}</span>}
    </div>
  );
}
