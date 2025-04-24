"use client";

import React, { useState, useEffect, useRef, createRef } from 'react'; // Added createRef
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaEye, FaLink } from 'react-icons/fa';
import { TransitionGroup, CSSTransition } from 'react-transition-group'; // Import RTG

gsap.registerPlugin(ScrollTrigger);

// --- Dummy Data & Filters (remain the same) ---
const portfolioItemsData = [
    { id: 1, category: 'Web Design', filterClass: 'filter-web', imgSrc: '/img/portfolio-1.jpg', imgAlt: 'Digital Agency Website', title: 'Digital Agency Website Design And Development', type: 'UI / UX Design', lightboxUrl: '/img/portfolio-1.jpg', linkUrl: '#', },
    { id: 2, category: 'Graphic Design', filterClass: 'filter-graphic', imgSrc: '/img/portfolio-2.jpg', imgAlt: 'Marketing Campaign Graphics', title: 'Creative Marketing Campaign Graphics Pack', type: 'Graphic Design', lightboxUrl: '/img/portfolio-2.jpg', linkUrl: '#', },
    { id: 3, category: 'Web Design', filterClass: 'filter-web', imgSrc: '/img/portfolio-3.jpg', imgAlt: 'E-commerce Platform UI', title: 'Modern E-commerce Platform UI/UX Overhaul', type: 'UI / UX Design', lightboxUrl: '/img/portfolio-3.jpg', linkUrl: '#', },
    { id: 4, category: 'Graphic Design', filterClass: 'filter-graphic', imgSrc: '/img/portfolio-4.jpg', imgAlt: 'Brand Identity Package', title: 'Complete Brand Identity Package for Startup', type: 'Branding', lightboxUrl: '/img/portfolio-4.jpg', linkUrl: '#', },
    { id: 5, category: 'Web Design', filterClass: 'filter-web', imgSrc: '/img/portfolio-5.jpg', imgAlt: 'Mobile App Landing Page', title: 'Engaging Mobile App Landing Page Design', type: 'Web Design', lightboxUrl: '/img/portfolio-5.jpg', linkUrl: '#', },
    { id: 6, category: 'Graphic Design', filterClass: 'filter-graphic', imgSrc: '/img/portfolio-6.jpg', imgAlt: 'Social Media Content Kit', title: 'Custom Social Media Content Kit Creation', type: 'Content Design', lightboxUrl: '/img/portfolio-6.jpg', linkUrl: '#', },
];
const filterButtons = [
    { name: 'All', filter: '*' },
    { name: 'Web Design', filter: '.filter-web' },
    { name: 'Graphic Design', filter: '.filter-graphic' },
];

// --- Sub-component for Portfolio Item Card (for RTG nodeRef) ---
const PortfolioItemCard = React.forwardRef(({ item, ...props }, ref) => (
    <div ref={ref} {...props}> {/* Spread remaining props like className */}
        <div className="group rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-shadow duration-300 hover:shadow-xl h-full flex flex-col">
            <div className="relative overflow-hidden">
                <img
                    className="w-full h-56 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    src={item.imgSrc}
                    alt={item.imgAlt}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                    <a href={item.lightboxUrl} data-lightbox={`portfolio-${item.id}`} title="Preview" className="inline-flex items-center justify-center w-10 h-10 border-2 border-white rounded-full text-white mx-1.5 transform transition-transform duration-300 hover:bg-white hover:text-indigo-600 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white">
                        <FaEye className="w-5 h-5" />
                    </a>
                    <a href={item.linkUrl} title="Project Link" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-10 h-10 border-2 border-white rounded-full text-white mx-1.5 transform transition-transform duration-300 hover:bg-white hover:text-indigo-600 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white">
                        <FaLink className="w-5 h-5" />
                    </a>
                </div>
            </div>
            <div className="p-5 flex-grow"> {/* Added flex-grow */}
                <p className="text-indigo-600 dark:text-indigo-400 font-medium text-sm mb-1">
                    {item.type}
                </p>
                <h5 className="text-lg font-semibold leading-snug text-gray-900 dark:text-white mb-0">
                    {item.title}
                </h5>
            </div>
        </div>
    </div>
));
PortfolioItemCard.displayName = "PortfolioItemCard"; // For better debugging


// --- Main Project Component ---
const Project = () => {
    const [activeFilter, setActiveFilter] = useState('*');
    const sectionRef = useRef(null);

    // --- Filtering Logic ---
    const filteredItems = portfolioItemsData.filter(item =>
        activeFilter === '*' || `.${item.filterClass}` === activeFilter
    );

    // Create refs for each item for CSSTransition nodeRef
    const itemRefs = useRef({});
    filteredItems.forEach(item => {
        if (!itemRefs.current[item.id]) {
            itemRefs.current[item.id] = createRef();
        }
    });


    // --- GSAP Animation for Title & Filters (ScrollTrigger) ---
    useEffect(() => {
        if (!sectionRef.current) return;
        const ctx = gsap.context(() => {
            // Animate Section Title Wrapper
            gsap.fromTo('.section-title-wrapper', { opacity: 0, y: 50 }, {
                opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
                scrollTrigger: { trigger: '.section-title-wrapper', start: 'top 90%', toggleActions: 'play none none none' }
            });
            // Animate Filter List
            gsap.fromTo('.filter-list', { opacity: 0, y: 40 }, {
                opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: 'power3.out',
                scrollTrigger: { trigger: '.filter-list', start: 'top 90%', toggleActions: 'play none none none' }
            });

            // NOTE: Initial stagger animation for items is removed, handled by RTG now.

        }, sectionRef);
        return () => ctx.revert();
    }, []); // Run only on mount


    // --- GSAP Animations for Filter Transitions (RTG Callbacks) ---
    const animationDuration = 300; // ms, matching CSSTransition timeout

    const onEnter = (node) => {
        // Initial state before entering
        gsap.set(node, { opacity: 0, y: 40, scale: 0.95 });
    };

    const onEntering = (node, isAppearing) => {
        // Animate to final state
        gsap.to(node, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: animationDuration / 1000, // GSAP uses seconds
            ease: 'power2.out',
            delay: isAppearing ? 0 : 0.1 // Add small delay on filter change, not initial load
        });
    };

    const onExit = (node) => {
        // Initial state before exiting (already visible)
        gsap.set(node, { opacity: 1, y: 0, scale: 1 });
    };

    const onExiting = (node) => {
        // Animate out
        gsap.to(node, {
            opacity: 0,
            scale: 0.95,
            duration: animationDuration / 1000,
            ease: 'power2.in',
        });
    };

    return (
        <div ref={sectionRef} className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="max-w-5xl mx-auto">

                {/* --- Section Title (remains the same) --- */}
                <div className="section-title-wrapper mb-12 md:mb-16 text-center opacity-0 transform translate-y-10">
                    <div className="inline-flex items-center justify-center mb-4">
                         <span className="flex-shrink-0 h-1 w-12 bg-indigo-200 dark:bg-indigo-700 rounded-full"></span>
                         <p className="mx-4 text-sm font-semibold tracking-widest uppercase text-indigo-600 dark:text-indigo-400">
                             Our Projects
                         </p>
                         <span className="flex-shrink-0 h-1 w-12 bg-indigo-200 dark:bg-indigo-700 rounded-full"></span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                      Recently Completed Projects
                    </h1>
                </div>

                {/* --- Filter Buttons (remains the same) --- */}
                <div className="filter-list col-12 text-center mb-10 md:mb-12 opacity-0 transform translate-y-10">
                   <ul className="flex flex-wrap justify-center gap-2 sm:gap-3">
                        {filterButtons.map((button) => (
                            <li key={button.name}>
                                <button
                                    onClick={() => setActiveFilter(button.filter)}
                                    className={`px-4 py-2 text-sm sm:text-base font-medium rounded-md transition-colors duration-200 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                                        ${activeFilter === button.filter
                                            ? 'bg-indigo-600 text-white shadow-md'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                        }`}
                                    data-filter={button.filter}
                                >
                                    {button.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* --- Portfolio Grid with TransitionGroup --- */}
                <TransitionGroup
                    component="div" // Render as a div
                    className="portfolio-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    {filteredItems.map((item) => (
                        <CSSTransition
                            key={item.id} // Essential for RTG tracking
                            nodeRef={itemRefs.current[item.id]} // Pass the ref for this item
                            timeout={animationDuration} // Duration in ms
                            classNames="portfolio-item-anim" // Base name for CSS classes (optional if using GSAP callbacks)
                            onEnter={onEnter}
                            onEntering={onEntering}
                            onExit={onExit}
                            onExiting={onExiting}
                            // appear // Add this if you want the initial load to animate too
                            unmountOnExit // Remove item from DOM when exited
                        >
                             {/* Render the sub-component, passing the ref */}
                            <PortfolioItemCard
                                ref={itemRefs.current[item.id]} // Assign the specific ref
                                item={item}
                                // No need for opacity/transform classes here anymore
                            />
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </div>
        </div>
    );
};

export default Project;