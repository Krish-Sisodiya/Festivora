// ✅ CATEGORY TYPE (Matches UI + App.tsx Handling)
export type CategoryName =
  | "Fairy"
  | "Curtain"
  | "Moon"
  | "Outdoor"
  | "Star"
  | "Video"
  | "All";

// ✅ THEME & LANGUAGE TYPES
export type Theme = "light" | "dark";
export type Language = "en" | "hi";

// ✅ REVIEW INTERFACE
export interface Review {
  id: number;
  user: string;
  comment: string;
  rating: number;
  date: string;
}

// ✅ PRODUCT INTERFACE (Supports both Normal + Video Products)
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
  contact: {
    whatsapp: string;
    email: string;
  };

  category: CategoryName; // ✅ fully controlled

  // ✅ Optional for video products
  videoUrl?: string;
  posterUrl?: string;
  productLink?: string;
}

// ✅ POLICY CONTENT TYPE (Used in GenericContentPage)
export interface PolicyContent {
  title: string;
  content: string;
}
