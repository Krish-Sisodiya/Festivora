// File: src/components/ProductViewPage.tsx

import React, { useState } from 'react';

// Re-define types based on the merged Product type from App.tsx
type Review = { id: number, user: string, comment: string, rating: number, date: string };
type ProductContact = { whatsapp: string, email: string };
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
    category: string,
    videoUrl?: string, 
    posterUrl?: string, 
    productLink?: string 
};

interface ProductViewPageProps {
    product: Product;
    onClose: () => void;
    onAddToCart: (product: Product) => void;
    allProducts: Product[];
    onReviewSubmit: (productId: number, newReview: Review) => void;
    onViewProduct: (product: Product) => void;
}

const ProductViewPage: React.FC<ProductViewPageProps> = ({ 
    product, onClose, onAddToCart, allProducts, onReviewSubmit, onViewProduct 
}) => {
    
    const isVideoProduct = !!product.videoUrl;

    const MediaSection = () => {
        if (isVideoProduct && product.videoUrl) {
            return (
                <div className="w-full h-80 md:h-96 bg-black rounded-lg overflow-hidden shadow-xl">
                    <video 
                        controls 
                        poster={product.posterUrl || product.images[0]} 
                        className="w-full h-full object-contain"
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                    >
                        <source src={product.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            );
        }
        
        // Default: Product Image Gallery
        return (
            <div className="w-full h-80 md:h-96 bg-gray-200 rounded-lg overflow-hidden shadow-xl">
                <img 
                    src={product.images[0] || '/placeholders/default.jpg'} 
                    alt={product.title} 
                    className="w-full h-full object-cover" 
                />
            </div>
        );
    };

    const ReviewForm = () => {
        const [rating, setRating] = useState(5);
        const [comment, setComment] = useState('');

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            const newReview: Review = {
                id: Date.now(),
                user: "Guest User",
                comment: comment,
                rating: rating,
                date: new Date().toISOString().slice(0, 10),
            };
            onReviewSubmit(product.id, newReview);
            setComment('');
        };

        return (
            <form onSubmit={handleSubmit} className="mt-4 space-y-3 p-4 border rounded-lg bg-gray-50">
                <h3 className="text-lg font-bold">Write a Review</h3>
                <input 
                    type="number" 
                    min="1" 
                    max="5" 
                    value={rating} 
                    onChange={(e) => setRating(parseInt(e.target.value))}
                    className="w-full p-2 border rounded"
                    placeholder="Rating (1-5)"
                />
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Your comment..."
                    required
                />
                <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition">
                    Submit Review
                </button>
            </form>
        );
    };


    return (
        <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-70 overflow-y-auto">
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full my-8 relative">
                    
                    {/* Close Button */}
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 md:top-6 md:right-6 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition z-50"
                        aria-label="Close"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>

                    <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
                        
                        {/* LEFT COLUMN: Media (Image or Video) */}
                        <div className="flex flex-col space-y-4">
                            <MediaSection />
                        </div>

                        {/* RIGHT COLUMN: Details and Actions */}
                        <div className="flex flex-col space-y-6">
                            <h1 className="text-4xl font-extrabold text-gray-900">{product.title}</h1>
                            
                            <div className="flex items-center space-x-2">
                                <span className="text-yellow-500 text-xl">{'⭐'.repeat(Math.floor(product.rating))}</span>
                                <span className="text-gray-600 font-semibold">({product.rating.toFixed(1)} Rating)</span>
                            </div>

                            <p className="text-xl font-semibold text-indigo-600">
                                {isVideoProduct ? 'Watch and Shop Below' : `₹${product.price.toLocaleString()}`}
                            </p>
                            <p className="text-gray-600">{product.desc}</p>

                            {/* Actions and Contact */}
                            <div className="border-t border-b py-4 space-y-4">
                                <a
                                    href={isVideoProduct ? product.productLink : '#'} // Use productLink for video, or default for product
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    onClick={!isVideoProduct ? () => onAddToCart(product) : undefined}
                                    className={`w-full py-3 rounded-lg font-bold transition flex justify-center items-center ${isVideoProduct ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-red-500 hover:bg-red-600 text-white'}`}
                                >
                                    {isVideoProduct ? 'Shop Related Product' : 'Add to Cart'}
                                </a>
                                
                                <div className="flex justify-between text-sm text-gray-500">
                                    <p>Contact: {product.contact.whatsapp}</p>
                                    <p>Email: {product.contact.email}</p>
                                </div>
                            </div>

                            {/* Details and Reviews */}
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold">Details</h2>
                                <p className="text-gray-700">{product.details}</p>
                                
                                <h2 className="text-2xl font-bold pt-4">Customer Reviews ({product.reviews.length})</h2>
                                {/* Display existing reviews */}
                                <div className="max-h-40 overflow-y-auto space-y-3 pr-2">
                                    {product.reviews.map(review => (
                                        <div key={review.id} className="p-3 bg-gray-100 rounded-lg">
                                            <p className="font-semibold">{review.user} ({review.rating}⭐)</p>
                                            <p className="text-sm text-gray-600">{review.comment}</p>
                                        </div>
                                    ))}
                                </div>
                                
                                <ReviewForm /> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductViewPage;