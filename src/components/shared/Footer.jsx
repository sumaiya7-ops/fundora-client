import { Link } from "react-router-dom";

const Footer = () => {
  const socialStyle =
    "text-[#344054] transition hover:-translate-y-0.5 hover:text-[#008A5A]";

  return (
    <footer className="border-t border-[#E9E7E1] bg-[#FBFAF7]">
      <div className="mx-auto max-w-7xl px-5 pb-6 pt-14 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
          <div className="sm:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#008A5A]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-white"
                  fill="currentColor"
                >
                  <path d="M12 2 3 7v10l9 5 9-5V7l-9-5Zm0 4.2 5.2 2.9-2.3 1.3L12 8.8l-2.9 1.6-2.3-1.3L12 6.2Zm-5 5.2 3 1.7v4.4l-3-1.7v-4.4Zm5 7.2v-4.4l3-1.7v4.4l-3 1.7Z" />
                </svg>
              </div>

              <span className="text-xl font-bold tracking-tight text-[#102A2A]">
                Fundora
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-6 text-[#667085]">
              Fundora is a global crowdfunding platform that empowers creators
              and supporters to build a better world together.
            </p>

            <div className="mt-6 flex items-center gap-4">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className={socialStyle}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M14 8.5V6.7c0-.8.5-1 1-1h2.8V2.2L14.7 2C11.6 2 10 3.9 10 6.4v2.1H7V12h3v10h4V12h3.2l.5-3.5H14Z" />
                </svg>
              </a>

              {/* Twitter */}
              <a
                href="https://x.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                className={socialStyle}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M18.9 2H22l-6.8 7.8L23.2 22H17l-4.9-6.4L6.5 22H3.4l7.2-8.2L.8 2H7l4.4 5.8L18.9 2Zm-1.1 17.9h1.7L6.1 4H4.3l13.5 15.9Z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className={socialStyle}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M6.5 8.5H3V21h3.5V8.5ZM4.75 3A2.05 2.05 0 1 0 4.75 7.1 2.05 2.05 0 0 0 4.75 3ZM21 13.8c0-3.8-2-5.6-4.7-5.6-2.2 0-3.1 1.2-3.7 2V8.5H9.1V21h3.5v-6.2c0-1.6.3-3.2 2.3-3.2s2 1.9 2 3.3V21H21v-7.2Z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className={socialStyle}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/sumaiya7-ops"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className={socialStyle}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.4c.58.1.79-.25.79-.56v-2.02c-3.22.7-3.9-1.37-3.9-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.57-.29-5.27-1.28-5.27-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.47.11-3.05 0 0 .97-.31 3.16 1.18A10.9 10.9 0 0 1 12 6.32c.98 0 1.95.13 2.87.39 2.2-1.49 3.16-1.18 3.16-1.18.63 1.58.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.71 5.38-5.29 5.67.42.36.79 1.07.79 2.16v3.04c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-sm font-semibold text-[#101828]">Platform</h3>

            <div className="mt-5 flex flex-col gap-3 text-sm text-[#667085]">
              <Link to="/explore-campaigns" className="hover:text-[#008A5A]">
                Explore Campaigns
              </Link>

              <Link to="/register" className="hover:text-[#008A5A]">
                Start a Campaign
              </Link>

              <Link to="/" className="hover:text-[#008A5A]">
                How It Works
              </Link>

              <Link to="/" className="hover:text-[#008A5A]">
                Categories
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-[#101828]">Support</h3>

            <div className="mt-5 flex flex-col gap-3 text-sm text-[#667085]">
              <span>Help Center</span>
              <span>Guidelines</span>
              <span>Trust & Safety</span>
              <span>Contact Us</span>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-[#101828]">Company</h3>

            <div className="mt-5 flex flex-col gap-3 text-sm text-[#667085]">
              <span>About Us</span>
              <span>Our Impact</span>
              <span>Blog</span>
              <span>Careers</span>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-[#101828]">Legal</h3>

            <div className="mt-5 flex flex-col gap-3 text-sm text-[#667085]">
              <span>Terms of Service</span>
              <span>Privacy Policy</span>
              <span>Refund Policy</span>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-[#E9E7E1] pt-6 text-center">
          <p className="text-xs text-[#98A2B3]">
            © {new Date().getFullYear()} Fundora. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;