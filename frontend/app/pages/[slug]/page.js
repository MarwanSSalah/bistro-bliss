// app/pages/[slug]/page.js
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "../articles";
import Footer from "@/components/Footer";

export async function generateStaticParams() {
  // Optional: lets Next pre-build all article routes
  return articles.map((a) => ({ slug: a.slug }));
}

export default function ArticlePage({ params }) {
  const { slug } = params || {};
  const article = articles.find((a) => a.slug === slug);
  if (!article) return notFound();

  // Burger Pizza
  if (slug === "burger-pizza-tips") {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <FullBurgerPizza article={article} />
        </main>
        <div className="mt-12">
          <Footer />
        </div>
      </div>
    );
  }

  // Air Fryer Fries
  if (slug === "air-fryer-fries") {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <FullAirFryer article={article} />
        </main>
        <div className="mt-12">
          <Footer />
        </div>
      </div>
    );
  }

  // Generic Article
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <GenericArticle article={article} />
      </main>
      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
}

/* ---------- Generic template for the other articles ---------- */
function GenericArticle({ article }) {
  return (
    <main className="bg-white">
      <header className="mx-auto max-w-4xl px-4 py-10 text-center">
        <h1 className="text-3xl font-semibold md:text-5xl">{article.title}</h1>
        <div className="mt-2 text-sm text-neutral-500">{article.date}</div>
      </header>

      <div className="mx-auto max-w-4xl px-4">
        <div className="relative mb-8 h-72 w-full overflow-hidden rounded-2xl md:h-96">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="prose prose-neutral max-w-none">
          <p>
            This is a placeholder article body. Replace this with your real
            content later.
          </p>
          <p>
            Tip: keep images in <code>/public/images</code> and reference them
            with paths like <code>/images/your-file.jpg</code>.
          </p>
        </div>

        {/* Back link with spacing */}
        <div className="mt-10 mb-16">
          <Link
            href="/pages"
            className="inline-block rounded-full border px-4 py-2 text-sm font-medium hover:bg-neutral-50"
          >
            ← Back to all articles
          </Link>
        </div>
      </div>
    </main>
  );
}

/* ---------- Full article example #1 ---------- */
function FullBurgerPizza({ article }) {
  return (
    <main className="bg-white">
      <header className="mx-auto max-w-4xl px-4 py-10 text-center">
        <h1 className="text-3xl font-semibold md:text-5xl">{article.title}</h1>
        <div className="mt-2 text-sm text-neutral-500">{article.date}</div>
      </header>

      <div className="mx-auto max-w-4xl px-4">
        <div className="relative mb-8 h-72 w-full overflow-hidden rounded-2xl md:h-96">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="prose prose-neutral max-w-none">
          <h2>Perfect Patties & Crispy Crusts</h2>
          <p>Start with quality ingredients and simple techniques...</p>
          <ul>
            <li>Salt the patty only on the outside right before searing.</li>
            <li>Don’t overload toppings—balance is everything.</li>
            <li>Let pizza dough ferment cold for 24–48 hours for flavor.</li>
          </ul>
        </div>

        {/* Back link with spacing */}
        <div className="mt-10 mb-16">
          <Link
            href="/pages"
            className="inline-block rounded-full border px-4 py-2 text-sm font-medium hover:bg-neutral-50"
          >
            ← Back to all articles
          </Link>
        </div>
      </div>
    </main>
  );
}

/* ---------- Full article example #2 ---------- */
function FullAirFryer({ article }) {
  return (
    <main className="bg-white">
      <header className="mx-auto max-w-4xl px-4 py-10 text-center">
        <h1 className="text-3xl font-semibold md:text-5xl">{article.title}</h1>
        <div className="mt-2 text-sm text-neutral-500">{article.date}</div>
      </header>

      <div className="mx-auto max-w-4xl px-4">
        <div className="relative mb-8 h-72 w-full overflow-hidden rounded-2xl md:h-96">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="prose prose-neutral max-w-none">
          <h2>Golden & Crispy in Minutes</h2>
          <p>Cut potatoes evenly, soak in cold water, then dry thoroughly...</p>
          <ol>
            <li>Soak 20–30 mins to remove excess starch.</li>
            <li>Preheat the air fryer for consistent results.</li>
            <li>Work in batches; don’t overcrowd.</li>
          </ol>
        </div>

        {/* Back link with spacing */}
        <div className="mt-10 mb-16">
          <Link
            href="/pages"
            className="inline-block rounded-full border px-4 py-2 text-sm font-medium hover:bg-neutral-50"
          >
            ← Back to all articles
          </Link>
        </div>
      </div>
    </main>
  );
}