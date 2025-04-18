// Create a new file, e.g., components/ui/AnimatedNumber.jsx
"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

const AnimatedNumber = ({ value }) => {
  const ref = useRef(null);
  // Extract the numeric part and any suffix (like '+')
  const numericValue = parseInt(value.toString().replace(/[^0-9]/g, ""), 10);
  const suffix = value.toString().replace(/[0-9]/g, ""); // Gets '+' or ''

  const motionValue = useMotionValue(0);
  // Use spring for a smoother animation, adjust stiffness/damping as needed
  const springValue = useSpring(motionValue, {
      damping: 60,
      stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" }); // Trigger when 100px into view, run only once

  useEffect(() => {
    if (isInView) {
      // Animate motionValue to the target numericValue when in view
      motionValue.set(numericValue);
    }
  }, [motionValue, isInView, numericValue]);

  useEffect(() => {
    // Update the displayed value smoothly via the spring
    // We use subscribe instead of useTransform(Math.round) for potentially better performance with springs
    const unsubscribe = springValue.on("change", (latest) => {
        if (ref.current) {
            ref.current.textContent = Math.round(latest).toLocaleString() + suffix;
        }
    });
    return unsubscribe; // Cleanup subscription on unmount
  }, [springValue, suffix]);

  // Render a span that will be updated by the effect
  // Initial text is 0 + suffix, motion.span needed for useInView ref
  return <motion.span ref={ref}>{`0${suffix}`}</motion.span>;
};

export default AnimatedNumber;