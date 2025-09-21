// src/pages/Storefront/ShopProduct.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useShop } from "../../context/ShopContext.jsx";
import { api } from "../../lib/api";
import { Header, Footer } from "../../components/Storefront";

export default function ShopProduct() {
  const { shopSlug, productSlug } = useParams();
  const { shop, setBySlug } = useShop();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    (async () => {
      const s = shop?.slug === shopSlug ? shop : await setBySlug(shopSlug);
      const data = await api.get(`/shops/${s.id}/products/${productSlug}`);
      setProduct(data.data ?? data);
    })();
  }, [shopSlug, productSlug]);

  if (!product) return null;

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="mt-2 text-gray-600">{product.description}</p>
        <p className="mt-4 text-xl font-semibold">৳ {Number(product.sell_price).toFixed(2)}</p>
      </main>
      <Footer />
    </>
  );
}
