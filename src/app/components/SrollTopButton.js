import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isMdScreen = useMediaQuery({ minWidth: 768 });
  const isSmScreen = useMediaQuery({ maxWidth: 767 });
  const isBaseScreen = useMediaQuery({ maxWidth: 639 });

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const toggleVisibility = () => {
    if (isMdScreen || isSmScreen || isBaseScreen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const buttonStyle = {
    position: "absolute",
    bottom: "40px",
    right: "20px",
    zIndex: "9999",
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "block",
    cursor: "pointer",
  };

  return (
    <button
      className="scroll-to-top-button"
      style={buttonStyle}
      onClick={scrollToTop}
    >
      &#9650;
    </button>
  );
};

export default ScrollToTopButton;
