// app/contact/page.js
import Footer from '@/components/Footer';
import Link from 'next/link';
export default function Contact() {
  return (
    <>


      {/* Contact Form */}
      <section className="bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-20 text-center">
          <h1 className="text-3xl font-semibold md:text-5xl">Contact Us</h1>
          <p className="mt-3 text-neutral-600 max-w-lg mx-auto">
            We consider all the drivers of change give you the components you need to change to create a truly happens.
          </p>

          <form className="mx-auto mt-10 grid max-w-2xl gap-6 rounded-2xl bg-white p-8 shadow-lg">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <input className="rounded-lg border border-neutral-300 p-3" placeholder="Enter your name" />
              <input className="rounded-lg border border-neutral-300 p-3" placeholder="Enter email address" />
            </div>
            <input className="rounded-lg border border-neutral-300 p-3" placeholder="Subject" />
            <textarea className="rounded-lg border border-neutral-300 p-3" placeholder="Write your message" rows="4" />
            <button type="submit" className="rounded-full bg-rose-700 px-6 py-3 text-white font-medium">
              Send
            </button>
          </form>

          {/* Contact Info */}
          <div className="mt-12 grid gap-8 text-sm text-neutral-700 md:grid-cols-3">
            <div>
              <div className="font-semibold">Call Us:</div>
              <div className="text-rose-700">+1-234-567-8900</div>
            </div>
            <div>
              <div className="font-semibold">Hours:</div>
              <div>Mon–Fri: 11am – 8pm</div>
              <div>Sat, Sun: 9am – 10pm</div>
            </div>
            <div>
              <div className="font-semibold">Our Location:</div>
              <div>123 Bridge Street</div>
              <div>Nowhere Land, LA 12345</div>
              <div>United States</div>
            </div>
          </div>
        </div>
      </section>

    <Footer />
    </>
  );
}