export function Footer() {
  return (
    <footer id="contact" className="bg-white">
      <div className="w-full px-4 sm:px-6 py-8 sm:py-16">
        {/* Divider */}
        <div className="w-full h-px bg-black mb-6 sm:mb-8"></div>
        
        {/* Top Section - Navigation & Branding */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8 items-start">
          {/* Left Column - Navigation */}
          <div className="flex flex-col space-y-3 sm:space-y-4 px-3 sm:px-[29px] py-[0px]">
            <button
              onClick={() => (window as any).navigateTo?.('work')}
              className="hover:opacity-70 transition-opacity text-left cursor-pointer py-2 min-h-[44px] flex items-center"
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: "200",
                fontSize: "clamp(0.7em, 2vw, 0.75em)",
                color: "#000000",
                textDecoration: "none",
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                background: "none",
                border: "none",
                padding: "8px 0",
              }}
            >
              PORTFOLIO
            </button>
            <button
              onClick={() => (window as any).navigateTo?.('about')}
              className="hover:opacity-70 transition-opacity text-left cursor-pointer py-2 min-h-[44px] flex items-center"
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: "200",
                fontSize: "clamp(0.7em, 2vw, 0.75em)",
                color: "#000000",
                textDecoration: "none",
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                background: "none",
                border: "none",
                padding: "8px 0",
              }}
            >
              ABOUT
            </button>
            <button
              onClick={() => (window as any).navigateTo?.('contact')}
              className="hover:opacity-70 transition-opacity text-left cursor-pointer py-2 min-h-[44px] flex items-center"
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: "200",
                fontSize: "clamp(0.7em, 2vw, 0.75em)",
                color: "#000000",
                textDecoration: "none",
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                background: "none",
                border: "none",
                padding: "8px 0",
              }}
            >
              CONTACT
            </button>
            <button
              onClick={() => (window as any).navigateTo?.('home')}
              className="hover:opacity-70 transition-opacity text-left cursor-pointer py-2 min-h-[44px] flex items-center"
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: "200",
                fontSize: "clamp(0.7em, 2vw, 0.75em)",
                color: "#000000",
                textDecoration: "none",
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                background: "none",
                border: "none",
                padding: "8px 0",
              }}
            >
              HOME
            </button>
          </div>

          {/* Center Column - Logo */}
          <div className="text-center order-first md:order-none">
            <button
              onClick={() => (window as any).navigateTo?.('home')}
              className="hover:opacity-70 transition-opacity cursor-pointer py-2 min-h-[44px] flex items-center justify-center"
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: "400",
                fontSize: "clamp(0.9em, 3vw, 1em)",
                letterSpacing: "0.25em",
                color: "#000000",
                textTransform: "uppercase",
                background: "none",
                border: "none",
                padding: "8px 0",
                width: "100%"
              }}
            >
              ONE BLUE DOT
            </button>
          </div>

          {/* Right Column - Social Links */}
          <div className="flex flex-col space-y-3 sm:space-y-4 md:items-end px-3 sm:px-[29px] py-[0px]">
            <a
              href="#"
              className="hover:opacity-70 transition-opacity py-2 min-h-[44px] flex items-center"
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: "200",
                fontSize: "clamp(0.7em, 2vw, 0.75em)",
                color: "#000000",
                textDecoration: "none",
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                padding: "8px 0",
              }}
            >
              INSTAGRAM
            </a>
            <a
              href="#"
              className="hover:opacity-70 transition-opacity py-2 min-h-[44px] flex items-center"
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: "200",
                fontSize: "clamp(0.7em, 2vw, 0.75em)",
                color: "#000000",
                textDecoration: "none",
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                padding: "8px 0",
              }}
            >
              FACEBOOK
            </a>
            <a
              href="#"
              className="hover:opacity-70 transition-opacity py-2 min-h-[44px] flex items-center"
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: "200",
                fontSize: "clamp(0.7em, 2vw, 0.75em)",
                color: "#000000",
                textDecoration: "none",
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                padding: "8px 0",
              }}
            >
              LINKEDIN
            </a>
            <a
              href="#"
              className="hover:opacity-70 transition-opacity py-2 min-h-[44px] flex items-center"
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: "200",
                fontSize: "clamp(0.7em, 2vw, 0.75em)",
                color: "#000000",
                textDecoration: "none",
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                padding: "8px 0",
              }}
            >
              YOUTUBE
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-black mb-8"></div>

        {/* Middle Section - CTA & Contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8 items-center">
          {/* Left - Consult Us */}
          <div className="text-center md:text-left">
            <h4
              className="px-3"
              style={{
                fontFamily: '"Nunito Sans", sans-serif',
                fontWeight: "bold",
                fontSize: "clamp(1.1em, 3vw, 1.25em)",
                color: "#000000",
              }}
            >
              Consult Us!
            </h4>
          </div>

          {/* Center - Email Input */}
          <div className="px-3 md:px-0">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-4 py-3 border-b border-b-gray-300 focus:outline-none focus:border-b-blue-500 bg-white"
              style={{
                fontFamily: '"Nunito Sans", sans-serif',
                fontSize: "clamp(0.9em, 2.5vw, 1em)",
                color: "#000000",
              }}
            />
          </div>

          {/* Right - WhatsApp Icon */}
          <div className="flex justify-center md:justify-end px-3">
            <a
              href="https://wa.me/919876543210"
              className="inline-flex items-center justify-center w-12 h-12 sm:w-12 sm:h-12 rounded-full bg-white border border-black hover:bg-gray-50 transition-colors"
              aria-label="WhatsApp"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-black"
              >
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-black mb-6 sm:mb-8"></div>

        {/* Bottom Section - Copyright */}
        <div className="text-center px-3">
          <p
            style={{
              fontFamily: '"Nunito Sans", sans-serif',
              fontWeight: "400",
              fontSize: "clamp(0.8em, 2vw, 0.875em)",
              color: "#666666",
            }}
          >
            ©2025 by One Blue Dot. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}