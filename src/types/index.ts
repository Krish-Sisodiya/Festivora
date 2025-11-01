// File: src/types/index.ts

// File: src/types/index.ts (Updated)

export interface NavLink {
    name: string;
    href: string;
}

// 💡 Product Interface Update
export interface Product {
    id: number;
    title: string;
    desc: string;
    // price: number; // Price removed as per request
    
    // 💡 New fields for dynamic content
    images: string[]; // Array of image URLs for cycling
    shortDesc: string; 
    details: string; // Full description for Product View Page
    rating: number; // Star rating
    reviews: Review[]; // Reviews array
    contact: {
        whatsapp: "+91 96859 58831";
        email: string;
    }
}

// 💡 New Review Interface
export interface Review {
    id: number;
    user: string;
    comment: string;
    rating: number;
    date: string;
}

// 💡 NEW: Video Product Type
export interface VideoProduct {
    id: number;
    title: string;
    subtitle: string;
    price: number;
    videoUrl: string;
    posterUrl: string;
    productLink: string;
}

/* All Product Page */ 
// File: src/types.ts

// --- Basic Types ---
export interface ContactInfo {
    whatsapp: string;
    email: string;
}

export interface Review {
    id: number;
    user: string;
    comment: string;
    rating: number; // 1 to 5
    date: string; // ISO date string
}

// --- Product Type ---
export interface Product {
    id: number;
    title: string;
    desc: string;
    images: string[];
    shortDesc: string;
    details: string;
    rating: number;
    price: number;
    reviews: Review[];
    contact: ContactInfo;
}

// --- Video Product Type (For Carousel) ---
export interface VideoProduct {
    id: number;
    title: string;
    subtitle: string;
    price: number;
    videoUrl: string;
    posterUrl: string;
    productLink: string;
}

// --- NavLink Type (For Navbar) ---
export interface NavLink {
    name: string;
    href?: string;
    isSpecial?: boolean; // For Home/Products links which use handlers
}