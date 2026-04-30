'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UpdateNameForm({ initialName }) {
  const r = useRouter();
  const [name, setName] = useState(initialName || '');
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [saving, setSaving] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setMsg(''); setErr(''); setSaving(true);
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ name })
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || 'Update failed');
      }
      setMsg('Updated!');
      r.refresh();
    } catch (e) {
      setErr(e.message || 'Error');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      {err && <p className="text-sm text-rose-600">{err}</p>}
      {msg && <p className="text-sm text-emerald-600">{msg}</p>}
      <input
        className="border p-2 w-full rounded"
        value={name}
        onChange={e=>setName(e.target.value)}
        placeholder="Your name"
      />
      <button
        className="bg-black text-white px-4 py-2 rounded disabled:opacity-60"
        disabled={saving}
      >
        {saving ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
}
