import Image from 'next/image';
function MenuGrid({ title, items }) {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-16">
      <h2 className="text-3xl font-semibold mb-6 text-center text-rose-700">{title}</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(item => (
          <div
            key={item.id ?? item.name}
            className="rounded-2xl border border-neutral-200 bg-white p-2 shadow-sm hover:shadow-rose-200 hover:border-rose-400 hover:scale-105 transition-all duration-300 cursor-pointer group"
          >
            <div className="h-40 w-full rounded-xl bg-neutral-200 overflow-hidden flex items-center justify-center">
              <Image
                src={item.image || '/images/pizza.jpg'}
                alt={item.name || item.title}
                width={160}
                height={160}
                className="object-cover h-full w-full rounded-xl transition-transform duration-300 group-hover:scale-110"
                unoptimized
              />
            </div>
            <div className="space-y-1 p-4">
              <div className="font-semibold text-rose-700 group-hover:text-rose-900 transition-colors duration-300">
                {`$ ${Number(item.price).toFixed(2)}`}
              </div>
              <div className="text-lg font-semibold group-hover:text-rose-700 transition-colors duration-300">
                {item.name || item.title}
              </div>
              <p className="text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors duration-300">
                {item.description || 'Made with eggs, lettuce, salt, oil and other ingredients.'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
