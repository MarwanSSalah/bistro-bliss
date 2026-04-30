export default function Hero() {
  return (
    <section className="relative">
      <div className="absolute inset-0 -z-10 bg-[url('/images/hero.jpg')] bg-cover bg-center" />
      <div className="bg-black/40">
        <div className="container py-24 text-white">
          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight md:text-6xl">
            Fresh & Tasty Food
          </h1>
          <p className="mt-4 max-w-xl text-lg opacity-90">
            Discover our seasonal menu and book a cozy table for tonight.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/menu" className="rounded bg-white px-4 py-2 font-medium text-black">View Menu</a>
            <a href="/book" className="rounded border border-white px-4 py-2 font-medium">Book a Table</a>
          </div>
        </div>
      </div>
    </section>
  );
}
