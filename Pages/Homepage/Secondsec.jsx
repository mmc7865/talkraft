"use client";

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
// Make sure ScrollTrigger is registered globally before this component mounts
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaFacebookF, FaSearch, FaLaptopCode, FaArrowUp } from 'react-icons/fa';
import { GlowingEffect } from '@/components/ui/glowing-effect';

const servicesData = [
    {
        icon: FaFacebookF,
        title: 'Social Media Marketing',
        description: 'In today\'s digital landscape, social media is a powerful tool for connecting with your audience. We create engaging content, manage your social media accounts, like Facebook, Instagram, Twitter, LinkedIn, and more.',
        iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
        icon: FaSearch,
        title: 'SEO & Backlinks',
        description: 'Maximize your online presence with our top-notch SEO services. We conduct thorough keyword research, optimize your website content, and improve your site\'s structure to boost your search engine rankings.',
        iconColor: 'text-indigo-600 dark:text-indigo-400',
    },
    {
        icon: FaLaptopCode,
        title: 'Design & Development',
        description: 'Your website is your digital storefront, and we ensure it makes a lasting impression. Our web development team builds responsive, user-friendly, and aesthetically pleasing websites that reflect your brand\'s identity.',
        iconColor: 'text-purple-600 dark:text-purple-400',
    },
];

const ServicesSection = () => {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);
    const [showScrollTop, setShowScrollTop] = useState(false);

    useLayoutEffect(() => {
        // Ensure ScrollTrigger is registered globally first!

        const cards = cardsRef.current.filter(Boolean); // Filter out any potential null/undefined refs
        if (!cards.length) return;

        const ctx = gsap.context(() => {
            gsap.from(cards, {
                opacity: 0,
                y: 50,
                duration: 0.6,
                ease: 'power3.out',
                stagger: 0.2,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    end:'top 30%',
                    scrub:true // Start when the top of the section hits 80% of the viewport height
                    // markers: true, // Uncomment ONLY for debugging trigger points
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const checkScrollTop = () => {
            setShowScrollTop(window.scrollY > 400);
        };
        window.addEventListener('scroll', checkScrollTop);
        return () => window.removeEventListener('scroll', checkScrollTop);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <section
            ref={sectionRef}
            // Use the custom background color if defined, otherwise use standard grays
            className="py-16 px-4 bg-neumorphic-bg dark:bg-neumorphic-bg-dark transition-colors duration-300 overflow-hidden sm:px-6 lg:px-8 lg:py-24"
        >
            <div className="max-w-7xl mx-auto">
                {/* Optional Title */}
                {/* <h2 className="text-3xl font-extrabold text-center text-gray-700 dark:text-gray-200 mb-12">Our Services</h2> */}

                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 md:gap-8 lg:gap-12"> {/* Increased gap */}
                    {servicesData.map((service, index) => (
                        <div
                            key={index}
                            ref={el => cardsRef.current[index] = el}
                            // Apply Neumorphic styles
                            className="
                              relative
                                p-6 rounded-2xl // Slightly larger rounding
                                bg-neumorphic-bg dark:bg-neumorphic-bg-dark // Match section background
                                shadow-neumorphic-light dark:shadow-neumorphic-dark // Apply custom shadows
                                transition-shadow duration-200 ease-in-out
                                active:shadow-neumorphic-light-inset dark:active:shadow-neumorphic-dark-inset // Inset shadow on click/tap
                                // REMOVED: hover:-translate-y-1 (often not used with neumorphism)
                                // REMOVED: border classes
                            "
                        >
                            <GlowingEffect
                            spread={60}
                            borderWidth={1.5}
                            glow={true}
                            disabled={false}
                            proximity={64}
                            inactiveZone={0.01}
                            />
                            <div className="flex justify-center mb-5 md:justify-start">
                                <service.icon className={`h-10 w-10 ${service.iconColor}`} aria-hidden="true" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3 text-center md:text-left">
                                {service.title}
                            </h3>
                            {/* Adjusted text color for better contrast on neumorphic backgrounds */}
                            <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed text-center md:text-left">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={scrollToTop}
                aria-label="Scroll to top"
                className={`
                    fixed bottom-8 right-8 z-50
                    w-12 h-12 rounded-full bg-yellow-500 text-white
                    flex items-center justify-center shadow-lg
                    hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900
                    transition-all duration-300 ease-in-out // Changed to transition-all
                    ${showScrollTop ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'} // Added scale transition
                `}
            >
                <FaArrowUp className="h-5 w-5" />
            </button>
        </section>
    );
};

export default ServicesSection;