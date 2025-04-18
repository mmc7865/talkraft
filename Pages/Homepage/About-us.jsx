"use client"; // Required for hooks

import React, { useRef, useLayoutEffect } from 'react';
import Image from 'next/image'; // Using Next.js Image component
import { gsap } from 'gsap';
// Ensure ScrollTrigger is registered globally!

// Data for the skills progress bars
const skillsData = [
    { label: 'Digital Marketing', percentage: 85, colorClass: 'bg-purple-600 dark:bg-purple-500' },
    { label: 'SEO & Backlinks', percentage: 90, colorClass: 'bg-yellow-500 dark:bg-yellow-400' },
    { label: 'Design & Development', percentage: 95, colorClass: 'bg-gray-900 dark:bg-gray-200' },
];

const AboutUsSection = () => {
    const sectionRef = useRef(null);
    const imageRef = useRef(null);
    // Refs for elements to animate individually
    const aboutLabelRef = useRef(null);
    const headingRef = useRef(null);
    const paragraphRef = useRef(null);
    const skillsContainerRef = useRef(null); // Ref for the skills container div
    const progressBarRefs = useRef([]);
    const percentageRefs = useRef([]);
    const buttonRef = useRef(null);

    useLayoutEffect(() => {
        // --- Make sure ScrollTrigger is registered globally before this! ---

        // Use gsap.context for easier cleanup
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%', // Start animation when 70% of the section is visible
                    end: 'bottom 80%',
                    // markers: true, // Uncomment this line for debugging trigger points
                    toggleActions: 'play none none none', // Ensure it plays only once on enter forward
                }
            });

            // --- Animate Text Content ---
            tl.from(aboutLabelRef.current, { opacity: 0, x: -50, duration: 0.5, ease: 'power2.out' })
              .from(headingRef.current, { opacity: 0, y: 30, duration: 0.6, ease: 'power2.out' }, "-=0.3") // Overlap slightly
              .from(paragraphRef.current, { opacity: 0, y: 30, duration: 0.6, ease: 'power2.out' }, "-=0.4"); // Overlap more

            // --- Animate Skills Section (Progress Bars & Percentages) ---
            tl.from(skillsContainerRef.current, { opacity: 0, y: 30, duration: 0.5 }, "-=0.4");

            const progressBars = progressBarRefs.current.filter(Boolean);
            const percentages = percentageRefs.current.filter(Boolean);

            if (progressBars.length === skillsData.length && percentages.length === skillsData.length) {
                progressBars.forEach((bar, index) => {
                   const percentageText = percentages[index];
                   const targetPercentage = skillsData[index].percentage;

                   tl.to(bar, {
                       scaleX: targetPercentage / 100,
                       duration: 1.0,
                       ease: 'power2.inOut',
                   }, "-=0.3");

                   let proxy = { value: 0 };
                   tl.to(proxy, {
                       value: targetPercentage,
                       duration: 1.0,
                       ease: 'power2.inOut',
                       snap: { value: 1 },
                       onUpdate: () => {
                           if (percentageText) {
                               percentageText.textContent = `${Math.round(proxy.value)}%`;
                           }
                       }
                   }, "<");
                });
            }

            tl.from(buttonRef.current, { scale: 1, y: 30, duration: 0.5, ease: 'power2.out' }, "-=0.6");

            // --- Animate Image ---
            tl.from(imageRef.current, { opacity: 0, x: 50, duration: 1.2, ease: 'power3.out' }, "-=1.0");

        }, sectionRef); // Scope cleanup to the section

        // Cleanup function runs on component unmount
        return () => ctx.revert();

    }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <section
            ref={sectionRef}
            className="py-16 px-4 bg-white dark:bg-gray-900 transition-colors duration-300 overflow-hidden sm:px-6 lg:px-8 lg:py-24"
        >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 lg:gap-16">

                {/* Left Content Column */}
                <div className="w-full md:w-1/2 order-2 md:order-1 text-center md:text-left">
                    {/* About Us Label */}
                    <div ref={aboutLabelRef} className="inline-flex items-center gap-2 mb-3">
                        <span className="text-sm font-semibold uppercase tracking-wider text-yellow-600 dark:text-yellow-400">
                            About Us
                        </span>
                        <span className="h-0.5 w-10 bg-yellow-600 dark:bg-yellow-400"></span>
                    </div>

                    {/* Heading */}
                    <h2 ref={headingRef} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-5 lg:mb-6 leading-tight">
                        #1 Digital solution with 5 years of experience
                    </h2>

                    {/* Paragraph */}
                    <p ref={paragraphRef} className="text-base lg:text-lg text-gray-600 dark:text-gray-300 mb-8 lg:mb-10 leading-relaxed">
                        Welcome to the Best Digital Marketing Agency, where innovation meets excellence in digital marketing. Founded on the principles of creativity, expertise, and client satisfaction, our agency has been at the forefront of helping businesses thrive in the digital landscape.
                    </p>

                    {/* Skills Progress Bars - Added container ref */}
                    <div ref={skillsContainerRef} className="space-y-5 lg:space-y-6 mb-8 lg:mb-10">
                        {skillsData.map((skill, index) => (
                            <div key={skill.label}>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {skill.label}
                                    </span>
                                    <span ref={el => percentageRefs.current[index] = el} className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        0%
                                    </span>
                                </div>
                                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        ref={el => progressBarRefs.current[index] = el}
                                        className={`h-full rounded-full ${skill.colorClass}`}
                                        style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Read More Button --- opacity-100 removed --- */}
                    <button
                        ref={buttonRef}
                        className="
                            px-8 py-3 bg-purple-600 text-white font-semibold rounded-full shadow-md
                            hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900
                            transition duration-150 ease-in-out transform hover:scale-105
                        "
                    >
                        Read More
                    </button>
                </div>

                {/* Right Image Column */}
                <div ref={imageRef} className="w-full md:w-1/2 order-1 md:order-2 flex justify-center md:justify-end items-center">
                    <Image
                        src="/img/about.png" // CHANGE THIS to your actual image path
                        alt="Team collaborating with world map background"
                        width={600}
                        height={500}
                        className="max-w-full h-auto"
                        priority
                    />
                </div>

            </div>
        </section>
    );
};

export default AboutUsSection;