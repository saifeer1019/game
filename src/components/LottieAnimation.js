import { useEffect, useRef } from "react";
import lottie from "lottie-web";

const LottieAnimation = ({ animationData, loop = true, autoplay = true, className = "" }) => {
  const container = useRef(null);

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: container.current,
      renderer: "svg", // Options: 'svg', 'canvas', 'html'
      loop,
      autoplay,
      animationData,
    });

    return () => animation.destroy(); // Cleanup on unmount
  }, [animationData, loop, autoplay]);

  return <div ref={container} className={className}></div>;
};

export default LottieAnimation;
