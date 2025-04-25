"use client";
import React from "react";
import AnimatedNumber from "@/components/ui/Animatednumber";
import { motion } from "framer-motion"; 

const StatsSection = () => {
  const stats = [
    { value: "5+", label: "Years Experience" },
    { value: "100+", label: "Team Members" },
    { value: "1000+", label: "Satisfied Clients" }, 
    { value: "500+", label: "Compleate Projects"},
  ];

  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, 
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="bg-[#121212] py-16 md:py-24 transition-colors duration-300">  
      <div className="container mx-auto px-4">
        {/* Title */}
       
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8" 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} 
        >
          {stats.map((stat, index) => (
            
            <motion.div
              key={index}
              className="text-center p-6 rounded-lg  transition-all duration-300 hover:scale-[1.03] hover:shadow-xl border border-transparent " 
              variants={itemVariants} 
            >
              <div className="text-4xl md:text-5xl font-playfair font-bold text-[#eec918] mb-3"> 
                <AnimatedNumber value={stat.value} />
              </div>
              <div className="text-base font-playfair text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default StatsSection;