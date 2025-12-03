"use client";
import { motion } from "framer-motion";
import { container } from "@/app/lib/motion";

export default function MotionSection({ className = "", children, id, ariaLabel }) {
  return (
    <motion.section
      id={id}
      aria-label={ariaLabel}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
      className={className}
    >
      {children}
    </motion.section>
  );
}
