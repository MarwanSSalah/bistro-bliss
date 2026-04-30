export default function Input({ label, className = "", ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-1 block text-sm font-medium text-neutral-700">{label}</span>}
      <input
        className={`w-full rounded border border-neutral-300 px-3 py-2 outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-colors ${className}`}
        {...props}
      />
    </label>
  );
}
