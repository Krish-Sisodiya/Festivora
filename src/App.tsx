// File: src/App.tsx (⚡ Festivora Prime Build — Final Error-Free Edition ✅)

import React, { useState, useEffect, useMemo } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchPage from "./pages/SearchPage";
import ProductViewPage from "./components/ProductViewPage";
import AllProductsPage from "./pages/AllProductsPage"; // ✅ corrected typo: AllProductPage → AllProductsPage
import AboutUsPage from "./pages/AboutUsPage";
import GenericContentPage from "./pages/GenericContentPage";
import SettingsModal from "./components/SettingsModal";
import ToastNotification from "./components/ToastNotification";
import HomePage from "./pages/HomePage";

import { baseProducts, sampleReviews } from "./data/products"; // ✅ corrected filename: Product → products
import type {
  Product,
  CategoryName,
  Theme,
  Language,
  PolicyContent,
} from "./types/index";

// 🔒 Centralized Policy Data
const PolicyContentData: Record<string, PolicyContent> = {
  privacy: {
    title: "Privacy Policy",
    content:
      "<p>We follow strict data protection and privacy standards to safeguard user information.</p>",
  },
  terms: {
    title: "Terms of Service",
    content:
      "<p>By using Festivora, you agree to comply with our terms and conditions outlined here.</p>",
  },
  shipping: {
    title: "Shipping & Returns",
    content:
      "<p>Standard delivery time is 5–7 days. Returns accepted within 7 days of delivery.</p>",
  },
  warranty: {
    title: "Warranty Information",
    content:
      "<p>All our lighting products include a 6-month limited warranty against manufacturing defects.</p>",
  },
};

const App: React.FC = () => {
  // --- STATES ---
  const [products] = useState<Product[]>(baseProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [toastMessage, setToastMessage] = useState<{
    productName: string;
    visible: boolean;
  } | null>(null);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");
  const [language, setLanguage] = useState<Language>("en");

  const [pageState, setPageState] = useState<{
    view: "home" | "allProducts" | "about" | "policy" | "search";
    category?: CategoryName | "All";
    policyKey?: keyof typeof PolicyContentData;
  }>({ view: "home" });

  // --- EFFECT: Theme Sync ---
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // --- Derived Search Results ---
  const searchResults = useMemo(
    () =>
      products.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.desc.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [products, searchQuery]
  );

  // --- HANDLERS ---
  const handleResetView = () => {
    setSearchQuery("");
    setSelectedProduct(null);
    setPageState({ view: "home" });
  };

  const handleSearch = (q: string) => {
    const query = q.trim();
    if (!query) return handleResetView();
    setSearchQuery(query);
    setPageState({ view: "search" });
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    document.body.style.overflow = "hidden";
  };

  const handleCloseProductView = () => {
    setSelectedProduct(null);
    document.body.style.overflow = "auto";
  };

  const handleAddToCart = (product: Product) => {
    setCartCount((c) => c + 1);
    setToastMessage({ productName: product.title, visible: true });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleViewCategory = (category: CategoryName | "All") => {
    setPageState({ view: "allProducts", category });
  };

  const handleViewPolicy = (key: keyof typeof PolicyContentData) => {
    setPageState({ view: "policy", policyKey: key });
  };

  // --- PAGE RENDER LOGIC ---
  let content: React.ReactNode;

  switch (pageState.view) {
    case "policy": {
      const policy =
        PolicyContentData[pageState.policyKey || "privacy"];
      content = (
        <GenericContentPage
          title={policy.title}
          content={policy.content}
          onGoHome={handleResetView}
        />
      );
      break;
    }

    case "about":
      content = <AboutUsPage onGoHome={handleResetView} />;
      break;

    case "allProducts": {
      const filteredProducts =
        pageState.category === "All" || !pageState.category
          ? products
          : products.filter((p) => p.category === pageState.category);
      content = (
        <AllProductsPage
          products={filteredProducts}
          onViewProduct={handleViewProduct}
          onAddToCart={handleAddToCart}
          onGoHome={handleResetView}
        />
      );
      break;
    }

    case "search":
      content = (
        <SearchPage
          searchQuery={searchQuery}
          searchResults={searchResults}
          relatedProducts={products}
          onViewProduct={handleViewProduct}
        />
      );
      break;

    default:
      content = (
        <HomePage
          products={products}
          reviews={sampleReviews}
          onViewProduct={handleViewProduct}
          onViewCategory={handleViewCategory}
        />
      );
  }

  // --- MAIN RETURN ---
  return (
    <div
      className={`${
        theme === "dark"
          ? "dark bg-gray-900 text-gray-100"
          : "bg-gray-50 text-gray-800"
      } min-h-screen transition-all duration-500`}
    >
      {/* 🟡 Navbar */}
      <Navbar
        onSearch={handleSearch}
        cartCount={cartCount}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onViewAllProducts={() =>
          setPageState({ view: "allProducts", category: "All" })
        }
        onGoHome={handleResetView}
        onViewAboutUs={() => setPageState({ view: "about" })}
      />

      {/* 🔆 Main Content */}
      <main>{content}</main>

      {/* 🌙 Footer */}
      <Footer
        onViewAllProducts={() =>
          setPageState({ view: "allProducts", category: "All" })
        }
        onViewAboutUs={() => setPageState({ view: "about" })}
        onGoHome={handleResetView}
        onViewPolicy={handleViewPolicy}
      />

      {/* 🔍 Product Modal */}
      {selectedProduct && (
        <ProductViewPage
          product={selectedProduct}
          onClose={handleCloseProductView}
          onAddToCart={handleAddToCart}
          allProducts={products}
          onViewProduct={handleViewProduct}
        />
      )}

      {/* ⚙️ Settings Modal */}
      {isSettingsOpen && (
        <SettingsModal
          onClose={() => setIsSettingsOpen(false)}
          currentTheme={theme}
          onThemeChange={setTheme}
          currentLanguage={language}
          onLanguageChange={setLanguage}
        />
      )}

      {/* 🛒 Toast Notification */}
      {toastMessage?.visible && (
        <ToastNotification
          productName={toastMessage.productName}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
};

export default App;
