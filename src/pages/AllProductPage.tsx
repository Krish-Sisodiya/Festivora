// File: src/components/AllProductsPage.tsx (FINAL CLEAN & PROFESSIONAL VERSION)
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
import type { Product } from "../types/index"; // ✅ Unified Product type from main types file

interface AllProductsPageProps {
  products: Product[];
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onGoHome: () => void;
}

type SortOption =
  | "default"
  | "title_asc"
  | "title_desc"
  | "rating_desc"
  | "rating_asc";

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

  const categories = [
    "All",
    "Fairy Lights",
    "Curtain Lights",
    "Outdoor",
    "Star",
  ];

  // ✅ Filtering + Sorting Logic (Memoized)
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
        currentProducts = [...currentProducts].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;
      case "title_desc":
        currentProducts = [...currentProducts].sort((a, b) =>
          b.title.localeCompare(a.title)
        );
        break;
      case "rating_desc":
        currentProducts = [...currentProducts].sort(
          (a, b) => b.rating - a.rating
        );
        break;
      case "rating_asc":
        currentProducts = [...currentProducts].sort(
          (a, b) => a.rating - b.rating
        );
        break;
      default:
        break;
    }

    return currentProducts;
  }, [products, searchTerm, selectedCategory, sortOption]);

  // ✅ Product Card Component
  const ProductCard: React.FC<{ product: Product; isList: boolean }> = ({
    product,
    isList,
  }) => (
    <div
      onClick={() => onViewProduct(product)}
      className={`bg-white border border-gray-100 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.99] overflow-hidden cursor-pointer ${
        isList ? "flex flex-row space-x-4 p-4" : "flex flex-col"
      }`}
    >
      <img
        src={product.images[0]}
        alt={product.title}
        className={`object-cover rounded-lg ${
          isList ? "w-32 h-32 flex-shrink-0" : "w-full h-52"
        } transition-opacity duration-300 hover:opacity-90`}
      />

      <div
        className={`flex-grow flex flex-col justify-between ${
          isList ? "py-1" : "p-4"
        }`}
      >
        <div>
          <h3
            className={`font-extrabold text-yellow-800 ${
              isList ? "text-xl" : "text-2xl"
            } mb-1`}
          >
            {product.title}
          </h3>
          <p
            className={`text-gray-500 mb-3 ${
              isList ? "text-sm" : "text-base"
            }`}
          >
            {isList ? product.shortDesc : product.desc}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mt-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="w-full sm:w-auto py-3 px-6 bg-yellow-600 text-white font-bold rounded-lg shadow-md hover:bg-yellow-700 transition-all duration-200 text-sm flex items-center justify-center"
          >
            <ShoppingCart className="w-5 h-5 mr-2" /> Send Enquiry
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewProduct(product);
            }}
            className="w-full sm:w-auto py-3 px-4 bg-gray-100 text-yellow-700 border border-gray-300 font-medium rounded-lg hover:bg-gray-200 transition text-sm"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gray-50 min-h-[100vh]">
      {/* --- Header --- */}
      <header className="mb-10 flex flex-col md:flex-row justify-between items-center border-b pb-4 border-yellow-200">
        <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-800 flex items-center mb-4 md:mb-0">
          <TrendingUp className="w-9 h-9 mr-3 text-yellow-600" /> Explore Our
          Collection
        </h1>
        <button
          onClick={onGoHome}
          className="flex items-center text-gray-600 hover:text-yellow-700 transition font-medium p-2 rounded-lg bg-white shadow-sm hover:shadow-md"
        >
          <Home className="w-5 h-5 mr-1" /> Back to Home
        </button>
      </header>

      {/* --- Filters --- */}
      <div className="sticky top-0 z-30 bg-white p-4 rounded-xl shadow-xl mb-8 border-t-4 border-yellow-500">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Search */}
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 text-base"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category & Sort */}
          <div className="flex space-x-4 w-full md:w-2/3 justify-end">
            {/* Category */}
            <div className="relative w-1/2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-yellow-500 focus:border-yellow-500 font-medium pr-8"
              >
                <option value="All">All Categories</option>
                {categories.slice(1).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>

            {/* Sort */}
            <div className="relative w-1/2">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-yellow-500 focus:border-yellow-500 font-medium pr-8"
              >
                <option value="default">Sort By: Default</option>
                <option value="title_asc">Name: A-Z</option>
                <option value="title_desc">Name: Z-A</option>
                <option value="rating_desc">Rating: High to Low</option>
                <option value="rating_asc">Rating: Low to High</option>
              </select>
              <ArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* --- Product Grid/List --- */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-700 font-semibold text-lg">
          Showing {filteredAndSortedProducts.length} Products
        </p>

        <div className="flex space-x-2 p-1 bg-white border border-gray-200 rounded-lg shadow-inner">
          <button
            onClick={() => setIsGridView(true)}
            className={`p-2 rounded-md transition ${
              isGridView
                ? "bg-yellow-500 text-white shadow-md"
                : "text-gray-500 hover:bg-gray-100"
            }`}
            title="Grid View"
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsGridView(false)}
            className={`p-2 rounded-md transition ${
              !isGridView
                ? "bg-yellow-500 text-white shadow-md"
                : "text-gray-500 hover:bg-gray-100"
            }`}
            title="List View"
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {filteredAndSortedProducts.length > 0 ? (
        <div
          className={
            isGridView
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              : "space-y-6"
          }
        >
          {filteredAndSortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isList={!isGridView}
            />
          ))}
        </div>
      ) : (
        <div className="text-center p-16 bg-white rounded-xl shadow-2xl mt-12 border-2 border-yellow-300">
          <p className="text-3xl font-bold text-gray-800 mb-4">
            No Matches Found!
          </p>
          <p className="text-lg text-gray-600">
            Please clear your filters or try a different search term.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
              setSortOption("default");
            }}
            className="mt-6 bg-yellow-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-yellow-700 transition shadow-lg active:scale-95"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default AllProductsPage;
