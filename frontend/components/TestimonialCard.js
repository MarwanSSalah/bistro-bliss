import Image from "next/image";

export default function TestimonialCard({ quote, name, role, avatar="/images/avatar.png" }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-card">
      <div className="text-lg">“{quote}”</div>
      <div className="mt-4 flex items-center gap-3">
        <image src={avatar} alt={name} className="h-10 w-10 rounded-full object-cover" />
        <div>
          <div className="text-sm font-semibold">{name}</div>
          <div className="text-xs text-gray-500">{role}</div>
        </div>
      </div>
    </div>
  );
}
