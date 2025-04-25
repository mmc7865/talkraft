"use client";
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ModeToggle } from './Togglebtn';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import Link from 'next/link';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navRef = useRef(null);
    const logoRef = useRef(null);
    const listRef = useRef(null);
    const toggleRef = useRef(null);
    const contactRef = useRef(null);
    const rightItemsRef = useRef(null);

    // Add this function to close the mobile menu
    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    useEffect(() => {
        if (navRef.current && logoRef.current && listRef.current && rightItemsRef.current) {
            const logoElement = logoRef.current;
            const listItems = listRef.current?.children || [];
            const rightSideElements = rightItemsRef.current?.children || [];

            const elementsToAnimate = [
                logoElement,
                ...Array.from(listItems),
                ...Array.from(rightSideElements)
            ];

            const validElements = elementsToAnimate.filter(Boolean);

            if(validElements.length > 0) {
                gsap.set(validElements, { y: -50, opacity: 0 });
                gsap.to(validElements, {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: 'power3.out',
                    stagger: 0.08,
                    delay: 0.2,
                });
            }
        }
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 w-full bg-white px-4 py-2 shadow-md transition-colors duration-300 ease-in-out dark:bg-gray-900 dark:shadow-lg dark:shadow-gray-800/40 md:px-8">
            <div className="mx-auto flex max-w-7xl items-center justify-between">
                <div ref={logoRef} className="flex-shrink-0">
                    <Image
                        src="/img/logo.png"
                        alt="Logo"
                        width={70}
                        height={70}
                        priority
                    />
                </div>

                <ul ref={listRef} className="hidden list-none p-0 md:flex md:items-center md:gap-6 lg:gap-8 md:mx-auto">
                    <Link href="/" className="cursor-pointer font-medium text-black transition-colors duration-200 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">Home</Link>
                    <Link href="/user/about-us" className="cursor-pointer font-medium text-black transition-colors duration-200 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">About</Link>
                    <Link href="/user/services" className="cursor-pointer font-medium text-black transition-colors duration-200 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">Services</Link>
                    <Link href="/user/projects" className="cursor-pointer font-medium text-black transition-colors duration-200 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">Project</Link>
                    <Link href="/user/contact" className="cursor-pointer font-medium text-black transition-colors duration-200 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">Contact</Link>
                </ul>

                <div className="flex items-center gap-4">
                    <div ref={rightItemsRef} className="hidden items-center gap-4 md:flex">
                        <div ref={toggleRef}>
                            <ModeToggle />
                        </div>
                        <div ref={contactRef} className="whitespace-nowrap font-medium text-black dark:text-gray-200 text-sm lg:text-base">
                            Call Us: +91-8887915782
                        </div>
                    </div>
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

            <div className={`
                absolute left-0 right-0 top-full z-40 w-full origin-top transform bg-white shadow-lg transition-all duration-300 ease-in-out dark:bg-gray-900 md:hidden
                ${isMobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-95 opacity-0 pointer-events-none'}
            `}>
                <ul className="flex flex-col items-start gap-4 px-4 py-5">
                    <li><Link href="/" onClick={closeMobileMenu} className="cursor-pointer font-medium text-black transition-colors duration-200 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">Home</Link></li>
                    <li><Link href="/user/about-us" onClick={closeMobileMenu} className="cursor-pointer font-medium text-black transition-colors duration-200 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">About</Link></li>
                    <li><Link href="/user/services" onClick={closeMobileMenu} className="cursor-pointer font-medium text-black transition-colors duration-200 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">Services</Link></li>
                    <li><Link href="/user/projects" onClick={closeMobileMenu} className="cursor-pointer font-medium text-black transition-colors duration-200 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">Project</Link></li>
                    <li><Link href="/user/contact" onClick={closeMobileMenu} className="cursor-pointer font-medium text-black transition-colors duration-200 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">Contact</Link></li>
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