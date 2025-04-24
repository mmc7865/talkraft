"use client"; // Required for hooks

import React, { useRef, useLayoutEffect } from 'react';
import Image from 'next/image'; // Using Next.js Image component
import { gsap } from 'gsap';
// IMPORTANT: Ensure ScrollTrigger is globally registered FIRST!

import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn, FaPaperPlane } from 'react-icons/fa';
import Link from 'next/link';

// Gallery images data (replace with your actual paths)
const galleryImages = [
    // Ensure paths are correct relative to /public
    { src: "/img/portfolio-1.jpg", alt: "Portfolio image 1" },
    { src: "/img/portfolio-2.jpg", alt: "Portfolio image 2" },
    { src: "/img/portfolio-3.jpg", alt: "Portfolio image 3" },
    { src: "/img/portfolio-4.jpg", alt: "Portfolio image 4" },
    { src: "/img/portfolio-5.jpg", alt: "Portfolio image 5" },
    { src: "/img/portfolio-6.jpg", alt: "Portfolio image 6" },
];

const Footer = () => {
    const footerRef = useRef(null);
    // Refs for major sections to trigger animations
    const addressColRef = useRef(null);
    const linksColRef = useRef(null);
    const galleryColRef = useRef(null);
    const newsletterColRef = useRef(null);
    const copyrightRef = useRef(null);

    useLayoutEffect(() => {
        // Ensure ScrollTrigger is registered globally!

        // Use gsap.context for easy cleanup
        const ctx = gsap.context(() => {
            const mainTrigger = {
                trigger: footerRef.current,
                start: 'top 90%',
                toggleActions: 'play none none none',
                // markers: true, // For main trigger debug
            };

            // --- Animate Columns Staggered ---
            const columns = [
                addressColRef.current,
                linksColRef.current,
                galleryColRef.current,
                newsletterColRef.current
            ].filter(Boolean); // Ensure refs are valid

            gsap.from(columns, {
                opacity: 0,
                y: 50,
                duration: 0.6,
                ease: 'power2.out',
                stagger: 0.15, // Stagger column appearance
                scrollTrigger: mainTrigger
            });

            // --- Animate Content WITHIN Columns (Subtle Stagger) ---
            // Selectors allow targeting without excessive refs
            // Address Column Content
            gsap.from(gsap.utils.toArray('.address-item'), {
                opacity: 0,
                x: -20,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: { // Trigger slightly after column starts appearing
                    trigger: addressColRef.current,
                    start: 'top 95%',
                    toggleActions: 'play none none none',
                }
            });
            gsap.from(gsap.utils.toArray('.social-btn-item'), {
                 opacity: 0,
                 scale: 0.5,
                 duration: 0.4,
                 stagger: 0.08,
                 ease: 'back.out(1.7)',
                 scrollTrigger: {
                    trigger: addressColRef.current,
                    start: 'top 85%', // Trigger slightly later
                    toggleActions: 'play none none none',
                 }
            });

            // Quick Links Column Content
            gsap.from(gsap.utils.toArray('.quick-link-item'), {
                opacity: 0,
                x: -20,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power2.out',
                 scrollTrigger: {
                    trigger: linksColRef.current,
                    start: 'top 95%',
                    toggleActions: 'play none none none',
                 }
            });

            // Gallery Column Content
            gsap.from(gsap.utils.toArray('.gallery-item'), {
                opacity: 0,
                scale: 0.8,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power2.out',
                 scrollTrigger: {
                    trigger: galleryColRef.current,
                    start: 'top 95%',
                    toggleActions: 'play none none none',
                 }
            });

             // Newsletter Column Content
            gsap.from(gsap.utils.toArray('.newsletter-item'), {
                opacity: 0,
                y: 20,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power2.out',
                 scrollTrigger: {
                    trigger: newsletterColRef.current,
                    start: 'top 95%',
                    toggleActions: 'play none none none',
                 }
            });


            // Animate Copyright Section (Can keep simpler animation)
            gsap.from(copyrightRef.current, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: copyrightRef.current, // Trigger when copyright itself enters
                    start: 'top 98%',
                    toggleActions: 'play none none none',
                     // markers: true, // For copyright debug
                }
            });

        }, footerRef); // Scope to the main footer element

        // Cleanup
        return () => ctx.revert();

    }, []); // Run once on mount

    return (
        <footer
            ref={footerRef}
            className="bg-blue-700 text-blue-50 dark:bg-gray-900 dark:text-gray-300 transition-colors duration-300 overflow-hidden" // Added overflow-hidden
        >
            {/* Main Content Container */}
            <div className="container mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
                {/* Grid for the four columns */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">

                    {/* Column 1: Address */}
                    <div ref={addressColRef}>
                        {/* Added address-item class for GSAP targeting */}
                        <h3 className="section-title address-item relative mb-4 inline-block text-lg font-semibold text-white after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-1/2 after:bg-orange-400 dark:text-gray-100 dark:after:bg-orange-500">
                            Address
                        </h3>
                        <p className="address-item mb-2 flex items-start">
                            <FaMapMarkerAlt className="mr-3 mt-1 h-4 w-4 flex-shrink-0 text-orange-400" />
                            <span>Kidwai Nagar, Kanpur, Up</span>
                        </p>
                        <p className="address-item mb-2 flex items-center">
                            <FaPhoneAlt className="mr-3 h-4 w-4 flex-shrink-0 text-orange-400" />
                            <a href="tel:8887915782" className="hover:text-orange-300 dark:hover:text-orange-400">+91 88879 15782</a>
                        </p>
                        <p className="address-item mb-4 flex items-center">
                            <FaEnvelope className="mr-3 h-4 w-4 flex-shrink-0 text-orange-400" />
                            <a href="mailto:info@talkraft.com" className="hover:text-orange-300 dark:hover:text-orange-400">info@talkraft.com</a>
                        </p>
                        {/* Social Icons */}
                        {/* Added social-btn-item class for GSAP targeting */}
                        <div className="flex pt-2 space-x-2">
                            <Link className="social-btn social-btn-item" href="#" aria-label="Twitter"><FaTwitter /></Link>
                            <Link className="social-btn social-btn-item" href="https://www.facebook.com/TallkRaft" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></Link>
                            <Link className="social-btn social-btn-item" href="https://www.instagram.com/talk_raft" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></Link>
                            <Link className="social-btn social-btn-item" href="https://www.linkedin.com/company/talkraft" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></Link>
                        </div>
                    </div>

                    {/* Column 2: Quick Link */}
                    <div ref={linksColRef}>
                        {/* Added quick-link-item class */}
                        <h3 className="quick-link-item section-title relative mb-4 inline-block text-lg font-semibold text-white after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-1/2 after:bg-orange-400 dark:text-gray-100 dark:after:bg-orange-500">
                            Quick Link
                        </h3>
                        <nav className="flex flex-col space-y-2">
                             {/* Added quick-link-item class */}
                            <a className="footer-link quick-link-item" href="/about">About Us</a>
                            <a className="footer-link quick-link-item" href="/contact">Contact Us</a>
                            <a className="footer-link quick-link-item" href="#">Privacy Policy</a>
                            <a className="footer-link quick-link-item" href="#">Terms & Condition</a>
                            <a className="footer-link quick-link-item" href="#">Career</a>
                        </nav>
                    </div>

                    {/* Column 3: Gallery */}
                    <div ref={galleryColRef}>
                         {/* Added gallery-item class */}
                         <h3 className="gallery-item section-title relative mb-4 inline-block text-lg font-semibold text-white after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-1/2 after:bg-orange-400 dark:text-gray-100 dark:after:bg-orange-500">
                            Gallery
                        </h3>
                        <div className="grid grid-cols-3 gap-2">
                            {galleryImages.map((img, index) => (
                                // Added gallery-item class
                                <div key={index} className="gallery-item overflow-hidden rounded group"> {/* Added group for hover effect */}
                                    <Image
                                        className="h-auto w-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:brightness-110" // Enhanced hover
                                        src={img.src}
                                        alt={img.alt}
                                        width={80}
                                        height={80}
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Column 4: Newsletter */}
                    <div ref={newsletterColRef}>
                         {/* Added newsletter-item class */}
                         <h3 className="newsletter-item section-title relative mb-4 inline-block text-lg font-semibold text-white after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-1/2 after:bg-orange-400 dark:text-gray-100 dark:after:bg-orange-500">
                           Newsletter
                        </h3>
                        {/* Added newsletter-item class */}
                        <p className="newsletter-item mb-4 text-center md:text-left">Stay Always In Touch</p>
                        {/* Added newsletter-item class */}
                        <form action="" method="POST" acceptCharset="utf-8" className="newsletter-item relative mt-3">
                            <input
                                className="h-12 w-full rounded-full border-0 bg-white px-4 pr-12 text-gray-900 placeholder-gray-500 transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                                name="email"
                                type="email"
                                placeholder="Your Email"
                                required
                            />
                            <button
                                type="submit"
                                name="submit"
                                className="absolute top-0 right-0 mt-1 mr-1 flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white shadow-none transition-all duration-200 hover:bg-orange-600 hover:scale-110 focus:outline-none" // Added hover:scale
                                aria-label="Submit newsletter"
                            >
                                <FaPaperPlane className="h-5 w-5" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="border-t border-blue-600 dark:border-gray-700">
                <div ref={copyrightRef} className="container mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-between text-sm md:flex-row">
                        <div className="mb-3 text-center md:mb-0 md:text-left">
                            © <a className="border-b border-dashed border-orange-300 transition-colors hover:border-solid hover:text-orange-300 dark:border-orange-400 dark:hover:text-orange-400" href="https://talkraft.com/">TalkRaft.Com</a>, All Right Reserved.
                             Designed By Talk Raft
                        </div>
                        <div className="text-center md:text-right">
                            <nav className="flex justify-center space-x-4 md:justify-end">
                                <a href="#" className="footer-link">Home</a>
                                <a href="#" className="footer-link">Cookies</a>
                                <a href="#" className="footer-link">Help</a>
                                <a href="#" className="footer-link">FQAs</a>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

             {/* Helper Styles - Kept the same */}
             <style jsx>{`
                .section-title::after {
                    content: '';
                    position: absolute;
                    bottom: -4px;
                    left: 0;
                    width: 50%;
                    height: 2px;
                    /* Color handled by Tailwind */
                }
                .social-btn {
                    /* Added transform and group for icon hover */
                    @apply inline-flex h-9 w-9 items-center justify-center rounded-full border border-orange-300 text-orange-300 transition-all duration-200 hover:border-white hover:bg-white hover:text-blue-700 hover:scale-105 dark:border-gray-600 dark:text-gray-400 dark:hover:border-orange-400 dark:hover:bg-orange-400 dark:hover:text-gray-900;
                }
                .footer-link {
                     /* Added transform for subtle movement */
                    @apply block transition-all duration-200 hover:text-orange-300 hover:translate-x-1 dark:hover:text-orange-400;
                }
             `}</style>
        </footer>
    );
};

export default Footer;