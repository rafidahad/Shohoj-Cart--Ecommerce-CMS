// src/pages/Storefront/ShopHome.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useShop } from "../../context/ShopContext.jsx";
import { api } from "../../lib/api";
import { Header, Footer } from "../../components/Storefront";

export default function ShopHome() {
  const { shopSlug } = useParams();
  const { shop, setBySlug } = useShop();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const s = shop?.slug === shopSlug ? shop : await setBySlug(shopSlug);
      const list = await api.get(`/shops/${s.id}/products`);
      setProducts(list.data ?? list);
    })();
  }, [shopSlug]);

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">{shop?.name ?? "Store"}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {(products.data ?? products).map((p) => (
            <Link
              to={`/s/${shopSlug}/product/${p.slug}`}
              key={p.id}
              className="block rounded-xl border p-4 hover:shadow"
            >
              <div className="font-semibold">{p.name}</div>
              <div className="text-sm text-gray-500">৳ {Number(p.sell_price).toFixed(2)}</div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
