import { useEffect, useState } from "react";

const slides = [
  {
    step: "01",
    title: "Open the app and start capture",
    body: "Open the app, complete the check-out date and press the capture passport button.",
    image: "/scan-steps/step-1.png"
  },
  {
    step: "02",
    title: "Scan the MRZ code",
    body: "Center the MRZ code of the passport inside the frame and scan it clearly.",
    image: "/scan-steps/step-2.jpeg"
  },
  {
    step: "03",
    title: "Verify and confirm the data",
    body: "Review the scanned details and confirm them before saving the guest record.",
    image: "/scan-steps/step-3.png"
  },
  {
    step: "04",
    title: "TM30 record ready",
    body: "The guest record is now ready and correctly prepared for your TM30 workflow.",
    image: "/scan-steps/step-4.png"
  }
] as const;

export default function ScanProcessCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrent((value) => (value + 1) % slides.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, []);

  const active = slides[current];

  const renderVisual = (slide: (typeof slides)[number]) => {
    if (slide.image) {
      return (
        <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-[1.1rem]">
          <div className="h-[220px] w-[170px] overflow-hidden rounded-[1.05rem] border border-white/10 shadow-[0_18px_45px_rgba(0,0,0,0.22)] md:h-[360px] md:w-[270px]">
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full scale-[1.02] object-cover object-center"
            />
          </div>
        </div>
      );
    }
  };

  return (
    <div className="w-full max-w-full overflow-hidden rounded-[2.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(16,39,66,0.94),rgba(9,21,37,0.88))] p-3 shadow-glow sm:max-w-[460px] sm:p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/20"></span>
          <span className="h-2 w-2 rounded-full bg-white/20"></span>
          <span className="h-2 w-2 rounded-full bg-white/20"></span>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.68rem] font-extrabold uppercase tracking-[0.18em] text-mint">
          Scan flow
        </div>
      </div>

      <div className="overflow-hidden rounded-[1.8rem] bg-[radial-gradient(circle_at_top,rgba(76,224,179,0.16),transparent_40%),linear-gradient(180deg,#0c1b2f_0%,#08111d_100%)] p-3 md:p-5">
        <div className="md:hidden">
          <article className="flex min-w-0 flex-col">
            <div className="relative mb-4 flex h-[280px] items-center justify-center overflow-hidden rounded-[1.35rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))] px-3 py-4">
              {renderVisual(active)}
            </div>
          </article>
        </div>

        <div className="relative hidden h-[560px] overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/5 p-4 md:block">
          <div
            className="flex h-full transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide) => (
              <article key={slide.step} className="flex h-full min-w-full min-w-0 flex-col">
                <div className="relative mb-4 flex h-[420px] flex-none items-center justify-center overflow-hidden rounded-[1.35rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))] px-5 py-5">
                  {renderVisual(slide)}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.step}
                type="button"
                aria-label={`Go to slide ${slide.step}`}
                onClick={() => setCurrent(index)}
                className={`h-2.5 rounded-full transition ${
                  current === index ? "w-10 bg-mint" : "w-2.5 bg-white/20"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => setCurrent((current - 1 + slides.length) % slides.length)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-cloud transition hover:bg-white/10"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M14.71 6.29a1 1 0 0 1 0 1.41L10.41 12l4.3 4.29a1 1 0 1 1-1.41 1.42l-5-5a1 1 0 0 1 0-1.42l5-5a1 1 0 0 1 1.41 0Z" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => setCurrent((current + 1) % slides.length)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-cloud transition hover:bg-white/10"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M9.29 17.71a1 1 0 0 1 0-1.41L13.59 12 9.29 7.71a1 1 0 0 1 1.41-1.42l5 5a1 1 0 0 1 0 1.42l-5 5a1 1 0 0 1-1.41 0Z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-4 rounded-[1.2rem] border border-white/10 bg-mint/10 px-4 py-3 text-sm leading-6 text-mist">
          <strong className="mr-2 text-cloud">{active.step}.</strong>
          {active.body}
        </div>
      </div>
    </div>
  );
}
