'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/Providers/AuthProvider';

export default function LogoutButton() {
  const r = useRouter();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  async function handleLogout() {
    setErr('');
    setLoading(true);
    try {
      await logout(); // calls backend /logout and clears localStorage
      r.push('/');
      r.refresh();
    } catch (e) {
      setErr(e.message || 'Logout failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleLogout}
        className="rounded bg-neutral-900 px-4 py-2 text-white text-sm hover:opacity-90 disabled:opacity-60"
        disabled={loading}
      >
        {loading ? 'Logging out…' : 'Log out'}
      </button>
      {err && <span className="text-xs text-rose-700">{err}</span>}
    </div>
  );
}
