// File: src/components/AllProductsPage.tsx (✨ Navbar Overlap Fixed + Premium Version)
import React, { useState, useMemo } from "react";
import {
  Grid,
  List,
  ChevronDown,
  ShoppingCart,
  Search,
  Home,
  X,
  TrendingUp,
  ArrowDown,
} from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "../types/index";

interface AllProductsPageProps {
  products: Product[];
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onGoHome: () => void;
}

type SortOption = "default" | "title_asc" | "title_desc" | "rating_desc" | "rating_asc";

const AllProductsPage: React.FC<AllProductsPageProps> = ({
  products,
  onViewProduct,
  onAddToCart,
  onGoHome,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState<SortOption>("default");
  const [isGridView, setIsGridView] = useState(true);

  const categories = ["All", "Fairy Lights", "Curtain Lights", "Outdoor", "Star"];

  // ✅ Filter + Sort Logic
  const filteredAndSortedProducts = useMemo(() => {
    let currentProducts = products.filter(
      (p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.desc.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedCategory !== "All") {
      const keywordMap: Record<string, string> = {
        "Fairy Lights": "Fairy",
        "Curtain Lights": "Curtain",
        Outdoor: "Outdoor|Patio",
        Star: "Star",
      };
      const keyword = keywordMap[selectedCategory] || selectedCategory;
      const regex = new RegExp(keyword, "i");
      currentProducts = currentProducts.filter(
        (p) => regex.test(p.title) || regex.test(p.shortDesc)
      );
    }

    switch (sortOption) {
      case "title_asc":
        return [...currentProducts].sort((a, b) => a.title.localeCompare(b.title));
      case "title_desc":
        return [...currentProducts].sort((a, b) => b.title.localeCompare(a.title));
      case "rating_desc":
        return [...currentProducts].sort((a, b) => b.rating - a.rating);
      case "rating_asc":
        return [...currentProducts].sort((a, b) => a.rating - b.rating);
      default:
        return currentProducts;
    }
  }, [products, searchTerm, selectedCategory, sortOption]);

  // ✅ Product Card
  const ProductCard: React.FC<{ product: Product; isList: boolean }> = ({
    product,
    isList,
  }) => (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      onClick={() => onViewProduct(product)}
      className={`bg-white dark:bg-gray-900/90 border border-yellow-100 dark:border-gray-700 rounded-xl shadow-lg 
        hover:shadow-[0_0_25px_rgba(255,215,0,0.3)] transition-all duration-300 cursor-pointer overflow-hidden
        ${isList ? "flex flex-row space-x-4 p-4" : "flex flex-col"}`}
    >
      <img
        src={product.images[0]}
        alt={product.title}
        className={`object-cover rounded-lg ${
          isList ? "w-32 h-32 flex-shrink-0" : "w-full h-56"
        } transition-all duration-500 hover:opacity-90`}
      />

      <div className={`flex-grow flex flex-col justify-between ${isList ? "py-1" : "p-4"}`}>
        <div>
          <h3
            className={`font-extrabold bg-gradient-to-r from-yellow-500 to-yellow-700 bg-clip-text text-transparent ${
              isList ? "text-xl" : "text-2xl"
            } mb-1`}
          >
            {product.title}
          </h3>
          <p
            className={`text-gray-500 dark:text-gray-400 ${
              isList ? "text-sm" : "text-base"
            } mb-3`}
          >
            {isList ? product.shortDesc : product.desc}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mt-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="flex items-center justify-center py-3 px-5 w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-yellow-600 
                      text-white font-bold rounded-lg shadow-md hover:shadow-[0_0_20px_rgba(255,215,0,0.5)] active:scale-95"
          >
            <ShoppingCart className="w-5 h-5 mr-2" /> Enquiry
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewProduct(product);
            }}
            className="py-3 px-4 w-full sm:w-auto bg-gray-100 dark:bg-gray-800 text-yellow-700 dark:text-yellow-400 
                      border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-yellow-50 dark:hover:bg-gray-700 transition"
          >
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-10 bg-gradient-to-br from-yellow-50 via-white to-yellow-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-[100vh] transition-colors">
      {/* --- Header --- */}
      <motion.header
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-30 mb-10 flex flex-col md:flex-row justify-between items-center border-b border-yellow-400/50 pb-4 bg-white/70 dark:bg-gray-900/60 backdrop-blur-md rounded-xl shadow-[0_2px_25px_rgba(255,215,0,0.15)]"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent flex items-center mb-4 md:mb-0">
          <TrendingUp className="w-9 h-9 mr-3 text-yellow-600" /> Explore Our Collection
        </h1>
        <button
          onClick={onGoHome}
          className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-200 hover:text-yellow-600 dark:hover:text-yellow-400 px-4 py-2 rounded-lg shadow hover:shadow-md transition"
        >
          <Home className="w-5 h-5" /> Back to Home
        </button>
      </motion.header>

      {/* --- Filters --- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="sticky top-20 z-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg p-5 rounded-xl shadow-lg mb-10 border-l-4 border-yellow-500"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-5">
          {/* Search Bar */}
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by product name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pl-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-yellow-500 outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category & Sort */}
          <div className="flex w-full md:w-2/3 justify-end gap-4">
            {/* Category */}
            <div className="relative w-1/2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 pr-8 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-yellow-500 appearance-none"
              >
                <option value="All">All Categories</option>
                {categories.slice(1).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>

            {/* Sort */}
            <div className="relative w-1/2">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="w-full p-3 pr-8 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-yellow-500 appearance-none"
              >
                <option value="default">Sort By: Default</option>
                <option value="title_asc">Name: A-Z</option>
                <option value="title_desc">Name: Z-A</option>
                <option value="rating_desc">Rating: High to Low</option>
                <option value="rating_asc">Rating: Low to High</option>
              </select>
              <ArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* --- Grid/List Toggle --- */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-700 dark:text-gray-300 font-semibold text-lg">
          Showing {filteredAndSortedProducts.length} Products
        </p>

        <div className="flex gap-2 bg-white dark:bg-gray-800 p-1 border border-gray-200 dark:border-gray-700 rounded-lg shadow-inner">
          <button
            onClick={() => setIsGridView(true)}
            className={`p-2 rounded-md transition ${
              isGridView
                ? "bg-yellow-500 text-white shadow-md"
                : "text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsGridView(false)}
            className={`p-2 rounded-md transition ${
              !isGridView
                ? "bg-yellow-500 text-white shadow-md"
                : "text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* --- Product Grid/List --- */}
      {filteredAndSortedProducts.length > 0 ? (
        <motion.div
          layout
          className={
            isGridView
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              : "space-y-6"
          }
        >
          {filteredAndSortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <ProductCard product={product} isList={!isGridView} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-16 bg-white dark:bg-gray-900 rounded-xl shadow-2xl mt-12 border-2 border-yellow-400"
        >
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3">
            No Matches Found!
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-5">
            Please clear your filters or try a different search term.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
              setSortOption("default");
            }}
            className="bg-yellow-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-yellow-700 transition shadow-lg active:scale-95"
          >
            Clear Filters
          </button>
        </motion.div>
      )}
    </section>
  );
};

export default AllProductsPage;
