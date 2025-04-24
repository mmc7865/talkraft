"use client"; // Directive for Next.js App Router

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
// Optional: Import icons (e.g., from react-icons)
// import { FiSun, FiMoon } from 'react-icons/fi';

const Contact = () => {
  // State remains the same for dark mode toggle logic

  const formContainerRef = useRef(null);

  // --- Dark Mode Logic (using 'class' strategy) ---
 

  // Update HTML class and localStorage when state changes

  useEffect(() => {
    if (!formContainerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.form-heading', { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.2 });
      tl.fromTo('.form-element', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 }, "-=0.4");
      tl.fromTo('.submit-button-wrapper', { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.7)' }, "-=0.4");
    }, formContainerRef);
    return () => ctx.revert(); // Cleanup GSAP animations
  }, []); // Run only on mount

  // --- Form Submission Handler ---
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    console.log('Form data:', data);
    alert('Sending form data (check console)! Replace with your actual API call.');

    // --- Example API Call Placeholder ---
    // try {
    //   const response = await fetch('/api/contact', { // Your API endpoint
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data),
    //   });
    //   if (response.ok) {
    //     alert('Message sent successfully!');
    //     event.target.reset(); // Reset form on success
    //   } else {
    //     alert('Failed to send message. Please try again.');
    //   }
    // } catch (error) {
    //   console.error('Form submission error:', error);
    //   alert('An error occurred. Please try again.');
    // }
    // --- End Example ---
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 py-12 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-950">
      <section
        ref={formContainerRef} // Ref for GSAP context
        className="w-full max-w-lg p-8 md:p-10 bg-white dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700/50"
      >
        {/* Heading with animation class + styling */}
        <h2 className="form-heading text-3xl sm:text-4xl font-bold text-center text-gray-800 dark:text-white mb-8 sm:mb-10 opacity-0 transform -translate-y-8">
          Get In Touch
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field - with animation class + styling */}
          <div className="form-element opacity-0 transform translate-y-6">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition duration-200"
            />
          </div>

          {/* Email Field - with animation class + styling */}
          <div className="form-element opacity-0 transform translate-y-6">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition duration-200"
            />
          </div>

          {/* Subject Field - with animation class + styling */}
          <div className="form-element opacity-0 transform translate-y-6">
            <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="What's this about?"
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition duration-200"
            />
          </div>

          {/* Message Field - with animation class + styling */}
          <div className="form-element opacity-0 transform translate-y-6">
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Tell us more..."
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition duration-200 resize-none" // Added resize-none
            ></textarea>
          </div>

          {/* Submit Button - with animation class + styling */}
          <div className="submit-button-wrapper pt-4 opacity-0 transform scale-90">
            <button
              type="submit"
              className="w-full px-6 py-3.5 text-base font-semibold text-center text-white bg-indigo-600 dark:bg-indigo-500 rounded-lg shadow-md hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
            >
              Send Message
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Contact;