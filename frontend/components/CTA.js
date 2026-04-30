export default function CTA() {
  return (
    <section className="container my-16 rounded-2xl bg-brand.primary px-8 py-12 text-white">
      <div className="grid items-center gap-6 md:grid-cols-2">
        <div>
          <h3 className="text-3xl font-bold">Ready to dine with us?</h3>
          <p className="mt-2 opacity-90">Reserve your table in seconds.</p>
        </div>
        <div className="flex justify-end">
          <a href="/book" className="rounded bg-white px-5 py-3 font-semibold text-black">Book a Table</a>
        </div>
      </div>
    </section>
  );
}
