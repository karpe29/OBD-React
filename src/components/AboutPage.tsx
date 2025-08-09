// New About page built to match the reference layout
import { ImageWithFallback } from './figma/ImageWithFallback';

function SemiCircleLeft() {
  return (
    <div className="relative w-full h-full flex justify-start overflow-hidden">
      <div className="h-full aspect-square rounded-full overflow-hidden translate-x-1/2">
        <ImageWithFallback
          src={`${import.meta.env.BASE_URL}Founder.png`}
          alt="About visual"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

function SemiCircleBottom({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-60 h-60 sm:w-72 sm:h-72 mx-auto lg:mx-0 flex justify-start overflow-hidden">
      <div className="w-60 h-60 sm:w-72 sm:h-72 rounded-full overflow-hidden -translate-x-1/2">
        <ImageWithFallback src={src} alt={alt} className="w-full h-full object-cover translate-x-1/4" />
      </div>
    </div>
  );
}

export function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-[#292929] font-[Graphik,_-apple-system,_BlinkMacSystemFont,_sans-serif]">
      {/* Top intro row */}
      <section className="px-4 sm:px-6 pt-28 pb-10  font-[Arial]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            <div className="md:col-span-2">
              <p className="leading-snug text-[clamp(1.5rem,5vw,3rem)] tracking-tighter">
                <span className="italic text-[rgb(4,0,255)]">“ One Blue Dot</span>{' '}means Crafting bespoke, meaningful spaces as distinctive as the planet itself ”
              </p>
            </div>
            <div className="md:pl-8 md:border-l-2 md:border-[#292929] flex flex-col justify-center h-full">
          <div>
                <p className="leading-6 font-semibold text-[clamp(0.95rem,2.5vw,1.125rem)]">
                  Shweta Arade
                </p>
                <p className="leading-6 mb-3 text-[clamp(0.95rem,2.5vw,1.125rem)]">
                  Principal Architect / Founder
                </p>
                {/* <p className="leading-6 text-[clamp(0.95rem,2.5vw,1.125rem)]">
                  Shweta leads OBD's vision for context–sensitive, art–driven homes. Drawing from work across India and Australia, she balances artistry and practicality, building thoughtful spaces that feel inevitable and belong to their place.
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-b-[#292929] border-b-2 max-w-6xl mx-auto" />

      {/* Principles with semicircle image */}
      <section className="px-4 sm:px-6 py-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <SemiCircleLeft />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 leading-6 text-[clamp(0.95rem,2.5vw,1.125rem)] font-normal">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-[#292929]">WE ARE ONE BLUE DOT</h4>
                <p>We design with intent — to create spaces that endure, inspire, and belong.</p>
              </div>
              <div>
                <h4 className="font-medium text-[#292929]">WE BUILD TOGETHER</h4>
                <p>Collaboration fuels our process — with clients, consultants, and craftsmen.</p>
              </div>
              <div>
                <h4 className="font-medium text-[#292929]">WE DESIGN WITH RIGOUR</h4>
                <p>We question, analyse, and craft solutions that are intelligent, meaningful, and viable.</p>
              </div>
              <div>
                <h4 className="font-medium text-[#292929]">WE TAKE RESPONSIBILITY</h4>
                <p>For our work, our timelines, and the trust placed in us.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-[#292929]">THE IDEA LEADS</h4>
                <p>Every site reveals stories. We listen, explore, and let the strongest ideas shape the work.</p>
              </div>
              <div>
                <h4 className="font-medium text-[#292929]">WE THINK IN VISUALS</h4>
                <p>Drawings, models, and stories bring our clients into the design journey.</p>
              </div>
              <div>
                <h4 className="font-medium text-[#292929]">WE VALUE CONNECTION</h4>
                <p>Clear and honest communication keeps our projects and relationships strong.</p>
              </div>
              <div>
                <h4 className="font-medium text-[#292929]">WE DESIGN FOR THE EARTH</h4>
                <p>Sustainability is not a choice but a foundation we create spaces that respect and restore.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-b-[#292929] border-b-2 max-w-6xl mx-auto" />

      {/* Philosophy */}
      <section className="px-4 sm:px-6 py-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          <div className="space-y-6 leading-6 text-[clamp(0.95rem,2.5vw,1.125rem)] text-[#292929] font-normal">
            <div>
              <p className="italic font-weight-300 text-[#3b3b3b]">Let it Belong</p>
              <p>We don’t chase minimalism. We chase meaning. Every line, every opening, every material must feel inevitable — as if it couldn’t have been otherwise. We pare down until only the essential remains.</p>
            </div>
            <div>
              <p className="italic font-weight-300 text-[#3b3b3b]">Let it Breathe</p>
              <p>Light, air, and time are our primary tools. A home is not a container. It is a condition for quiet, for warmth, for return. We build to create mornings and hold shadows.</p>
            </div>
            <div>
              <p className="italic font-weight-300 text-[#3b3b3b]">Let it Be Open</p>
              <p>We draw from across geographies and cultures, but never impose. We learn from site, from craft, from the wisdom of restraint. We build with hands, not just software.</p>
            </div>
          </div>
          <div className="flex items-center h-full">
            <h1 className="text-right lg:text-left text-[clamp(1.5rem,5vw,3rem)] leading-tight w-full font-normal">PHILOSOPHY</h1>
          </div>
            </div>
      </section>

      <hr className="border-b-[#292929] border-b-2 max-w-6xl mx-auto" />

      {/* Blueprint + founder semicircle */}
      <section className="px-4 sm:px-6 py-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          <div className="flex items-center h-full">
            <h1 className="text-[clamp(1.5rem,5vw,3rem)] font-normal">THE BLUEPRINT</h1>
          </div>
          <div className="leading-7 space-y-4 text-[clamp(0.95rem,2.5vw,1.125rem)]">
            <p>
              One Blue Dot was founded in 2024 with a vision to create boutique, one–of–a–kind spaces that reflect the individuality of their inhabitants. Drawing from over a decade of experience across India and Australia, the practice blends global design sensibilities with local context, crafting spaces that are both luxurious and deeply rooted in place.
            </p>
            <p>
              At OBD, each design is a collaboration, shaped by the site, the climate, and the client’s way of life. The result is a portfolio of spaces that are as unique as the people who inhabit them.
            </p>
            <div className="pt-6">
              <SemiCircleBottom src={`${import.meta.env.BASE_URL}Founder.png`} alt="Founder" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}