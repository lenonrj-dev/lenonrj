"use client";

import type { ElementType, ReactNode } from "react";
import { motion } from "framer-motion";
import { item } from "@/app/lib/motion";

type MotionCardProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

export default function MotionCard({ as: Tag = "article", className = "", children }: MotionCardProps) {
  const Component = Tag as ElementType;
  return (
    <motion.div variants={item} className={className} role={Tag === "article" ? "article" : undefined}>
      <Component>{children}</Component>
    </motion.div>
  );
}
