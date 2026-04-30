import Image from "next/image";

export default function DishCard({ item }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --cream:       #FAF7F2;
          --burgundy:    #6B1A2A;
          --burgundy-lt: #8B2A3E;
          --gold:        #C9965A;
          --gold-lt:     #E8B87A;
          --charcoal:    #1C1612;
          --warm-gray:   #8C7B6B;
          --card-bg:     #FFFCF8;
        }

        .dish-card {
          background: var(--card-bg);
          border: 1px solid rgba(107,26,42,.08);
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: transform .35s cubic-bezier(.22,1,.36,1),
                      box-shadow .35s,
                      border-color .3s;
        }
        .dish-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 55px rgba(107,26,42,.13);
          border-color: rgba(107,26,42,.18);
        }

        /* image area */
        .dish-card-img {
          position: relative;
          height: 180px;
          overflow: hidden;
        }
        .dish-card-img img {
          transition: transform .5s cubic-bezier(.22,1,.36,1) !important;
        }
        .dish-card:hover .dish-card-img img {
          transform: scale(1.08) !important;
        }
        .dish-card-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(28,22,18,.22) 0%, transparent 55%);
          pointer-events: none;
        }

        /* price badge */
        .dish-price-badge {
          position: absolute;
          top: .75rem;
          right: .75rem;
          background: var(--gold);
          color: var(--charcoal);
          font-family: 'DM Sans', sans-serif;
          font-size: .78rem;
          font-weight: 500;
          letter-spacing: .04em;
          padding: .28rem .8rem;
          border-radius: 2rem;
          box-shadow: 0 2px 10px rgba(201,150,90,.4);
          z-index: 1;
        }

        /* body */
        .dish-card-body {
          padding: 1.1rem 1.2rem 1.3rem;
        }
        .dish-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--charcoal);
          line-height: 1.25;
          margin-bottom: .35rem;
          transition: color .25s;
        }
        .dish-card:hover .dish-card-title {
          color: var(--burgundy);
        }
        .dish-card-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: .78rem;
          font-weight: 300;
          color: var(--warm-gray);
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin-bottom: .9rem;
        }

        /* footer row */
        .dish-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid rgba(107,26,42,.06);
          padding-top: .85rem;
        }
        .dish-card-cta {
          font-family: 'DM Sans', sans-serif;
          font-size: .72rem;
          font-weight: 500;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: var(--burgundy);
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          border-bottom: 1px solid transparent;
          transition: border-color .2s, color .2s;
        }
        .dish-card:hover .dish-card-cta {
          border-color: var(--burgundy);
          color: var(--burgundy-lt);
        }
        .dish-card-dots {
          display: flex;
          gap: 3px;
        }
        .dish-card-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: rgba(201,150,90,.3);
          transition: background .25s;
        }
        .dish-card:hover .dish-card-dot {
          background: var(--gold);
        }
      `}</style>

      <div className="dish-card">
        {/* Image */}
        <div className="dish-card-img">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            unoptimized
          />
          <div className="dish-card-img-overlay" />
          <div className="dish-price-badge">${Number(item.price).toFixed(2)}</div>
        </div>

        {/* Body */}
        <div className="dish-card-body">
          <div className="dish-card-title">{item.title}</div>
          <p className="dish-card-desc">
            {item.description || 'Made with fresh, hand-selected ingredients by our kitchen team.'}
          </p>

          {/* Footer row */}
          <div className="dish-card-footer">
            <button className="dish-card-cta">Add to Order →</button>
            <div className="dish-card-dots">
              <span className="dish-card-dot" />
              <span className="dish-card-dot" />
              <span className="dish-card-dot" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}