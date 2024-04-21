import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser";
import ArtistInfo from "./artistInfo";
import { Skeleton } from "../ui/skeleton";
import useUser from "@/app/hook/useUser";

export default function Artist({ id }: { id: string }) {
  const [influencerTask, setInfluencerTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = supabaseBrowser();
  const { data: user } = useUser();
  const router = useRouter();

  const registerRequest = async ({
    customer_id,
    influencer_id,
    task_id,
    due_date,
  }) => {
    const { data, error } = await supabase
      .from("requests")
      .insert([
        {
          customer_id: customer_id,
          influencer_id: influencer_id,
          task_id: task_id,
          due_date: due_date,
        },
      ])
      .select();
    if (error) {
      console.error(error);
      return;
    }
  };

  useEffect(() => {
    const fetchInfluencerTask = async () => {
      try {
        const { data, error } = await supabase
          .from("influencer_tasks")
          .select(
            "name, id, influencer_id, price, currency, short_desc, long_desc, period"
          )
          .eq("influencer_id", id);
        if (error) {
          console.error(error);
          setInfluencerTask(null);
        }
        if (data) {
          setInfluencerTask(data);
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchInfluencerTask();
  }, [id, supabase]);

  const BookLogic = ({ item }) => {
    if (!user?.id) {
      router.push("/signin");
    } else {
      const today = new Date();
      registerRequest({
        customer_id: user.id,
        task_id: item.id,
        influencer_id: item.influencer_id,
        due_date: new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000),
      });
      window.open(
        "https://buy.stripe.com/28o7ukbsud667yo3cc",
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section className="mx-4 sm:mx-6 md:mx-8 lg:mx-12">
        <div className="flex flex-col md:flex-row">
          <div className="items-center md:m-5 md:basis-1/4">
            <ArtistInfo id={id} />
          </div>
          <div className="flex items-center justify-center md:m-5 md:basis-3/4">
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
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
                influencerTask &&
                influencerTask.map((item, idx: React.Key) => (
                  <div
                    className="m-5 flex grow flex-col rounded-lg border bg-opacity-25 bg-[url('/images/explore/bg.avif')] p-5 shadow-lg transition duration-150 ease-in-out hover:scale-105 dark:bg-[url('/images/explore/bgDark.jpeg')]"
                    key={idx}
                  >
                    <div className="flex-grow">
                      <h1 className="text-xl font-bold">{item?.name}</h1>
                      <p>{item?.long_desc}</p>
                    </div>
                    <div className="mt-5 flex flex-row items-end justify-between">
                      <Button
                        className="text-white"
                        onClick={() => BookLogic({ item })}
                      >
                        Book
                      </Button>
                      <h2 className="text-2xl">${item?.price}</h2>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </Suspense>
  );
}
