// File: src/App.tsx (FINAL BUILD-READY VERSION ✅)

import React, { useState } from "react";

// ---------------------------
// 🔹 Core Components
// ---------------------------
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ProductScrollList from "./components/ProductScrollList";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import VideoCarousel from "./components/VideoCarousel";

// ---------------------------
// 🔹 Pages & Modals
// ---------------------------
import SearchPage from "./pages/SearchPage";
import ProductViewPage from "./components/ProductViewPage";
import AllProductsPage from "./pages/AllProductPage";
import AboutUsPage from "./pages/AboutUsPage";
import GenericContentPage from "./pages/GenericContentPage";

// ---------------------------
// 🔹 Other Components
// ---------------------------
import ToastNotification from "./components/ToastNotification";
import SettingsModal from "./components/SettingsModal";
import SocialProofSection from "./components/SocialProofSection";
import CategoryLinks from "./components/CategoryLinks";

// ---------------------------
// 🔹 Type Imports
// ---------------------------
import type {
  Product,
  Review,
  CategoryName,
  Theme,
  Language,
  PolicyContent,
} from "./types/index";

// -------------------------------------------------------------
// ✅ MOCK DATA
// -------------------------------------------------------------
const sampleReviews: Review[] = [
  {
    id: 1,
    user: "Karan S.",
    comment: "Excellent lighting, perfect for festivals!",
    rating: 5,
    date: "2025-10-15",
  },
  {
    id: 2,
    user: "Priya V.",
    comment: "Looks great, but delivery was a bit slow.",
    rating: 4,
    date: "2025-10-10",
  },
];

// ✅ NORMAL PRODUCTS
const baseProducts: Product[] = [
  {
    id: 1,
    title: "Golden Fairy Lights",
    desc: "Warm glow for festivals and bedroom décor.",
    images: ["/assets/img/light1.jpg", "/assets/img/light2.jpg"],
    shortDesc: "Golden glow, 10m length, USB powered.",
    details:
      "Battery-operated golden fairy lights with a warm, enchanting glow.",
    rating: 4.5,
    price: 999,
    reviews: sampleReviews,
    contact: { whatsapp: "+91 9685958831", email: "sales@festivora.com" },
    category: "Fairy",
  },
  {
    id: 2,
    title: "LED Curtain Lights",
    desc: "Gives your space a sparkling backdrop (3m x 3m).",
    images: ["/assets/img/light3.jpg", "/assets/img/light4.jpg"],
    shortDesc: "300 LEDs, 3m x 3m, remote controlled.",
    details: "Starry night effect with IP44 waterproof rating.",
    rating: 4.8,
    price: 1999,
    reviews: sampleReviews,
    contact: { whatsapp: "+91 9685958831", email: "support@festivora.com" },
    category: "Curtain",
  },
  {
    id: 3,
    title: "Star Moon Lamp",
    desc: "Dreamy star-shaped lights, battery operated.",
    images: ["/assets/img/light5.jpg", "/assets/img/light6.jpg"],
    shortDesc: "20 stars, soft white, battery box.",
    details: "Beautiful star-shaped lamps for any room.",
    rating: 4.2,
    price: 799,
    reviews: [],
    contact: { whatsapp: "+91 9685958831", email: "info@festivora.com" },
    category: "Moon",
  },
  {
    id: 4,
    title: "Outdoor Patio Lights",
    desc: "Durable for outdoor garden and patio use.",
    images: ["/assets/img/light7.jpg", "/assets/img/light8.jpg"],
    shortDesc: "15m heavy-duty cable, warm white.",
    details: "Professional waterproof outdoor lights.",
    rating: 4.9,
    price: 2499,
    reviews: sampleReviews,
    contact: { whatsapp: "+91 9685958831", email: "outdoor@festivora.com" },
    category: "Outdoor",
  },
];

// ✅ VIDEO PRODUCTS
const videoProducts: Product[] = [
  {
    id: 101,
    title: "Festivora Diwali Light Show",
    desc: "Watch our best-selling products in action!",
    shortDesc: "Diwali Lighting Demo",
    images: ["/assets/img/light1.jpg"],
    details: "See how our lights transform your room.",
    rating: 5,
    price: 0,
    reviews: [],
    contact: { whatsapp: "+91 9685958831", email: "info@festivora.com" },
    category: "Video",
    videoUrl: "/assets/videos/diwali-demo.mp4",
    posterUrl: "/assets/img/light1.jpg",
  },
  {
    id: 102,
    title: "LED Curtain Installation",
    desc: "Learn how to install LED curtain lights easily.",
    shortDesc: "Curtain Setup Tutorial",
    images: ["/assets/img/light2.jpg"],
    details: "Step-by-step installation guide.",
    rating: 5,
    price: 0,
    reviews: [],
    contact: { whatsapp: "+91 9685958831", email: "support@festivora.com" },
    category: "Video",
    videoUrl: "/assets/videos/curtain-demo.mp4",
    posterUrl: "/assets/img/light2.jpg",
  },
];

// ✅ FINAL PRODUCT LIST
const allProducts: Product[] = [...baseProducts];
const videoCarouselProducts: Product[] = [...videoProducts];

// ✅ POLICY CONTENT
const PolicyContentData: Record<string, PolicyContent> = {
  privacy: {
    title: "Privacy Policy",
    content: `<p>We follow data protection compliance.</p>`,
  },
  terms: {
    title: "Terms of Service",
    content: `<p>By using our service, you accept all terms.</p>`,
  },
  shipping: {
    title: "Shipping & Returns",
    content: `<p>Delivery time is 5–7 days. Easy returns.</p>`,
  },
  warranty: {
    title: "Warranty",
    content: `<p>All products include 6 months warranty.</p>`,
  },
};

// -------------------------------------------------------------
// ✅ MAIN APP COMPONENT
// -------------------------------------------------------------
const App: React.FC = () => {
  const [products] = useState<Product[]>(allProducts);

  const [currentSearch, setCurrentSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartCount, setCartCount] = useState(0);

  const [toastMessage, setToastMessage] = useState<{
    productName: string;
    visible: boolean;
  } | null>(null);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<Theme>("light");
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en");

  const [viewingAllProducts, setViewingAllProducts] = useState(false);
  const [viewingAboutUs, setViewingAboutUs] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryName | "All">("All");

  const [viewingGenericPage, setViewingGenericPage] = useState(false);
  const [genericPageData, setGenericPageData] =
    useState<PolicyContent | null>(null);

  // ✅ Reset View Handler
  const resetViews = () => {
    setCurrentSearch("");
    setViewingAllProducts(false);
    setViewingAboutUs(false);
    setViewingGenericPage(false);
    setSelectedProduct(null);
  };

  // ✅ Theme Change Handler
  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  };

  // ✅ Search Handler
  const handleSearch = (q: string) => {
    resetViews();
    setCurrentSearch(q.trim());
  };

  // ✅ View Product Handler
  const handleViewProduct = (p: Product) => {
    setSelectedProduct(p);
    document.body.style.overflow = "hidden";
  };

  const handleCloseView = () => {
    setSelectedProduct(null);
    document.body.style.overflow = "auto";
  };

  // ✅ Add To Cart Handler
  const handleAddToCart = (p: Product) => {
    setCartCount((c) => c + 1);
    setToastMessage({ productName: p.title, visible: true });
    setTimeout(() => setToastMessage(null), 3000);
  };

  // ✅ Category Handler
  const handleViewCategory = (cat: CategoryName | "All") => {
    resetViews();
    setSelectedCategory(cat);
    setViewingAllProducts(true);
  };

  const handleViewAllProducts = () => handleViewCategory("All");

  const handleViewAboutUs = () => {
    resetViews();
    setViewingAboutUs(true);
  };

  const handleViewPolicy = (key: string) => {
    resetViews();
    setGenericPageData(PolicyContentData[key]);
    setViewingGenericPage(true);
  };

  // ✅ Filtered Search
  const searchResults = products.filter(
    (p) =>
      p.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
      p.desc.toLowerCase().includes(currentSearch.toLowerCase())
  );

  const isSearching = currentSearch.length > 0;

  // -------------------------------------------------------------
  // ✅ CONTENT SWITCHER
  // -------------------------------------------------------------
  let content: React.ReactNode;

  if (viewingGenericPage && genericPageData) {
    content = (
      <GenericContentPage
        title={genericPageData.title}
        content={genericPageData.content}
        onGoHome={resetViews}
      />
    );
  } else if (viewingAboutUs) {
    content = <AboutUsPage onGoHome={resetViews} />;
  } else if (viewingAllProducts) {
    content = (
     <AllProductsPage
    products={
      selectedCategory === "All"
        ? products
        : products.filter((p) => p.category === selectedCategory)
    }
    onViewProduct={handleViewProduct}
    onAddToCart={handleAddToCart}
    onGoHome={handleGoHome}
/>

    );
  } else if (isSearching) {
    content = (
      <SearchPage
        searchQuery={currentSearch}
        searchResults={searchResults}
        relatedProducts={products}
        onViewProduct={handleViewProduct}
      />
    );
  } else {
    content = (
      <>
        <HeroSection />

        <div className="py-8">
          <CategoryLinks onCategoryClick={handleViewCategory} />
        </div>

        <VideoCarousel
          products={videoCarouselProducts}
          onViewVideo={handleViewProduct}
        />

        <div className="py-16">
          <ProductScrollList
            title="Featured Lighting Collection"
            products={products.slice(0, 8)}
            onViewProduct={handleViewProduct}
          />
        </div>

        <div className="py-16 bg-white dark:bg-gray-800">
          <SocialProofSection reviews={sampleReviews} />
        </div>
      </>
    );
  }

  // -------------------------------------------------------------
  // ✅ RETURN UI
  // -------------------------------------------------------------
  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        currentTheme === "dark"
          ? "dark bg-gray-900 text-gray-200"
          : "bg-gray-50 text-gray-800"
      }`}
    >
      <Navbar
        onSearch={handleSearch}
        cartCount={cartCount}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onViewAllProducts={handleViewAllProducts}
        onGoHome={resetViews}
        onViewAboutUs={handleViewAboutUs}
      />

      <main>
        {content}

        {!(
          viewingAboutUs ||
          selectedProduct ||
          viewingGenericPage ||
          viewingAllProducts
        ) && (
          <>
            <AboutSection />
            <ContactSection />
          </>
        )}
      </main>

      <Footer
        onViewAllProducts={handleViewAllProducts}
        onViewAboutUs={handleViewAboutUs}
        onGoHome={resetViews}
        onViewPolicy={handleViewPolicy}
      />

      {/* ✅ Product Modal */}
      {selectedProduct && (
        <ProductViewPage
          product={selectedProduct}
          onClose={handleCloseView}
          onAddToCart={handleAddToCart}
          allProducts={products}
          onViewProduct={handleViewProduct}
        />
      )}

      {/* ✅ Settings Modal */}
      {isSettingsOpen && (
        <SettingsModal
          onClose={() => setIsSettingsOpen(false)}
          currentTheme={currentTheme}
          onThemeChange={handleThemeChange}
          currentLanguage={currentLanguage}
          onLanguageChange={setCurrentLanguage}
        />
      )}

      {/* ✅ Toast Notification */}
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
function handleGoHome(): void {
  throw new Error("Function not implemented.");
}

