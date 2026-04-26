import { useEffect, useRef } from "react";

const cards = [
  {
    step: "01",
    title: "Manual passport entry slows down check-in",
    body: "When staff have to type every passport detail by hand, lines move slower and the front desk feels more pressure."
  },
  {
    step: "02",
    title: "Scan once and capture the guest data instantly",
    body: "Your team uses the app at check-in to capture the details in seconds, without repetitive manual entry."
  },
  {
    step: "03",
    title: "Export the daily file and complete TM30 faster",
    body: "At the end of the day, download the Excel file and finish your reporting workflow with less friction and less risk."
  }
];

export default function SalesScrollStory() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let cleanup = () => {};

    const run = async () => {
      const { default: gsap } = await import("gsap");
      const scrollTriggerModule = await import("gsap/ScrollTrigger");
      const ScrollTrigger =
        scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default || scrollTriggerModule;

      gsap.registerPlugin(ScrollTrigger);

      const storyCards = section.querySelectorAll(".sales-card");
      const progressBar = section.querySelector(".sales-progress");
      const track = section.querySelector(".sales-track");

      const ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
          gsap.set(storyCards, {
            scale: (index) => (index === 0 ? 1 : 0.985),
            filter: (index) => (index === 0 ? "blur(0px)" : "blur(1px)")
          });

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=1700",
              scrub: 1,
              pin: true
            }
          });

          if (track) {
            timeline.to(
              track,
              {
                yPercent: -69.5,
                duration: 3,
                ease: "none"
              },
              0
            );
          }

          timeline
            .to(
              storyCards,
              {
                scale: (i) => (i === 0 ? 1 : 0.982),
                filter: (i) => (i === 0 ? "blur(0px)" : "blur(1px)"),
                duration: 1,
                ease: "power2.out"
              },
              0
            )
            .to(
              storyCards,
              {
                scale: (i) => (i === 1 ? 1 : 0.982),
                filter: (i) => (i === 1 ? "blur(0px)" : "blur(1px)"),
                duration: 1,
                ease: "power2.out"
              },
              1
            )
            .to(
              storyCards,
              {
                scale: (i) => (i === 2 ? 1 : 0.982),
                filter: (i) => (i === 2 ? "blur(0px)" : "blur(1px)"),
                duration: 1,
                ease: "power2.out"
              },
              2
            );

          if (progressBar) {
            gsap.fromTo(
              progressBar,
              { scaleY: 0, transformOrigin: "top center" },
              {
                scaleY: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: section,
                  start: "top top",
                  end: "+=1700",
                  scrub: true
                }
              }
            );
          }
        });

        mm.add("(max-width: 767px)", () => {
          gsap.set(storyCards, {
            opacity: 0,
            y: 40,
            scale: 0.98,
            clearProps: "filter"
          });

          storyCards.forEach((card, index) => {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 82%",
                once: true
              },
              delay: index * 0.05
            });
          });
        });

        cleanup = () => mm.revert();
      }, section);

      cleanup = () => {
        ctx.revert();
      };
    };

    run();

    return () => cleanup();
  }, []);

  return (
    <div ref={sectionRef} className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(16,39,66,0.92),rgba(9,21,37,0.9))] p-6 shadow-glow md:p-10">
      <div className="mb-8 flex items-start gap-4">
        <div className="relative hidden h-72 w-1 rounded-full bg-white/10 md:block">
          <div className="sales-progress absolute inset-x-0 top-0 h-full origin-top rounded-full bg-gradient-to-b from-mint via-amber to-mint"></div>
        </div>
        <div className="max-w-xl">
          <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-mint">Why it sells</p>
          <h3 className="mt-4 font-display text-3xl leading-none tracking-[-0.04em] text-cloud md:text-5xl">
            Show the difference between manual work and a faster routine.
          </h3>
          <p className="mt-4 text-base leading-7 text-mist md:text-lg">
            In a few scrolls, the section makes the problem clear and shows how the product helps hotels and hostels in Thailand save time every day.
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-slate-950/30 p-3 md:p-4">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-[#102742] to-transparent"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-[#091525] to-transparent"></div>

        <div className="relative h-[430px] overflow-hidden md:h-[460px]">
          <div className="sales-track flex flex-col gap-4">
            {cards.map((card) => (
              <article
                key={card.step}
                className="sales-card min-h-[398px] rounded-[1.8rem] border border-white/10 bg-white/10 p-6 backdrop-blur md:min-h-[428px] md:p-8"
              >
                <div className="mb-6 inline-flex rounded-2xl bg-mint/10 px-4 py-2 font-display text-sm font-bold text-mint">
                  {card.step}
                </div>
                <h4 className="max-w-2xl font-display text-2xl leading-tight tracking-[-0.03em] text-cloud md:text-4xl">
                  {card.title}
                </h4>
                <p className="mt-4 max-w-2xl text-base leading-7 text-mist md:text-lg">{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
