export function ContactSection() {
  return (
    <section className="bg-white pt-28 sm:pt-36 pb-16 sm:pb-24">
      {/* Decorative top bar */}
      {/* <div className="h-2 w-4/5 sm:w-3/5 bg-blue-600 mx-auto mb-12" /> */}

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Intro Row */}
        <div className="grid grid-cols-12 gap-6 sm:gap-10 items-stretch mb-12 sm:mb-16">
          <div className="col-span-12 sm:col-span-3 flex items-center">
            <div className="text-left tracking-wide" style={{
              fontFamily: 'Arial, sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(1.25rem, 1.6vw, 1.75rem)',
              letterSpacing: '0.08em'
            }}>
              CONTACT
            </div>
          </div>
          <div className="col-span-12 sm:col-span-9" style={{ fontFamily: 'Graphik, -apple-system, BlinkMacSystemFont, sans-serif' }}>
            <p className="leading-relaxed text-[#292929]" style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.125rem)'
            }}>
              We don’t just draw walls — we choreograph light. From our studio in Hyderabad, we design villas, second homes, retreats, resorts, and experimental spaces that feel remembered, even when they’re new. Tell us the story of the land, and we’ll help shape what comes next.
            </p>
          </div>
        </div>

        <div className="w-full h-px bg-black mb-8 sm:mb-10" />

        {/* Address and Social Row */}
        <div className="grid grid-cols-12 gap-6 sm:gap-10 items-start mb-6">
          {/* Social */}
          <div className="col-span-12 sm:col-span-3 flex items-end gap-4 h-full">
          <a
            href="https://instagram.com/one_blue_dot_studio"
            target="_blank"
            rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 inline-flex items-center justify-center text-white hover:opacity-80 transition"
              style={{ backgroundColor: 'rgb(4, 0, 255)' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/one-blue-dot-studio"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 inline-flex items-center justify-center text-white hover:opacity-80 transition"
              style={{ backgroundColor: 'rgb(4, 0, 255)' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4v16h-4zM8.5 8h3.8v2.16h.05c.53-1 1.82-2.16 3.76-2.16 4.02 0 4.76 2.65 4.76 6.1V24h-4v-7.6c0-1.81-.03-4.14-2.5-4.14-2.5 0-2.88 1.95-2.88 3.98V24h-4V8z"/>
              </svg>
            </a>
          </div>

          {/* Address */}
          <div className="col-span-12 sm:col-span-7" style={{ fontFamily: 'Graphik, -apple-system, BlinkMacSystemFont, sans-serif' }}>
            <div className="space-y-2">
              <div className="text-gray-900" style={{ fontWeight: 500 }}>Hyderabad</div>
              <div className="leading-relaxed text-[#292929]" style={{
                fontSize: 'clamp(0.9rem, 2.5vw, 1rem)'
              }}>
                Pearl Village, CMC enclave,<br />
                Hyderabad, Telangana 500084
              </div>
            </div>
          </div>

          {/* Blue dot marker */}
          <div className="col-span-12 sm:col-span-2 flex sm:justify-start">
            <div className="w-3 h-3 rounded-full mt-2" style={{ backgroundColor: 'rgb(4, 0, 255)' }} />
          </div>
        </div>

        {/* Links row */}
        <div className="grid grid-cols-12 gap-6 sm:gap-10 mb-10" style={{ fontFamily: 'Graphik, -apple-system, BlinkMacSystemFont, sans-serif' }}>
          <div className="col-span-12 sm:col-span-3" />
          <div className="col-span-12 sm:col-span-9 flex flex-wrap gap-x-6 gap-y-3 text-[#292929]" style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1rem)' }}>
            <a className="hover:underline" style={{ color: 'rgb(4, 0, 255)' }} href="https://www.google.com/maps/search/?api=1&query=Pearl+Village,+CMC+enclave,+Hyderabad,+Telangana+500084" target="_blank" rel="noopener noreferrer">View Map</a>
            <a className="hover:underline" style={{ color: 'rgb(4, 0, 255)' }} href="mailto:hello@onebluedot.in">Get in touch</a>
            <a className="hover:underline" style={{ color: 'rgb(4, 0, 255)' }} href="mailto:studio@onebluedot.in">Work with us</a>
          </div>
        </div>

        <div className="w-full h-px bg-black mb-10 sm:mb-12" />

        {/* Join the Dot */}
        <div className="mb-8 sm:mb-10">
          <div className="text-left tracking-wide mb-6 md:mb-8" style={{
            fontFamily: 'Arial, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
            letterSpacing: '0.08em'
          }}>JOIN THE DOT</div>
          <p className="leading-relaxed text-[#292929] max-w-4xl" style={{
            fontFamily: 'Graphik, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: 'clamp(1rem, 2.5vw, 1.125rem)'
          }}>
            At One Blue Dot, collaboration is more than a process — it’s our culture. We work across disciplines, blending architecture, art, and landscape to create spaces that push boundaries. Our teams are dynamic and deeply involved from concept to completion, giving every voice a place in shaping spaces that matter. Here, ideas are explored, experiments are encouraged, and personal growth is part of the journey.
          </p>
        </div>

        {/* Image placeholder */}
        <div className="w-full bg-gray-400 aspect-[16/9] sm:aspect-[3/1] flex items-center justify-center mb-12">
          <span className="tracking-wide text-white" style={{ letterSpacing: '0.15em', fontFamily: 'Graphik, -apple-system, BlinkMacSystemFont, sans-serif' }}>IMAGE</span>
        </div>

        
      </div>
    </section>
  );
}