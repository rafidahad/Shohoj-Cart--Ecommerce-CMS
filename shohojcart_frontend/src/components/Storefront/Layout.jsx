// src/components/Storefront/Layout.jsx
import { Link, useLocation, useParams } from "react-router-dom";
import { useShop } from "../../context/ShopContext.jsx";

export default function StorefrontLayout({ children }) {
  const { shop } = useShop();
  const { shopSlug } = useParams();
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white text-neutral-900">
      <Header shop={shop} shopSlug={shopSlug} pathname={pathname} />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">{children}</main>
      <Footer shop={shop} />
    </div>
  );
}

function Header({ shop, shopSlug, pathname }) {
  // Fallback to shop?.slug or localStorage if this page has no :shopSlug param (extra safety)
  const currentSlug =
    shopSlug || shop?.slug || localStorage.getItem("shop_slug") || "";

  const active = (href) =>
    pathname === href ? "text-neutral-900" : "text-neutral-500 hover:text-neutral-900";

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/80 bg-white/70 border-b border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to={`/s/${currentSlug}`} className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-2xl bg-neutral-900 text-white grid place-items-center">
            <span className="font-semibold">SC</span>
          </div>
          <div className="font-semibold text-lg tracking-tight">
            {shop?.name || "ShohojCart"}
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link className={`text-sm ${active(`/s/${currentSlug}`)}`} to={`/s/${currentSlug}`}>Home</Link>
          <Link className={`text-sm ${active(`/s/${currentSlug}/cart`)}`} to={`/s/${currentSlug}/cart`}>Cart</Link>
          <Link className={`text-sm ${active(`/s/${currentSlug}/checkout`)}`} to={`/s/${currentSlug}/checkout`}>Checkout</Link>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/s/${currentSlug}/cart`}
            className="relative inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium hover:shadow-sm"
          >
            {/* cart icon svg ... */}
            Cart
          </Link>
        </div>
      </div>
    </header>
  );
}

function Footer({ shop }) {
  return (
    <footer className="border-t border-neutral-200 mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid gap-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-neutral-900 text-white grid place-items-center">
              <span className="font-semibold">SC</span>
            </div>
            <div className="font-semibold">{shop?.name || "ShohojCart"}</div>
          </div>
          <p className="text-sm text-neutral-500 mt-3">
            Modern storefront experience—fast, minimal, and delightful.
          </p>
        </div>
        <div className="text-sm text-neutral-500">
          <div className="font-medium text-neutral-800 mb-2">Support</div>
          <ul className="space-y-1.5">
            <li>FAQ</li><li>Shipping & Returns</li><li>Privacy Policy</li>
          </ul>
        </div>
        <div className="text-sm text-neutral-500">
          <div className="font-medium text-neutral-800 mb-2">Contact</div>
          <ul className="space-y-1.5">
            <li>Email: support@shohojcart.local</li>
            <li>Phone: +880-000-000-000</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-neutral-200 py-4 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} ShohojCart. All rights reserved.
      </div>
    </footer>
  );
}
