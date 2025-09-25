import React from "react";
import { Link } from "react-router-dom";
import {Container, Logo} from '../index'

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-6 md:py-10 bg-white border-t border-zinc-200">
      <Container>
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          {/* Left Side: Logo and Copyright */}
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <div className="mb-4 inline-block">
              <Logo width="120px" />
            </div>
            <p className="text-sm text-zinc-600">
              &copy; {year} MegaBlog. All rights reserved.
            </p>
          </div>

          {/* Right Side: Links */}
          <div className="flex flex-wrap justify-center md:justify-end gap-x-12 gap-y-8 text-center md:text-left">
            <div>
              <h3 className="font-semibold text-zinc-900 mb-4">Company</h3>
              <ul>
                <li className="mb-2">
                  <Link
                    to="/"
                    className="text-zinc-600 hover:text-zinc-900 transition"
                  >
                    Features
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/"
                    className="text-zinc-600 hover:text-zinc-900 transition"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 mb-4">Support</h3>
              <ul>
                <li className="mb-2">
                  <Link
                    to="/"
                    className="text-zinc-600 hover:text-zinc-900 transition"
                  >
                    Help
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/"
                    className="text-zinc-600 hover:text-zinc-900 transition"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 mb-4">Legals</h3>
              <ul>
                <li className="mb-2">
                  <Link
                    to="/"
                    className="text-zinc-600 hover:text-zinc-900 transition"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/"
                    className="text-zinc-600 hover:text-zinc-900 transition"
                  >
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
