// File: src/App.tsx (FINAL WITH FUNCTIONAL SETTINGS)

import React, { useState } from "react";
// Import all essential components
import Navbar from "./components/Navbar"; 
import HeroSection from "./components/HeroSection"; 
import ProductScrollList from "./components/ProductScrollList"; 
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import VideoCarousel from "./components/VideoCarousel"; 

// New Imports for Pages and Modals
import SearchPage from "./pages/SearchPage"; 
import ProductViewPage from "./components/ProductViewPage"; 

// 💡 NEW FEATURE IMPORTS
import ToastNotification from "./components/ToastNotification";
import SettingsModal from "./components/SettingsModal"; 
import SocialProofSection from "./components/SocialProofSection";
import CategoryLinks from "./components/CategoryLinks";
// ✅ CORE PAGE IMPORTS
import AllProductsPage from "./pages/AllProductPage"; 
import AboutUsPage from "./pages/AboutUsPage"; 

// 🛑 NEW IMPORT for Generic Pages
import GenericContentPage from "./pages/GenericContentPage"; 

// -------------------------------------------------------------
// --- TYPES (Added Theme and Language Types)
// -------------------------------------------------------------
type Review = { id: number, user: string, comment: string, rating: number, date: string };
type ProductContact = { whatsapp: string, email: string };
type CategoryName = 'Fairy' | 'Curtain' | 'Moon' | 'Outdoor' | 'All'; 
type Theme = 'light' | 'dark'; // 💡 NEW TYPE
type Language = 'en' | 'hi'; // 💡 NEW TYPE

type Product = { 
    id: number, 
    title: string, 
    desc: string, 
    images: string[], 
    shortDesc: string,
    details: string,
    rating: number,
    price: number,
    reviews: Review[], 
    contact: ProductContact,
    category: CategoryName,
    videoUrl?: string, 
    posterUrl?: string, 
    productLink?: string 
};


// -------------------------------------------------------------
// --- ASSET PATHS & MOCK DATA SETUP ---
// -------------------------------------------------------------
const AVAILABLE_IMAGES: string[] = [];

for (let i = 1; i <= 8; i++) {
    AVAILABLE_IMAGES.push(`/assets/img/light${i}.jpg`); 
}
for (let i = 1; i <= 8; i++) {
    AVAILABLE_IMAGES.push(`/assets/img/moonlamp${i}.jpg`); 
}
AVAILABLE_IMAGES.push("/assets/img/light.jpg"); 

const VIDEO_PATHS = ["L1.mp4", "L2.mp4", "L3.mp4", "L4.mp4", "L5.mp4", "L6.mp4"].map(
    file => `/assets/vid/${file}`
);

const POSTER_PATHS = [
    "/placeholders/lamp_poster.jpg", 
    "/placeholders/curtain_poster.jpg", 
    "/placeholders/diwali_poster.jpg", 
    "/placeholders/fest_poster.jpg"
];


// --- BASE MOCK DATA --- 
const sampleReviews: Review[] = [
    { id: 101, user: "Karan S.", comment: "Excellent lighting, perfect for festivals!", rating: 5, date: "2025-10-15" },
    { id: 102, user: "Priya V.", comment: "Looks great, but delivery was a bit slow.", rating: 4, date: "2025-10-10" },
];

const originalBaseProducts: Product[] = [
    { id: 1, title: "Golden Fairy Lights", desc: "Warm glow for festivals and bedroom décor.", images: ["/assets/img/light1.jpg", "/assets/img/light2.jpg", "/assets/img/light3.jpg"], shortDesc: "Golden glow, 10m length, USB powered.", details: "These battery-operated golden fairy lights offer a warm, enchanting glow. Features 8 light modes and is highly energy efficient. 10 meter length.", rating: 4.5, price: 999, reviews: sampleReviews, contact: { whatsapp: "+91 96859 58831", email: "sales@festivora.com" }, category: 'Fairy' },
    { id: 2, title: "LED Curtain Lights", desc: "Gives your space a sparkling backdrop (3m x 3m).", images: ["/assets/img/light4.jpg", "/assets/img/light5.jpg"], shortDesc: "300 LEDs, 3m x 3m, remote controlled.", details: "Transform any wall into a starry night with these stunning LED curtain lights. IP44 waterproof rating.", rating: 4.8, price: 1999, reviews: [{id: 201, user: "Ravi K.", comment: "Amazing backdrop effect!", rating: 5, date: "2025-10-18"}], contact: { whatsapp: "+91 96859 58831", email: "support@festivora.com" }, category: 'Curtain' },
    { id: 3, title: "Star Moon Lamp", desc: "Dreamy star-shaped lights, battery operated.", images: ["/assets/img/moonlamp1.jpg", "/assets/img/moonlamp2.jpg"], shortDesc: "20 stars, soft white, battery box.", details: "Delicate star-shaped LED string lights that add a whimsical touch to any setting. Uses 3 AA batteries (not included).", rating: 4.2, price: 799, reviews: [], contact: { whatsapp: "+91 96859 58831", email: "info@festivora.com" }, category: 'Moon' },
    { id: 4, title: "Outdoor Patio Lights", desc: "Durable for outdoor garden and patio use.", images: ["/assets/img/light.jpg", "/assets/img/light1.jpg"], shortDesc: "15m length, heavy-duty cable, warm white.", details: "Professional-grade outdoor patio string lights. They are fully waterproof.", rating: 4.9, price: 2499, reviews: sampleReviews, contact: { whatsapp: "+91 96859 58831", email: "outdoor@festivora.com" }, category: 'Outdoor' },
];

const createMockProducts = (baseProducts: Product[]): Product[] => {
    const expandedProducts: Product[] = [];
    let currentId = 1;
    const getRandomImages = (count: number): string[] => {
        const shuffled = [...AVAILABLE_IMAGES].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };
    for (let i = 0; i < 8; i++) {
        baseProducts.forEach(baseProduct => {
            const newProduct: Product = {
                ...baseProduct,
                id: currentId++,
                title: `${baseProduct.title.split(' ')[0]} Lamp - Style ${i + 1} (${baseProduct.category})`, 
                images: getRandomImages(3),
                rating: Math.min(5, baseProduct.rating + (i % 5) * 0.1),
            };
            expandedProducts.push(newProduct);
        });
    }
    return expandedProducts;
};

const createMockVideoProducts = (): Product[] => {
    const videoProducts: Product[] = [];
    const titles = ["Festive Home Decor", "Wedding Backdrop Ideas", "Outdoor Lighting Tips", "Smart Light Setup", "DIY Diwali Glow"];
    let currentId = 101; 

    for (let i = 0; i < 25; i++) {
        const videoIndex = i % VIDEO_PATHS.length; 
        const posterIndex = i % POSTER_PATHS.length; 
        const titleIndex = i % titles.length;
        const categoryOptions: CategoryName[] = ['Fairy', 'Curtain', 'Moon', 'Outdoor'];

        videoProducts.push({
            id: currentId++,
            title: `${titles[titleIndex]} Video - Look ${i + 1}`,
            desc: `High-quality video showcasing the ${categoryOptions[i % 4]} lighting range. Perfect for inspiration.`,
            shortDesc: `Short clip for ${categoryOptions[i % 4]} lights.`,
            details: `Full HD showcase video. Demonstrates setup, lighting modes, and final ambiance.`,
            images: [POSTER_PATHS[posterIndex]],
            rating: 4.5,
            price: 0, 
            reviews: sampleReviews.slice(0, 1), 
            contact: { whatsapp: "919876543210", email: "video@festivora.com" },
            category: categoryOptions[i % 4],
            videoUrl: VIDEO_PATHS[videoIndex], 
            posterUrl: POSTER_PATHS[posterIndex],
            productLink: `#product-${Math.ceil(Math.random() * 32)}`
        });
    }
    return videoProducts;
};


const EXPANDED_MOCK_PRODUCTS: Product[] = createMockProducts(originalBaseProducts);
const VIDEO_MOCK_PRODUCTS: Product[] = createMockVideoProducts();
const ALL_MOCK_PRODUCTS: Product[] = [...EXPANDED_MOCK_PRODUCTS, ...VIDEO_MOCK_PRODUCTS];

const getInitialProducts = (): Product[] => ALL_MOCK_PRODUCTS; 
const videoCarouselProducts = VIDEO_MOCK_PRODUCTS; 

// --- MOCK POLICY CONTENT (Used by GenericContentPage) ---
const PolicyContent = {
    privacy: { 
        title: "Privacy Policy",
        content: `
            <h2 class="text-2xl font-bold text-yellow-800">1. Data Collection</h2>
            <p>We collect essential data to process your enquiries and improve our service. This includes name, contact number, and email. We do not store financial details.</p>
            <h2 class="text-2xl font-bold text-yellow-800">2. Usage</h2>
            <p>Your data is used solely for order processing and sending updates on new products and offers. We adhere strictly to Indian data protection laws.</p>
            <p><strong>Contact us at: support@festivora.com for any privacy concerns.</strong></p>
        `
    },
    terms: { 
        title: "Terms of Service",
        content: `
            <p>Welcome to Festivora Lights. By using our website, you agree to comply with and be bound by the following terms and conditions.</p>
            <h2 class="text-2xl font-bold text-yellow-800">1. Product Usage</h2>
            <p>All products are intended for decorative use. Please follow the instructions provided for safety. Festivora is not liable for damages caused by misuse.</p>
        `
    },
    shipping: {
        title: "Shipping & Returns",
        content: `
            <h2 class="text-2xl font-bold text-yellow-800">1. Shipping Duration</h2>
            <p>Standard shipping time is 5-7 working days across India. Express shipping is available in select metros (2-3 days).</p>
            <h2 class="text-2xl font-bold text-yellow-800">2. Return Policy</h2>
            <p>Returns accepted within 7 days of delivery for damaged or incorrect items. Product must be unused and in original packaging.</p>
            <p><strong>Contact our support team immediately for returns: +91 98765 43210</strong></p>
        `
    },
    faqs: {
        title: "Frequently Asked Questions (FAQs)",
        content: `
            <h2 class="text-2xl font-bold text-yellow-800">Q: Are your lights waterproof?</h2>
            <p>A: Most of our Outdoor series lights are IP-rated waterproof. Please check the 'Details' section on the product page for specific ratings.</p>
            <h2 class="text-2xl font-bold text-yellow-800">Q: How can I track my order?</h2>
            <p>A: Once shipped, you will receive an email with a tracking link from our logistics partner within 24 hours.</p>
        `
    },
    warranty: {
        title: "Warranty Details",
        content: `
            <h2 class="text-2xl font-bold text-yellow-800">1. Standard Warranty</h2>
            <p>All Festivora products come with a 6-month limited warranty covering manufacturing defects.</p>
            <h2 class="text-2xl font-bold text-yellow-800">2. Claim Process</h2>
            <p>Please contact support with your order ID and a brief description of the issue. Our team will guide you through the replacement process.</p>
        `
    }
};
type PolicyKey = keyof typeof PolicyContent;
// --- END MOCK POLICY CONTENT ---


const App: React.FC = () => {
    // --- STATE MANAGEMENT ---
    const [products] = useState<Product[]>(getInitialProducts); // Changed setProducts to unused since review logic is removed
    const [currentSearch, setCurrentSearch] = useState<string>('');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    
    // Global States
    const [cartCount, setCartCount] = useState<number>(0); 
    const [toastMessage, setToastMessage] = useState<{productName: string, visible: boolean} | null>(null);
    const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
    
    // 💡 NEW STATES for SettingsModal functionality
    const [currentTheme, setCurrentTheme] = useState<Theme>('light'); 
    const [currentLanguage, setCurrentLanguage] = useState<Language>('en'); 

    // State for Client-Side Routing
    const [viewingAllProducts, setViewingAllProducts] = useState<boolean>(false); 
    const [viewingAboutUs, setViewingAboutUs] = useState<boolean>(false); 
    const [selectedCategory, setSelectedCategory] = useState<CategoryName | 'All'>('All');
    
    // States for Generic Content Page
    const [viewingGenericPage, setViewingGenericPage] = useState<boolean>(false); 
    const [genericPageData, setGenericPageData] = useState<{ title: string, content: string } | null>(null);


    // --- HANDLERS (Defined first to prevent ReferenceErrors) ---

    const resetViewStates = (): void => {
        setCurrentSearch(''); 
        setSelectedProduct(null);
        setViewingAboutUs(false); 
        setViewingAllProducts(false); 
        setSelectedCategory('All'); 
        setViewingGenericPage(false); 
        setGenericPageData(null);
    }

    // Unified View Handler (Used for both products and video cards)
    const handleViewProduct = (product: Product): void => {
        setSelectedProduct(product);
        document.body.style.overflow = 'hidden'; 
    };

    const handleViewVideo = (product: Product): void => {
        handleViewProduct(product); 
    };

    const handleCloseView = (): void => {
        setSelectedProduct(null);
        document.body.style.overflow = 'auto'; 
    };

    const handleSearch = (query: string): void => {
        resetViewStates();
        const trimmedQuery = query.trim();
        setCurrentSearch(trimmedQuery);
        if (trimmedQuery.length > 0) window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    // 💡 NEW HANDLERS for SettingsModal
    const handleThemeChange = (theme: Theme): void => {
        setCurrentTheme(theme);
        // Apply the dark class to the HTML element for TailwindCSS Dark Mode support
        document.documentElement.classList.toggle('dark', theme === 'dark');
    };

    const handleLanguageChange = (lang: Language): void => {
        setCurrentLanguage(lang);
        // In a real application, this is where you'd trigger i18n library to load new translations
        console.log(`Application language set to: ${lang}`); 
    };

    // --- Other Routing & Action Handlers ---
    const handleViewCategory = (category: CategoryName | 'All'): void => {
        resetViewStates();
        setSelectedCategory(category); 
        setViewingAllProducts(true); 
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    const handleViewAllProducts = (): void => {
        handleViewCategory('All'); 
    }
    
    const handleViewAboutUs = (): void => {
        resetViewStates();
        setViewingAboutUs(true); 
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    const handleGoHome = (): void => {
        resetViewStates();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Unified handler for all policy/support links from Footer
    const handleViewPolicy = (key: PolicyKey): void => {
        resetViewStates();
        const data = PolicyContent[key];
        setGenericPageData(data);
        setViewingGenericPage(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const handleAddToCart = (product: Product): void => {
        setCartCount(prev => prev + 1); 
        setToastMessage({ productName: product.title, visible: true }); 
        setTimeout(() => setToastMessage(null), 3000); 
    }
    
    // --- SEARCH LOGIC / FILTERING ---
    const searchLower = currentSearch.toLowerCase();
    const filteredProductsBySearch = products.filter(p => 
        p.title.toLowerCase().includes(searchLower) ||
        p.desc.toLowerCase().includes(searchLower)
    );
    const relatedProducts = products.filter(p => !filteredProductsBySearch.includes(p));
    
    const isSearching = currentSearch.length > 0;
    
    const productsToDisplay = viewingAllProducts && selectedCategory !== 'All'
        ? products.filter(p => p.category === selectedCategory)
        : products;
    
    // --- DYNAMIC CONTENT RENDERING ---
    let content: React.ReactNode;

    // 1. Show Generic Content Page (Policy, FAQ, Shipping etc.) - HIGH PRIORITY
    if (viewingGenericPage && genericPageData) { 
        content = (
            <GenericContentPage
                title={genericPageData.title}
                content={genericPageData.content}
                onGoHome={handleGoHome}
            />
        );
    }
    // 2. Show About Us Page
    else if (viewingAboutUs) {
        content = (
            <AboutUsPage 
                onGoHome={handleGoHome}
            />
        );
    } 
    // 3. Show All Products Page
    else if (viewingAllProducts) {
        const categoryTitle = selectedCategory === 'All' ? 'All Products' : `${selectedCategory} Lights Collection`;
        
        content = (
            <AllProductsPage 
                products={productsToDisplay} 
                title={categoryTitle} 
                onViewProduct={handleViewProduct}
                onAddToCart={handleAddToCart}
                onGoHome={handleGoHome} 
            />
        );
    } 
    // 4. Show Search Results Page
    else if (isSearching) {
        content = (
            <SearchPage 
                searchQuery={currentSearch} 
                searchResults={filteredProductsBySearch}
                relatedProducts={relatedProducts}
                onViewProduct={handleViewProduct}
            />
        );
    } 
    // 5. Show Home Page (Default)
    else {
        content = (
            <>
                <HeroSection />
                <div className="py-8">
                    <CategoryLinks onCategoryClick={handleViewCategory} /> 
                </div>
                <VideoCarousel 
                    products={videoCarouselProducts} 
                    onViewVideo={handleViewVideo} 
                /> 
                <div className="py-16">
                    <ProductScrollList 
                        title="Featured Lighting Collection (Dynamic)" 
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

    return (
        // 🛑 CRITICAL: Added dynamic classes for dark mode and text/background colors
        <div className={`min-h-screen transition-colors duration-500 ${currentTheme === 'dark' ? 'dark bg-gray-900 text-gray-200' : 'bg-gray-50 text-gray-800'}`}>
            
            <Navbar 
                onSearch={handleSearch} 
                cartCount={cartCount}
                onOpenSettings={() => setIsSettingsOpen(true)} 
                onViewAllProducts={handleViewAllProducts}
                onGoHome={handleGoHome}
                onViewAboutUs={handleViewAboutUs} 
            /> 

            <main>
                {content} 

                {/* Hide these sections when viewing a dedicated Page (About Us, Generic, or Product/Video Modal). */}
                {!(viewingAboutUs || selectedProduct || viewingGenericPage) && (
                    <>
                        <div id="about">
                            <AboutSection />
                        </div>
                        <div id="contact"> 
                            <ContactSection />
                        </div>
                    </>
                )}
            </main>

            {/* Footer now receives all necessary navigation handlers */}
            <Footer 
                onViewAllProducts={handleViewAllProducts}
                onViewAboutUs={handleViewAboutUs}
                onGoHome={handleGoHome}
                onViewPolicy={handleViewPolicy} 
            />
            
            {/* --- Global Modals & Notifications --- */}
            {selectedProduct && (
                <ProductViewPage 
                    product={selectedProduct} 
                    onClose={handleCloseView} 
                    onAddToCart={handleAddToCart}
                    allProducts={products}       
                    onViewProduct={handleViewProduct} 
                />
            )}
            
            {isSettingsOpen && (
                <SettingsModal 
                    onClose={() => setIsSettingsOpen(false)}
                    // 💡 NEW PROPS PASSED HERE
                    currentTheme={currentTheme}
                    onThemeChange={handleThemeChange}
                    currentLanguage={currentLanguage}
                    onLanguageChange={handleLanguageChange}
                />
            )} 

            {toastMessage && toastMessage.visible && (
                <ToastNotification 
                    productName={toastMessage.productName} 
                    onClose={() => setToastMessage(null)} 
                />
            )}
        </div>
    );
}

export default App;