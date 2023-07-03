import { UpArrow } from "@/shared/lib/image-config";
import Image from "next/image";
import { useState, useEffect } from "react";


const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      className={`${
        isVisible ? "opacity-100" : "opacity-0"
      } fixed bottom-4 right-20 bg-primary text-white rounded-full p-5 transition-opacity duration-300 hover:bg-green-500`}
      onClick={scrollToTop}
    >
      <Image
        src={UpArrow}
        height={20}
        width={20}
      />
    </button>
  );
};

export default ScrollToTopButton;
