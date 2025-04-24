"use client";
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react'; // Added useState
import { gsap } from 'gsap';
import { ModeToggle } from './Togglebtn'; // Assuming this component exists
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri'; // Hamburger icons
import Link from 'next/link';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

    const navRef = useRef(null);
    const logoRef = useRef(null);
    const listRef = useRef(null);
    const toggleRef = useRef(null);
    const contactRef = useRef(null);
    // Ref for the right-side items container (toggle + contact)
    const rightItemsRef = useRef(null);

    useEffect(() => {
        // GSAP Animation - Runs once on mount for initial appearance
        // It targets elements by ref, regardless of initial mobile visibility state
        if (navRef.current && logoRef.current && listRef.current && rightItemsRef.current) {

            const logoElement = logoRef.current;
            const listItems = listRef.current?.children || []; // Get list items if listRef is valid
            // Select children of the rightItemsRef for animation
            const rightSideElements = rightItemsRef.current?.children || [];

            // Combine all elements for the initial animation
            const elementsToAnimate = [
                logoElement,
                ...Array.from(listItems), // Convert HTMLCollection to array
                ...Array.from(rightSideElements) // Convert HTMLCollection to array
            ];

             // Filter out any potential null/undefined elements just in case
            const validElements = elementsToAnimate.filter(Boolean);

            if(validElements.length > 0) {
                gsap.set(validElements, { y: -50, opacity: 0 });

                gsap.to(validElements, {
                    y: 0,
                    opacity: 1,
                    duration: 0.6, // Slightly faster duration
                    ease: 'power3.out',
                    stagger: 0.08, // Finer stagger
                    delay: 0.2,
                });
            }
        }
    }, []); // Empty dependency array means this runs only once

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        // Added 'relative' for positioning the mobile menu dropdown
        <nav ref={navRef} className="relative w-full bg-white px-4 py-2 shadow-md transition-colors duration-300 ease-in-out dark:bg-gray-900 dark:shadow-lg dark:shadow-gray-800/40 md:px-8">
            <div className="mx-auto flex max-w-7xl items-center justify-between">

                {/* Logo */}
                <div ref={logoRef} className="flex-shrink-0">
                    <Image
                        src="/img/logo.png"
                        alt="Logo"
                        width={70} // Slightly smaller logo
                        height={70}
                        priority
                    />
                </div>

                {/* Desktop Navigation Links (Hidden on Mobile) */}
                <ul
                    ref={listRef}
                    className="
                        hidden list-none p-0 md:flex  md:items-center md:gap-6 lg:gap-8
                        md:mx-auto // Center links on desktop between logo and right items
                    "
                >
                    <Link href={"/"} className="cursor-pointer font-medium text-black transition-colors duration-200 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">Home</Link>
                    <Link href={"/user/about-us"} className="cursor-pointer font-medium text-black transition-colors duration-200 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">About</Link>
                    <Link href={"/user/services"} className="cursor-pointer font-medium text-black transition-colors duration-200 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">Services</Link>
                    <Link href={"/user/projects"} className="cursor-pointer font-medium text-black transition-colors duration-200 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">Project</Link>
                    <Link href={"/user/contact"} className="cursor-pointer font-medium text-black transition-colors duration-200 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">Contact</Link>
                </ul>

                {/* Right Side Items + Mobile Menu Button */}
                <div className="flex items-center gap-4">
                    {/* Container for Toggle + Contact (for GSAP targeting) */}
                     <div ref={rightItemsRef} className="hidden items-center gap-4 md:flex">
                         <div ref={toggleRef}>
                            <ModeToggle />
                         </div>
                         <div ref={contactRef} className="whitespace-nowrap font-medium text-black dark:text-gray-200 text-sm lg:text-base">
                            Call Us: +91-8887915782
                         </div>
                     </div>

                    {/* Mobile Menu Button (Visible only on mobile) */}
                    <button
                        onClick={toggleMobileMenu}
                        className="text-gray-700 dark:text-gray-300 md:hidden focus:outline-none"
                        aria-label="Toggle menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        {isMobileMenuOpen ? (
                            <RiCloseLine className="h-7 w-7" />
                        ) : (
                            <RiMenu3Line className="h-7 w-7" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {/* Use transitions for smooth opening/closing */}
            <div
                className={`
                    absolute left-0 right-0 top-full z-40 w-full origin-top transform bg-white shadow-lg transition-all duration-300 ease-in-out dark:bg-gray-900
                    md:hidden  // Hide on medium screens and up
                    ${isMobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-95 opacity-0 pointer-events-none'}
                `}
                // No need for ref here if not animating the dropdown itself directly
            >
                 {/* Use listRef here if you want the same ref, but the animation runs only once on mount */}
                 {/* Alternatively, use a different ref if you want separate animation control */}
                <ul className="flex flex-col items-start gap-4 px-4 py-5">
                     {/* Re-render list items for mobile menu */}
                    <li className="cursor-pointer font-medium text-black transition-colors duration-200 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">Home</li>
                    <li className="cursor-pointer font-medium text-black transition-colors duration-200 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">About</li>
                    <li className="cursor-pointer font-medium text-black transition-colors duration-200 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">Services</li>
                    <li className="cursor-pointer font-medium text-black transition-colors duration-200 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">Project</li>
                    <li className="cursor-pointer font-medium text-black transition-colors duration-200 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">Contact</li>
                    {/* Add Toggle/Contact to mobile menu as well */}
                    <li className="mt-2 border-t border-gray-200 pt-4 dark:border-gray-700">
                        <ModeToggle />
                    </li>
                     <li className="whitespace-nowrap font-medium text-black dark:text-gray-200 text-sm">
                        Call Us: +91-8887915782
                     </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;