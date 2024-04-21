"use client";

import Image from "next/image";
import Link from "next/link";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { FiFilter } from "react-icons/fi";

export const Explore = () => {
  const [influencers, setInfluencers] = useState(null);
  const [influencerTaskPrices, setInfluencerTaskPrices] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const supabase = supabaseBrowser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("influencers")
          .select(
            "first_name, last_name, id, tiktok, instagram, description, influencer_tasks(price)"
          );
        if (error) {
          console.error(error);
        } else {
          const priceData = {};
          data.forEach((influencer) => {
            const totalPrice = influencer.influencer_tasks.reduce(
              (acc, curr) => acc + curr.price,
              0
            );
            priceData[influencer.id] = influencer.influencer_tasks.length===0? totalPrice : 
              totalPrice / influencer.influencer_tasks.length;
          });
          setInfluencers(data);
          setInfluencerTaskPrices(priceData);
          setIsLoaded(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [supabase]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    setIsSortMenuOpen(false);
  };

  const handleSortMenuToggle = () => {
    setIsSortMenuOpen(!isSortMenuOpen);
  };

  const filteredInfluencers = influencers?.filter((influencer) => {
    const fullName = `${influencer.first_name} ${influencer.last_name}`;
    return searchTerm === "" || fullName.toLowerCase().includes(searchTerm);
  });

  if (sortBy) {
    filteredInfluencers.sort((a, b) => {
      switch (sortBy) {
        case "price_asc":
          return influencerTaskPrices[a.id] - influencerTaskPrices[b.id];
        case "price_desc":
          return influencerTaskPrices[b.id] - influencerTaskPrices[a.id];
        default:
          return 0;
      }
    });
  }

  return (
    <div className="mx-auto px-4">
      <div className="mb-5 mt-10 flex justify-center">
        <div className="flex w-full max-w-xl items-center space-x-2 sm:max-w-md">
          <Input
            type="text"
            className="bg-gray-50 border-gray-300 dark:border-gray-700 w-full rounded-md border focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 dark:bg-transparent dark:text-white"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleChange}
          />
          <div className="relative">
            <button
              className="bg-gray-50 border-gray-300  dark:border-gray-700 flex gap-1 rounded-md border px-2 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 dark:bg-transparent dark:text-white sm:px-1 sm:py-1"
              onClick={handleSortMenuToggle}
            >
              Sort
              <FiFilter className="h-6 w-5" />
            </button>
            {isSortMenuOpen && (
              <div className="absolute right-0 z-10 mt-2 w-52 origin-top-right rounded-md bg-white shadow-lg dark:bg-dark">
                <div className="py-1">
                  <button
                    className="text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white-700 block px-4 py-2 text-sm"
                    onClick={() => handleSortChange("price_asc")}
                  >
                    Sort by Price: Low to High
                  </button>
                  <button
                    className="text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 block px-4 py-2 text-sm"
                    onClick={() => handleSortChange("price_desc")}
                  >
                    Sort by Price: High to Low
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {isLoaded && (
        <div className="md:not:lg:grid-cols-3 m-7 mt-10 grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
          {filteredInfluencers &&
            filteredInfluencers.map((item, idx) => (
              <div
                className=" dark:shadow-lg-white block grow rounded-lg border p-6 shadow-lg transition duration-150 ease-in-out hover:scale-105 sm:m-5 md:m-5"
                key={idx}
              >
                <Image
                  className="rounded-t-lg p-1"
                  src="/images/explore/creator.png"
                  alt="product image"
                  width={200}
                  height={200}
                  layout="responsive"
                />
                <div className="pb-1">
                  <h5 className="text-gray-900 m-2 text-xl font-semibold tracking-tight dark:text-white">
                    {item.first_name + " " + item.last_name}
                  </h5>
                  <p className="m-2">{item?.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900 m-2 basis-1/2 text-xl font-bold dark:text-white">
                      $ {influencerTaskPrices[item.id].toFixed(2)}
                    </span>
                    <Link
                      href={"/explore/artist/" + item.id}
                      aria-labelledby="know-more"
                      className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border-2 p-4 px-6 py-3 font-medium shadow-md transition duration-300 ease-out"
                    >
                      <span className="bg-purple-500 ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center text-black duration-300 group-hover:translate-x-0 dark:text-white">
                        <svg
                          className="sm:h-6 sm:w-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          ></path>
                        </svg>
                      </span>
                      <span className="text-purple-500 ease absolute flex h-full w-full transform items-center justify-center transition-all duration-300 group-hover:translate-x-full sm:text-center md:text-center lg:text-center">
                        Know More
                      </span>
                      <span className="invisible relative">Button Text</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {!filteredInfluencers?.length && searchTerm && isLoaded && (
        <p className="text-gray-700 mt-4 text-center">
          No influencers match {searchTerm}
        </p>
      )}
    </div>
  );
};
