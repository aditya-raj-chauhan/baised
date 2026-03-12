import React from "react";
import { Facebook, Twitter, Linkedin, Github } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-20 pb-10">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold text-white">Biased</h3>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              Secure, permission-driven file sharing built for modern teams and enterprises.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-lg font-semibold text-white">Product</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="hover:text-white transition">Features</li>
              <li className="hover:text-white transition">Pricing</li>
              <li className="hover:text-white transition">Security</li>
              <li className="hover:text-white transition">Integrations</li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold text-white">Company</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="hover:text-white transition">About Us</li>
              <li className="hover:text-white transition">Careers</li>
              <li className="hover:text-white transition">Blog</li>
              <li className="hover:text-white transition">Contact</li>
            </ul>
          </div>

          {/* Support & Social */}
          <div>
            <h4 className="text-lg font-semibold text-white">Support</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="hover:text-white transition">Help Center</li>
              <li className="hover:text-white transition">Privacy Policy</li>
              <li className="hover:text-white transition">Terms of Service</li>
            </ul>

            <div className="flex gap-4 mt-6">
              <Facebook className="hover:text-white transition cursor-pointer" />
              <Twitter className="hover:text-white transition cursor-pointer" />
              <Linkedin className="hover:text-white transition cursor-pointer" />
              <Github className="hover:text-white transition cursor-pointer" />
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Biased. All rights reserved.
        </div>

      </div>

    </footer>
  );
};

export default FooterSection;
