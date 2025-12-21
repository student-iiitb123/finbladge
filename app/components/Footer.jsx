import React from "react";
import { groupedMenus } from "../_data/menu";
import LoadingLink from "../components/Loading";
import {
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Get submenus safel
  const insightsMenu =
    groupedMenus.find((m) => m.name === "Insights")?.subMenus || [];

  const companyMenu =
    groupedMenus.find((m) => m.name === "Company")?.subMenus || [];

  // Get only menus that have paths
  const mainLinks = groupedMenus.reduce((acc, menu) => {
    if (menu.path) {
      acc.push({ name: menu.name, path: menu.path });
    }
    return acc;
  }, []);

  // Helper component (JSX version)
  const FooterLinkList = ({ title, links }) => (
    <div>
      <h4 className="font-semibold text-lg mb-4 text-white">{title}</h4>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.name}>
            <LoadingLink
              href={link.path}
              className="text-gray-300 hover:text-white text-sm transition-colors"
            >
              {link.name}
            </LoadingLink>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="bg-primary">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          
          {/* Brand Section */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">
              Finblage
            </h3>
            <p className="text-gray-300 text-sm max-w-xs mb-6">
              Unlocking Financial Clarity. Your trusted source for market
              insights, news, and in-depth analysis.
            </p>

            <div className="flex space-x-4">
              <LoadingLink href="#" className="text-gray-300 hover:text-white">
                <Facebook size={22} />
              </LoadingLink>
              <LoadingLink href="#" className="text-gray-300 hover:text-white">
                <Twitter size={22} />
              </LoadingLink>
              <LoadingLink href="#" className="text-gray-300 hover:text-white">
                <Linkedin size={22} />
              </LoadingLink>
              <LoadingLink href="#" className="text-gray-300 hover:text-white">
                <Youtube size={22} />
              </LoadingLink>
              <LoadingLink href="#" className="text-gray-300 hover:text-white">
                <Instagram size={22} />
              </LoadingLink>
            </div>
          </div>

          {/* Links */}
          <FooterLinkList title="Explore" links={mainLinks} />
          <FooterLinkList title="Insights" links={insightsMenu} />
          <FooterLinkList title="Company" links={companyMenu} />
        </div>
      </div>

      {/* Sub Footer */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {currentYear} YourLogo. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <LoadingLink href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </LoadingLink>
            <LoadingLink href="/terms-of-service" className="hover:text-white">
              Terms of Service
            </LoadingLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
