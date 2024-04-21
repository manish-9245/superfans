import React, { useEffect, useState } from "react";
import Image from "next/image";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { Skeleton } from "@/components/ui/skeleton";
import { SocialIcon } from "react-social-icons";
import { useTheme } from "next-themes";

/**
 * Renders the artist information.
 *
 * @param {Object} props - The component props.
 * @param {string} props.id - The ID of the artist.
 * @returns {JSX.Element} The rendered artist information.
 */
export default function ArtistInfo({ id }: { id: string }) {
  const { theme } = useTheme();
  const supabase = supabaseBrowser();
  const [artist, setArtist] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const { data, error } = await supabase
          .from("influencers")
          .select("first_name, last_name, id, tiktok, instagram, description")
          .eq("id", id);
        if (error) {
          console.error(error);
          setArtist(null);
        }
        if (data) {
          setArtist(data[0]);
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchArtist();
  }, [id,supabase]);

  return (
    <div>
      {isLoading ? (
        <>
          <Skeleton className="skeleton-image h-[200] w-[200] rounded-t-lg bg-white p-1" />
          <div className="pb-1">
            <Skeleton className="skeleton-text m-2 text-xl font-semibold tracking-tight dark:text-white" />
            <Skeleton className="skeleton-text m-2" />
            <div className="flex items-center justify-between">
              <Skeleton className="skeleton-text text-gray-900 m-2 basis-1/2 text-xl font-bold dark:text-white" />
              <Skeleton className="skeleton-button w- m-2 grow rounded-md bg-primary p-3 text-center text-sm transition duration-150 ease-in-out hover:scale-105 dark:text-white sm:px-2 sm:py-1" />
            </div>
          </div>
        </>
      ) : (
        artist && (
          <div className="flex flex-col items-center">
            <Image
              src="/images/explore/creator.png"
              alt="artist"
              width={200}
              height={200}
              className="mx-auto rounded-full"
            />
            <h1 className="sm:3xl mt-5 text-center text-3xl font-bold md:text-3xl">
              {artist?.first_name + " " + artist?.last_name}
            </h1>
            <p className="text-center text-xl md:text-xl">
              {artist?.description}
            </p>
            <div>
              {artist?.instagram && (
                <SocialIcon
                  url={`https://www.instagram.com/` + artist?.instagram}
                  fgColor={theme === "dark" ? "white" : "black"}
                  bgColor="transparent"
                />
              )}
              {artist?.tiktok && (
                <SocialIcon
                  url={`https://www.tiktok.com/` + artist?.tiktok}
                  fgColor={theme === "dark" ? "white" : "black"}
                  bgColor="transparent"
                />
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
}
