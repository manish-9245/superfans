"use client";

import { supabaseBrowser } from "@/lib/supabase/browser";
import useUser from "@/app/hook/useUser";
import { useEffect, useState } from "react";
import Image from "next/image";

export type Bookings = {
  amount: number;
  dueDate: string;
  createdDate: string;
  task: string;
  status: string;
  paymentMode: string;
  creator: string;
  currency?: string;
};

export function BookingDashboard() {
  const [bookedTask, setBookedTask] = useState<Bookings[]>(null);
  const supabase = supabaseBrowser();
  const { data: userData } = useUser();

  useEffect(() => {
    const fetchBookedTask = async () => {
      if (!userData || !userData?.id) return;

      const { data, error } = await supabase
        .from("requests")
        .select(
          "task_id, due_date, payment_mode, status, created_at, influencer_id"
        )
        .eq("customer_id", userData.id);

      if (error) {
        setBookedTask(null);
        console.error(error);
        return;
      }

      if (!data || data.length === 0) {
        setBookedTask([]);
        return;
      }

      const bookings = await Promise.all(
        data.map(async (entry) => {
          const { task_id, influencer_id, ...rest } = entry;
          const taskDetails = await supabase
            .from("influencer_tasks")
            .select("name, price, currency")
            .eq("id", task_id)
            .single();

          const influencerDetails = await supabase
            .from("influencers")
            .select("first_name, last_name")
            .eq("id", influencer_id)
            .single();

          if (!taskDetails || !influencerDetails) {
            console.error(
              "Error fetching details for task:",
              task_id,
              "or influencer:",
              influencer_id
            );
            return null;
          }

          return {
            dueDate: new Date(rest?.due_date).toDateString(),
            createdDate: new Date(rest?.created_at).toDateString(),
            task: taskDetails?.data?.name || "",
            status: rest?.status,
            paymentMode: rest?.payment_mode,
            amount: taskDetails?.data?.price || 0,
            currency: taskDetails?.data?.currency || "",
            creator: `${influencerDetails?.data?.first_name || ""} ${
              influencerDetails?.data?.last_name || ""
            }`,
          };
        })
      );

      const filteredBookings = bookings.filter((entry) => entry !== null);
      setBookedTask(filteredBookings);
    };

    fetchBookedTask();
  }, [userData, supabase]);

  return (
    <section className="relative mt-16 min-h-screen overflow-hidden pt-16 md:pt-20">
      <h1 className="animate-gradient-x mx-auto bg-gradient-to-r from-[#9d79e6] to-[#037bf3] bg-clip-text p-4 text-center text-3xl font-bold text-transparent dark:from-[#79d2e6] dark:to-[#de50de] sm:text-4xl md:text-5xl">
        Your Bookings
      </h1>
      {bookedTask && (
        <div className="m-10 grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 lg:p-24">
          {bookedTask.map((booking) => (
            <div
              key={booking.task}
              className="dark:hover:shadow-2xl-white flex flex-col overflow-hidden rounded-lg border bg-transparent shadow-lg transition-shadow duration-300 hover:shadow-2xl md:flex-row"
            >
              <div className="relative w-full md:w-full lg:w-1/5">
                <Image
                  className="h-full w-full rounded-lg object-cover"
                  src="/images/hero/khaby.jpeg"
                  alt=""
                  width={300}
                  height={300}
                />
              </div>
              <div className="flex-grow p-4 leading-normal md:w-full lg:w-1/2">
                <h4 className="animate-gradient-x bg-gradient-to-r from-[#9d79e6] to-[#037bf3] bg-clip-text text-3xl font-bold text-transparent dark:from-[#79d2e6] dark:to-[#de50de] sm:text-3xl md:text-3xl">
                  {booking.creator}
                </h4>
                <h6 className="animate-gradient-x bg-gradient-to-r from-[#605d5d] to-[#ffffff] bg-clip-text text-2xl font-bold text-transparent dark:from-[#c379e6] dark:to-[#f8ff1f] sm:text-2xl md:text-2xl">
                  {booking.task}
                </h6>
                <hr className="my-8 h-px border-0 bg-black dark:bg-white"></hr>
                <p className="animate-gradient-x bg-gradient-to-r from-[#408863] via-[#6dffa7] to-[#d9ff00] bg-clip-text text-3xl font-bold text-transparent dark:from-[#79d66f] dark:to-[#f7ff0a] sm:text-xl md:text-xl">
                  {booking.status}
                </p>
                <div className="mt-2 gap-2 grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2">
                  <p className="text-gray-700 dark:text-gray-400 mb-3 font-normal">
                    <span className="font-bold">Created:</span>{" "}
                    {booking.createdDate.substring(4)}
                  </p>
                  <p className="text-gray-700 dark:text-gray-400 mb-3 font-normal">
                    <span className="font-bold">Due:</span>{" "}
                    {booking.dueDate.substring(4)}
                  </p>
                  <p className="text-gray-700 dark:text-gray-400 mb-3 font-normal">
                    <span className="font-bold">Payment Mode:</span>{" "}
                    {booking.paymentMode}
                  </p>
                  <p className="mb-3 text-2xl font-extrabold">
                    {booking.amount} {booking.currency}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default BookingDashboard;


