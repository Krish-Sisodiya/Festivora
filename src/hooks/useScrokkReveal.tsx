// File: src/hooks/useScrollReveal.ts (UPDATED + TYPESAFE + OPTIMIZED)

import { useEffect } from 'react';

const useScrollReveal = (
    selector: string = '.scroll-reveal-item',
    threshold: number = 0.1,
    rootMargin: string = '0px'
) => {
    useEffect(() => {
        if (typeof document === "undefined") return; // ✅ SSR safety

        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        obs.unobserve(entry.target); // Stop observing after reveal
                    }
                });
            },
            { threshold, rootMargin }
        );

        // ✅ Proper static reference (avoids cleanup issues)
        const elements: Element[] = Array.from(document.querySelectorAll(selector));

        elements.forEach(el => observer.observe(el));

        return () => {
            elements.forEach(el => observer.unobserve(el));
            observer.disconnect();
        };
    }, [selector, threshold, rootMargin]);
};

export default useScrollReveal;
