import { motion } from "framer-motion";
import Image from "next/image";
const slides = [
  { image: "/images/brands/facebook.svg" },
  { image: "/images/brands/Instagram.svg" },
  { image: "/images/brands/tiktok.svg" },
  { image: "/images/brands/snapchat.svg" },
  { image: "/images/brands/twitch.svg" },
  { image: "/images/brands/youtube.svg" },
];
/**
 * Renders a scrolling carousel of brand images.
 */
const BrandScroll = () => {
    const duplicatedSlides = [...slides, ...slides];
    return (
        
      <div
        className="bg-backgroundColorQuaternary relative mx-auto mt-5 h-full overflow-hidden py-12 sm:py-5"
        style={{ width: "80%" }}
      >
        <div className="before:from-backgroundColorQuaternary before:blur-3 after:from-backgroundColorQuaternary after:blur-3 absolute inset-0 z-20 before:absolute before:left-0 before:top-0 before:h-full before:w-1/4 before:bg-gradient-to-r before:to-transparent before:filter after:absolute after:right-0 after:top-0 after:h-full after:w-1/4 after:bg-gradient-to-l after:to-transparent after:filter"></div>

        <motion.div
          className="flex"
          animate={{
            x: ["0%", "-100%"],
            transition: {
              ease: "linear",
              duration: 15,
              repeat: Infinity,
            },
          }}
        >
          {duplicatedSlides.map((slide, index) => (
            <div
              key={index}
              className="flex-shrink-0"
              style={{ width: `${100 / slides.length}%` }}
            >
                  <div className="flex h-full items-center justify-center sm:p-5">
                      <Image
                        src={slide.image}
                        alt="imagesss"
                        width={100}
                        height={100}
                      />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    );
}
export default BrandScroll;