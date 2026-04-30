const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001/api";
export async function api(path, { method="GET", data, token } = {}) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: data ? JSON.stringify(data) : undefined,
    cache: "no-store",
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
