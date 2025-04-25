"use client"; // Required for hooks

import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { FaSearch, FaLaptopCode, FaFacebookF, FaEnvelopeOpenText, FaThumbsUp, FaAndroid, FaArrowRight } from 'react-icons/fa';

// Service data array
const servicesData = [
     {
        icon: FaSearch,
        title: 'SEO Optimization',
        description: 'Maximize your online presence with our top-notch SEO services. We conduct thorough keyword research, optimize your website content, and improve your site’s structure to boost your search engine rankings. Our SEO experts stay up-to-date with the latest algorithm changes to ensure your website ranks higher and attracts organic traffic, ultimately leading to increased conversions and sales.',
        iconBgColor: 'bg-blue-100 dark:bg-blue-900/50',
        iconTextColor: 'text-blue-600 dark:text-blue-400',
    },
    {
        icon: FaLaptopCode,
        title: 'Web Design',
        description: 'Your website is your digital storefront, and we ensure it makes a lasting impression. Our web development team builds responsive, user-friendly, and aesthetically pleasing websites that reflect your brand’s identity. We focus on creating seamless user experiences that encourage visitors to stay longer and explore more, turning them into loyal customers.',
        iconBgColor: 'bg-purple-100 dark:bg-purple-900/50',
        iconTextColor: 'text-purple-600 dark:text-purple-400',
    },
    {
        icon: FaFacebookF,
        title: 'Social Media Marketing',
        description: 'In today\'s digital landscape, social media is a powerful tool for connecting with your audience. We create engaging content, manage your social media accounts, and implement effective campaigns on platforms like Facebook, Instagram, Twitter, LinkedIn, and more. Our goal is to increase your brand visibility and drive engagement through tailored strategies that resonate with your target audience.',
        iconBgColor: 'bg-sky-100 dark:bg-sky-900/50',
        iconTextColor: 'text-sky-600 dark:text-sky-400',
    },
    {
        icon: FaEnvelopeOpenText, // Replaced fa-mail-bulk
        title: 'Email Marketing',
        description: 'Stay connected with your customers through personalized email marketing campaigns. We design, write, and manage email campaigns that nurture leads, promote products, and foster customer loyalty. Our data-driven approach ensures high open rates and click-through rates, driving better results for your business.',
        iconBgColor: 'bg-red-100 dark:bg-red-900/50',
        iconTextColor: 'text-red-600 dark:text-red-400',
    },
    {
        icon: FaThumbsUp,
        title: 'Facebook / Google Ads',
        description: 'Reach your target audience effectively with our expert Facebook and Google Ads services. We create and manage paid ad campaigns that drive traffic, generate leads, and increase sales. Our team continuously monitors and optimizes your ads to ensure maximum ROI, helping you get the most out of your advertising budget.',
        iconBgColor: 'bg-green-100 dark:bg-green-900/50',
        iconTextColor: 'text-green-600 dark:text-green-400',
    },
    {
        icon: FaAndroid, // Using Android as a stand-in for a generic branding icon if needed
        title: 'Branding',
        description: 'Establish a strong and consistent brand identity with our comprehensive branding services. From brand strategy and positioning to logo design and brand guidelines, we help you create a memorable brand that resonates with your audience. Our branding experts ensure your brand stands out in the crowded market and leaves a lasting impression.',
        iconBgColor: 'bg-teal-100 dark:bg-teal-900/50',
        iconTextColor: 'text-teal-600 dark:text-teal-400',
    },
];


const OurServices = () => {
    const sectionRef = useRef(null);
    const titleSectionRef = useRef(null);
    const cardsContainerRef = useRef(null);
    const cardRefs = useRef([]);

    useLayoutEffect(() => {
        // Ensure ScrollTrigger is globally registered first!

        const cards = cardRefs.current.filter(Boolean);
        if (!cards.length || !titleSectionRef.current || !cardsContainerRef.current) {
            console.warn("OurServices: Refs not ready for animation.");
            return;
        }

        const ctx = gsap.context(() => {
            // Animate Title Section
            gsap.from(titleSectionRef.current.children, {
                opacity: 0,
                y: 30,
                duration: 0.6,
                ease: 'power2.out',
                stagger: 0.2,
                scrollTrigger: {
                    trigger: titleSectionRef.current,
                    start: 'top 85%',
                    // markers: true, // For debugging
                }
            });

            // Animate Service Cards
            gsap.fromTo(cards, 
                {opacity:0},
                {
                opacity: 1,
                y: 50,
                duration: 0.5,
                ease: 'power2.out',
                stagger: 0.15,
                scrollTrigger: {
                    trigger: cardsContainerRef.current,
                    start: 'top 80%',
                  // markers: true, // For debugging
                }
            });

        }, sectionRef);

        return () => ctx.revert();

    }, []);

    return (
        <section ref={sectionRef} className="bg-white dark:bg-gray-900 transition-colors duration-300 py-16 lg:py-24">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Title Section */}
                <div ref={titleSectionRef} className="mb-12 lg:mb-16 text-center">
                     <div className="inline-flex items-center justify-center mb-4">
                        <span className="h-0.5 w-10 bg-orange-500 dark:bg-orange-400"></span>
                        <span className="px-3 text-sm font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                            Our Services
                        </span>
                        <span className="h-0.5 w-10 bg-orange-500 dark:bg-orange-400"></span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                        What Solutions We Provide
                    </h1>
                </div>

                {/* Services Grid */}
                <div ref={cardsContainerRef} className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {servicesData.map((service, index) => (
                        <div
                            key={service.title}
                            ref={el => { if (el) cardRefs.current[index] = el; }}
                            className="
                                service-item flex flex-col text-center rounded-lg
                                bg-gray-50 dark:bg-gray-800 shadow-lg p-6 lg:p-8
                                transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1
                                border border-transparent dark:border-gray-700/50
                            "
                        >
                           {/* Icon */}
                           <div className={`
                                service-icon mx-auto mb-6 h-16 w-16 flex items-center justify-center
                                rounded-full flex-shrink-0 transition-colors duration-300
                                ${service.iconBgColor} ${service.iconTextColor}
                            `}>
                                <service.icon className="h-8 w-8" aria-hidden="true" />
                            </div>
                            {/* Title */}
                            <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                                {service.title}
                            </h3>
                            {/* Description */}
                            <p className="m-0 text-base text-gray-600 dark:text-gray-300 flex-grow leading-relaxed">
                                {service.description}
                            </p>
                             {/* Button */}
                             <a
                                href="#" // Add actual link later
                                className="
                                    btn-square mt-6 mx-auto inline-flex items-center justify-center
                                    h-10 w-10 rounded-full bg-orange-500 text-white
                                    transition duration-150 ease-in-out hover:bg-orange-600
                                    focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900
                                "
                                aria-label={`Learn more about ${service.title}`}
                            >
                                <FaArrowRight className="h-4 w-4" />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurServices;