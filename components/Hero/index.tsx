"use client";
import Image from "next/image";
import { useTheme } from "next-themes";
import { HeroScrollDemo } from "./HeroScroll";
import { AnimatedTooltipPreview } from "./heroTooltip";
import BrandScroll from "./brandsScroll";
import ImageGrid from "./imageGrid";
import Link from "next/link";
import { ArrowUpRightFromSquare } from "lucide-react";

/**
 * Renders the Hero section of the application.
 * The Hero section displays personalized services from favorite creators.
 * It includes an animated tooltip preview, an image grid, and a brand scroll.
 * The section also includes a HeroScrollDemo component and three sections with text and images.
 */

const Hero = () => {
  const theme = useTheme();
  return (
    <>
      <section
        id="about"
        className="relative mt-16 min-h-screen overflow-hidden pt-16 md:pt-20"
      >
        <h1 className="animate-gradient-x mx-auto bg-gradient-to-r from-[#9d79e6] to-[#037bf3] bg-clip-text p-4 text-center text-3xl font-bold text-transparent dark:from-[#79d2e6] dark:to-[#de50de] sm:text-4xl md:text-5xl">
          Personalized services from your favorite creators
        </h1>
        <AnimatedTooltipPreview />
        <ImageGrid />
        <div className="flex justify-center mt-10">
          <Link
            href="/explore"
            aria-labelledby="get-started-button"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg p-0.5 font-bold"
          >
            <span className="absolute h-full w-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05]"></span>
            <span className="bg-gray-900 duration-400 relative rounded-md px-6 py-3 transition-all ease-out group-hover:bg-opacity-0">
              <span className="relative text-white flex gap-3">Get Started<ArrowUpRightFromSquare /></span>
            </span>
          </Link>
        </div>
      </section>
      <HeroScrollDemo />
      <section className="py-16 md:py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2">
              <div
                className="wow fadeInUp relative mx-auto mb-12 aspect-[25/24] max-w-[500px] text-center sm:mb-0 sm:aspect-auto sm:max-w-full lg:m-0"
                data-wow-delay=".15s"
              >
                <Image
                  src="/images/hero/hero1.png"
                  alt="about image"
                  width={500}
                  height={500}
                  className="hover:bg-violet-600 active:bg-violet-700 focus:ring-violet-300 focus:outline-none focus:ring"
                />
              </div>
            </div>
            <div className="w-full px-4 lg:w-1/2">
              <div
                className="wow fadeInUp max-w-[470px] lg:max-w-none"
                data-wow-delay=".2s"
              >
                <div className="mb-9">
                  <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                    Unlock Personalized Connections
                  </h3>
                  <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                    Dive into a world where you`&apos;`re just a message away
                    from your favorite superstar. From personalized videos to
                    heartfelt notes, we`&apos;`re here to bridge the gap between
                    you and the stars you love.
                  </p>
                </div>
                <div className="mb-9">
                  <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                    Elevate Every Occasion{" "}
                  </h3>
                  <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                    Whether it`&apos;`s a milestone celebration or just because,
                    SuperFans is your go-to for adding a touch of stardom to
                    life`&apos;`s everyday moments. Let`&apos;`s turn ordinary
                    into extraordinary, together.
                  </p>
                </div>
                <div className="mb-1">
                  <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                    Join the SuperFans Family
                  </h3>
                  <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                    Become part of our vibrant community, where fandom knows no
                    bounds. Follow us for exclusive updates, behind-the-scenes
                    peeks, and a front-row seat to the magic of SuperFans.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
