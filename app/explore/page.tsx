
import { Explore } from "@/components/Explore/explore";

const ExplorePage = () => {
    
  return (
    <>
      <section className="relative mt-16 min-h-screen overflow-hidden pt-16 md:pt-20">
        <h1 className="animate-gradient-x mx-auto bg-gradient-to-r from-[#9d79e6] to-[#037bf3] bg-clip-text p-4 text-center text-3xl font-bold text-transparent dark:from-[#79d2e6] dark:to-[#de50de] sm:text-4xl md:text-5xl">
          Explore Creators
        </h1>
        <Explore />
      </section>
    </>
  );
};
export default ExplorePage;
