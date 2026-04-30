"use client";

import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001/api";

export default function AdminMenuItemsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // form fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("a");
  const [category, setCategory] = useState("MAIN_DISH");
  const [isAvailable, setIsAvailable] = useState(true);

  const [saving, setSaving] = useState(false);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const fetchMenuItems = async () => {
    try {
      const res = await fetch(`${API_URL}/menu-items`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      setItems(data);
    } catch {
      setError("Unable to load menu items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const handleAddItem = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/menu-items`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          price: Number(price),
          image,
          category,
          is_available: isAvailable,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to create menu item");
      }

      // reset form
      setName("");
      setDescription("");
      setPrice("");
      setImage("");
      setCategory("MAIN_DISH");
      setIsAvailable(true);

      fetchMenuItems();
    } catch (err) {
      setError("Failed to add menu item");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="container py-16 max-w-2xl">
      <h1 className="text-3xl font-semibold mb-6">Menu Items</h1>

      {/* Add Menu Item */}
      <form
        onSubmit={handleAddItem}
        className="mb-8 p-4 border rounded-xl bg-white shadow-sm space-y-4"
      >
        <h2 className="text-lg font-medium">Add Menu Item</h2>

        <input
          type="text"
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-lg p-2"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded-lg p-2"
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border rounded-lg p-2"
          min="0"
          step="0.01"
          required
        />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full border rounded-lg p-2"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded-lg p-2"
          required
        >
          <option value="BREAKFAST">Breakfast</option>
          <option value="MAIN_DISH">Main Dish</option>
          <option value="DRINK">Drink</option>
          <option value="DESSERT">Dessert</option>
        </select>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isAvailable}
            onChange={(e) => setIsAvailable(e.target.checked)}
          />
          Available
        </label>

        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-black text-white rounded-lg disabled:opacity-50"
        >
          {saving ? "Saving..." : "Add Item"}
        </button>
      </form>

      {loading && <p>Loading menu items...</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-4 border rounded-xl bg-white shadow-sm"
          >
            <p>
              <strong>Name:</strong> {item.name}
            </p>
            <p>
              <strong>Description:</strong> {item.description}
            </p>
            <p>
              <strong>Category:</strong> {item.category}
            </p>
            <p>
              <strong>Price:</strong> ${item.price}
            </p>
            <p>
              <strong>Available:</strong>{" "}
              {item.is_available ? "Yes" : "No"}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
