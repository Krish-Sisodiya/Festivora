// File: src/components/ProductViewPage.tsx (✨ Mobile Perfected Version)
import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Star,
  ShoppingCart,
  Zap,
  Clock,
  Share2,
  Mail,
  MessageCircle,
  Phone,
  List,
  Package,
} from "lucide-react";
import type { Product } from "../types/index";
import { motion } from "framer-motion";

// 🔹 Helper: Get related products (No change here)
const getRelatedProducts = (currentProduct: Product, allProducts: Product[]): Product[] => {
  return allProducts
    .filter((p) => p.id !== currentProduct.id && p.category === currentProduct.category)
    .slice(0, 6);
};

// 🔹 Mock Specs (No change here)
const mockSpecifications = (product: Product) => [
  { label: "Color", value: product.title.includes("Golden") ? "Warm Yellow" : "Cool White" },
  { label: "Length/Size", value: product.shortDesc.includes("10m") ? "10 Meters" : "3x3 Meters" },
  { label: "Power Source", value: product.details.includes("battery") ? "Battery Powered" : "USB/Plug-in" },
  { label: "Brand", value: "Festivora Premium" },
  { label: "Waterproof Rating", value: product.details.includes("waterproof") ? "IP65" : "Indoor Use Only" },
  { label: "Features", value: "8 Lighting Modes, Remote Control" },
];

// 🔹 Props (No change here)
interface ProductViewPageProps {
  product: Product;
  allProducts: Product[];
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onViewProduct: (product: Product) => void;
}

const ProductViewPage: React.FC<ProductViewPageProps> = ({
  product,
  allProducts,
  onClose,
  onAddToCart,
  onViewProduct,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (product.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [product.images]);

  const relatedProducts = getRelatedProducts(product, allProducts);
  const specifications = mockSpecifications(product);

  // 💬 Share Options (No change here)
  const handleShareWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `Check out this amazing product: ${product.title} 💡\n[YOUR_PRODUCT_LINK]`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleShareEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    const subject = `Inquiry about ${product.title}`;
    const body = `Hi, I’m interested in ${product.title}. Please share more details.`;
    window.location.href = `mailto:${product.contact.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleRelatedProductView = (p: Product) => {
    if (scrollRef.current) scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    onViewProduct(p);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative bg-white dark:bg-gray-900 w-full max-w-6xl rounded-2xl shadow-[0_0_30px_rgba(255,215,0,0.2)] overflow-hidden"
      >
        {/* ❌ Close Button - Mobile Optimization */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 /* Tighter spacing on mobile */
                     bg-white dark:bg-gray-800 p-2 sm:p-3 rounded-full shadow-lg 
                     hover:bg-yellow-100 dark:hover:bg-yellow-600/20 transition z-10" /* Ensure button is on top */
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300" /> {/* Slightly larger icon on desktop */}
        </button>

        {/* 🔆 Content */}
        <div ref={scrollRef} className="p-4 sm:p-6 md:p-10 overflow-y-auto max-h-[90vh]"> {/* Reduced mobile padding to p-4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"> {/* Changed lg:grid-cols-2 to md:grid-cols-2 */}
            {/* 🖼️ Image Carousel */}
            <div>
              <motion.img
                key={currentImageIndex}
                src={product.images[currentImageIndex]}
                alt={product.title}
                className="rounded-xl shadow-xl w-full aspect-[4/3] object-cover"
                initial={{ opacity: 0.6 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              />

              {/* 🔘 Thumbnail Selector */}
              {product.images.length > 1 && (
                <div className="flex space-x-2 mt-4 justify-center overflow-x-auto pb-2">
                  {product.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="thumb"
                      onClick={() => setCurrentImageIndex(i)}
                      className={`w-14 h-14 sm:w-16 sm:h-16 /* Smaller thumbnails on mobile */ object-cover rounded-lg border-2 cursor-pointer transition-all ${
                        i === currentImageIndex
                          ? "border-yellow-500 shadow-md"
                          : "border-gray-300 hover:border-yellow-400"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* 📄 Product Details */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-2"> {/* Responsive heading size */}
                {product.title}
              </h1>
              <p className="text-base sm:text-lg text-yellow-700 dark:text-yellow-400 font-semibold mb-3"> {/* Responsive shortDesc size */}
                {product.shortDesc}
              </p>

              {/* ⭐ Rating */}
              <div className="flex items-center mb-5">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 fill-yellow-500 mr-1" /> {/* Responsive icon size */}
                <span className="text-lg sm:text-xl font-semibold text-yellow-600">5.0</span> {/* Responsive text size */}
                <span className="ml-2 text-sm sm:text-base text-gray-500 dark:text-gray-400">Customer Rating</span> {/* Responsive text size */}
              </div>

              {/* 📜 Description */}
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed"> {/* Responsive text size */}
                {product.details}
              </p>

              {/* 🧾 Specifications */}
              <div className="p-4 sm:p-5 bg-yellow-50 dark:bg-gray-800 rounded-xl border border-yellow-100 dark:border-gray-700 mb-8"> {/* Reduced mobile padding */}
                <h2 className="text-lg sm:text-xl font-bold text-yellow-800 dark:text-yellow-400 mb-4 flex items-center">
                  <List className="w-5 h-5 mr-2" /> Specifications
                </h2>
                <ul className="space-y-2 text-sm">
                  {specifications.map((spec, i) => (
                    <li
                      key={i}
                      className="flex justify-between text-gray-800 dark:text-gray-300 border-b border-gray-100 dark:border-gray-700 pb-1"
                    >
                      <span className="font-semibold">{spec.label}</span>
                      <span className="ml-4 text-right">{spec.value}</span> {/* Added text-right for better mobile wrapping */}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 🛒 Actions */}
              <div className="space-y-3 sm:space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4"> {/* Reduced mobile spacing */}
                <button
                  onClick={() => onAddToCart(product)}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold py-3 sm:py-4 rounded-lg shadow-lg hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all active:scale-[0.98] flex items-center justify-center text-base sm:text-lg" /* Responsive padding/text size */
                >
                  <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 mr-3" /> Add to Enquiry Cart
                </button>

                {/* 🏬 Quick Buy - Mobile Optimization */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3"> {/* Tighter mobile gap */}
                  <a
                    href={`https://www.blinkit.com/search?q=${encodeURIComponent(product.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-1/2 bg-yellow-600 text-white py-2.5 sm:py-3 rounded-lg text-sm font-semibold hover:bg-yellow-700 flex items-center justify-center gap-2 shadow" /* Tighter mobile padding */
                  >
                    <Zap className="w-4 h-4" /> Buy on Blinkit
                  </a>
                  <a
                    href={`https://www.zeptonow.com/search?query=${encodeURIComponent(product.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-1/2 bg-amber-700 text-white py-2.5 sm:py-3 rounded-lg text-sm font-semibold hover:bg-amber-800 flex items-center justify-center gap-2 shadow" /* Tighter mobile padding */
                  >
                    <Clock className="w-4 h-4" /> Buy on Zepto
                  </a>
                </div>

                {/* 📞 Contact Buttons - Mobile Optimization */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3"> {/* Tighter mobile gap */}
                  <a
                    href={`tel:${product.contact.whatsapp}`}
                    className="w-full sm:w-1/2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 sm:py-3 rounded-lg shadow flex items-center justify-center gap-2" /* Tighter mobile padding */
                  >
                    <Phone className="w-5 h-5" /> Call / WhatsApp
                  </a>
                  <button
                    onClick={handleShareEmail}
                    className="w-full sm:w-1/2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 sm:py-3 rounded-lg shadow flex items-center justify-center gap-2" /* Tighter mobile padding */
                  >
                    <Mail className="w-5 h-5" /> Email Enquiry
                  </button>
                </div>

                {/* 🔗 Share */}
                <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center gap-3 text-sm border border-gray-100 dark:border-gray-700">
                  <Share2 className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  <span className="text-gray-800 dark:text-gray-200 font-medium">Share Product:</span>
                  <button onClick={handleShareWhatsApp} className="text-green-600 hover:text-green-700">
                    <MessageCircle className="w-6 h-6" />
                  </button>
                </div>

                <div className="text-center text-gray-500 dark:text-gray-400 text-xs sm:text-sm pt-3 flex justify-center items-center"> {/* Smaller text on mobile */}
                  <Package className="w-4 h-4 mr-2" /> Dispatch in 24–48 Hours
                </div>
              </div>
            </div>
          </div>

          {/* 🔄 Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-10 sm:mt-14 border-t border-gray-200 dark:border-gray-700 pt-6 sm:pt-8"> {/* Adjusted spacing */}
              <h2 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6 text-yellow-700 dark:text-yellow-400 border-b-2 border-yellow-400 inline-block pb-1">
                Similar Products
              </h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-5"> {/* Changed grid-cols-2 to grid-cols-3 for better mobile density */}
                {relatedProducts.map((p) => (
                  <motion.div
                    key={p.id}
                    onClick={() => handleRelatedProductView(p)}
                    whileHover={{ scale: 1.04 }}
                    className="cursor-pointer bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-2 sm:p-3 rounded-xl shadow-md hover:shadow-[0_0_15px_rgba(255,215,0,0.3)] transition" /* Reduced mobile padding */
                  >
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="rounded-lg w-full h-20 sm:h-28 object-cover mb-2" /* Reduced mobile image height */
                    />
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
                      {p.title}
                    </h4>
                    <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 truncate"> {/* Smaller font size for subtext */}
                      {p.shortDesc}
                    </p>
                    <p className="text-xs font-bold text-yellow-600 dark:text-yellow-400 mt-1">
                      View →
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductViewPage;