export default function Select({ label, children, ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-1 block text-sm font-medium">{label}</span>}
      <select
        className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-brand.primary"
        {...props}
      >
        {children}
      </select>
    </label>
  );
}
