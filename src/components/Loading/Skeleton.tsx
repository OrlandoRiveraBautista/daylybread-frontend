import React from "react";

import "./Skeleton.scss";

/**
 * Interface for skeleton
 * height: string (pixels)
 * width: string (pixels)
 * shape: "square" | "round"
 */
interface ISkeleton {
  height: string;
  width: string;
  shape: "square" | "round";
}

const Skeleton: React.FC<ISkeleton> = ({ height, width, shape }: ISkeleton) => {
  const styles = {
    height: height,
    width: width,
    borderRadius: shape === "round" ? "100%" : "12px",
  };
  return <div style={styles} className="animated-background"></div>;
};

export default Skeleton;
