"use client";
import { motion } from "framer-motion";
import chroma from "chroma-js";

interface CubeProps {
  size?: number;
  color?: string;
  opacity?: number;
  rotation?: string;
  dragConstraints?: {
    left?: number;
    top?: number;
    right?: number;
    bottom?: number;
  };
  dragElastic?: number;
  dragTransition?: {
    bounceStiffness: number;
    bounceDamping: number;
  };
  dropShadow?: boolean;
}

function generateCubeColors(color: any) {
  const light = color;
  const medium = chroma(color).darken(0.3).hex();
  const dark = chroma(color).darken(0.8).hex();
  return { light, medium, dark };
}

const Cube = ({
  size = 100,
  color = "#0D8E77",
  opacity,
  rotation,
  dragConstraints = { left: 15, right: 15, top: 15, bottom: 15 },
  dragElastic = 0.5,
  dragTransition = { bounceStiffness: 500, bounceDamping: 10 },
  dropShadow = true,
}: CubeProps) => {
  const { light, medium, dark } = generateCubeColors(color);

  return (
    <motion.div
      className={`${dropShadow && "drop-shadow-2xl"} w-fit h-fit`}
      drag
      dragConstraints={dragConstraints}
      dragElastic={dragElastic}
      dragTransition={dragTransition}
    >
      <svg
        style={{ opacity: opacity, transform: `rotate(${rotation}deg)` }}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size - 14}
        fill="none"
        viewBox="0 0 100 86"
      >
        <path
          fill={dark}
          d="M49.383 40.968l50.588-3.974-20.201 42.66-50.588 3.973 20.2-42.659z"
        ></path>
        <path
          fill={medium}
          d="M20.73 4.49l28.651 36.475-20.2 42.659L.528 47.149 20.73 4.49z"
        ></path>
        <path
          fill={light}
          d="M20.732 4.497L71.32.524l28.65 36.474-50.587 3.974L20.732 4.497z"
        ></path>
      </svg>
    </motion.div>
  );
};

export default Cube;
