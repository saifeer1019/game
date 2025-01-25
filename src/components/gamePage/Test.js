"use client"; // Required for client-side interactivity in Next.js App Router

import { useEffect, useRef } from "react";

const SwipeComponent = () => {
  const swipeRef = useRef(null);

  useEffect(() => {
    if (!swipeRef.current) return;

    // Debug: Check if touch events are detected
    const element = swipeRef.current;
    element.addEventListener("touchstart", () => {
      console.log("Touch detected!");
    });

    // Dynamically import Hammer.js
    import("hammerjs").then(({ default: Hammer }) => {
      // Initialize Hammer.js
      const hammerInstance = new Hammer(element, {
        recognizers: [
          [Hammer.Swipe, { direction: Hammer.DIRECTION_ALL }], // Enable all directions
        ],
      });

      // Add swipe event listeners
      hammerInstance.on("swipeleft", () => {
        console.log("Swiped left!");
      });

      hammerInstance.on("swiperight", () => {
        console.log("Swiped right!");
      });

      hammerInstance.on("swipeup", () => {
        console.log("Swiped up!");
      });

      hammerInstance.on("swipedown", () => {
        console.log("Swiped down!");
      });

      // Debug: Log Hammer instance
      console.log("Hammer initialized:", hammerInstance);
    });

    // Cleanup
    return () => {
      element.removeEventListener("touchstart", () => {});
    };
  }, []);

  return (
    <div
      ref={swipeRef}
      style={{
        width: "100%",
        height: "200px",
        backgroundColor: "lightblue",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "24px",
        touchAction: "none", // Ensure touch events are not blocked
      }}
    >
      Swipe me!
    </div>
  );
};

export default SwipeComponent;