"use client"; // Required for useEffect and useRef

import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const HeroSection = () => {
  // Refs for elements to animate
  const sectionRef = useRef(null);
  const headingRef = useRef(null); // Ref for the heading group
  const paragraphRef = useRef(null);
  const buttonsRef = useRef(null);
  const imageRef = useRef(null);
  const head =  useRef(null)
 
  gsap.registerPlugin(ScrollTrigger)

  useEffect(() => {
    // Ensure GSAP and refs are available

    gsap.from(head.current.children,{
      y:-50,
      opacity:0,
      duration:0.8,
      stagger: -0.3

    })

    if (sectionRef.current && headingRef.current && paragraphRef.current && buttonsRef.current && imageRef.current) {

      // Target individual heading lines for stagger
      const headingLines = headingRef.current.children;
      const paragraphElement = paragraphRef.current;
      const buttonElements = buttonsRef.current.children;
      const imageElement = imageRef.current;

      // Combine left side elements for animation sequence
      const leftElements = [ paragraphElement, ...buttonElements];

      // Set initial states (off-screen below and invisible)
      gsap.set(leftElements, { y: 50, opacity: 0 }); // Start below
      gsap.set(imageElement, { y: 50, opacity: 0 }); // Start below

      // Create a GSAP timeline for better control (optional but good practice)
      const tl = gsap.timeline({ delay: 0.3,scrub:true }); // Small delay after page load/navbar anim

     

      tl.to(leftElements, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15, // Stagger the appearance of heading lines, paragraph, buttons
      });

      // Animate right side image (slightly delayed relative to the start of left side)
      tl.to(imageElement, {
        y: 0,
        opacity: 1,
        duration: 1, // Slightly longer duration for image
        ease: 'power3.out',
      }, "-=0.6"); // Start this animation 0.6s before the left side finishes
    }

    
  }, []); // Run only once on mount

  return (
    <div
      ref={sectionRef}
      className="
        flex flex-col md:flex-row items-center
        min-h-[calc(100vh-80px)] // Adjust 80px based on your actual Navbar height
        px-6 py-12 md:px-16 md:py-16
        bg-white dark:bg-gray-900
        text-black dark:text-white
        overflow-hidden // Important: Hide elements animating from outside
        transition-colors duration-300 ease-in-out
      "
    >
      {/* Left Content Area */}
      <div className="left w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0 md:pr-10 order-2 md:order-1">
        {/* Heading Group - Add Ref */}
        <div ref={headingRef} className="mb-4 md:mb-6">
          {/* Using spans inside h1 for better semantics and individual animation */}
          <h1 ref={head} className="text-3xl sm:text-4xl lg:text-[45px] font-bold leading-tight text-gray-900 dark:text-white">
            <span className="block">A Best Digital Agency Of</span>
            <span className="block text-blue-600 dark:text-blue-400">Inteligents & Creative</span>
            <span className="block">People</span>
          </h1>
        </div>

        {/* Paragraph - Add Ref */}
        <p ref={paragraphRef} className="mb-6 md:mb-8 text-base md:text-lg text-gray-700 dark:text-gray-300">
          Welcome to the Best Digital Marketing Agency, where your business's growth and success are our top priorities. We specialize in a comprehensive range of digital marketing services tailored to meet your unique needs. Our team of experts is dedicated to helping you achieve your goals with innovative strategies and cutting-edge technology. Here’s how we can help:
        </p>

        {/* Buttons Container - Add Ref */}
        <div ref={buttonsRef} className="buttons flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <button
            className="
              px-6 py-2.5 bg-blue-600 text-white font-medium rounded-md shadow-md
              hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900
              transition duration-150 ease-in-out
            "
          >
            Read More
          </button>
          <button
            className="
              px-6 py-2.5 bg-transparent border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-medium rounded-md shadow-sm
              hover:bg-blue-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900
              transition duration-150 ease-in-out
            "
          >
            Contact Us
          </button>
        </div>
      </div>

      {/* Right Image Area - Add Ref to container */}
      <div ref={imageRef} className="right w-full md:w-1/2 flex justify-center items-center order-1 md:order-2">
        <Image
          src="/img/hero.png" // Ensure this path is correct (in /public/img/hero.png)
          alt="Digital agency team working" // More descriptive alt text
          width={500} // Intrinsic width
          height={500} // Intrinsic height
          className="max-w-full h-auto rounded-lg" // Tailwind classes for responsiveness
          priority // Consider adding priority if it's LCP
        />
      </div>
    </div>
  );
};

export default HeroSection;