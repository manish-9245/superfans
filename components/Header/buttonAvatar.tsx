/**
 * Dropdown component for displaying user avatar and options.
 *
 * @component
 * @param {string} imgSource - The source URL of the avatar image.
 * @param {string} name - The name of the user.
 */
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

interface DropdownProps {
  imgSource: string;
  name: string;
}

const Dropdown: React.FC<DropdownProps> = ({ imgSource, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = async () => {
    const supabase = supabaseBrowser();
    queryClient.clear();
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div id="dropdown" className="relative inline-block">
      <button
        onClick={handleClick}
        className="bg-gray-800 hover:bg-gray-700 focus:shadow-outline active:bg-gray-900 inline-flex items-center rounded-lg py-2 pl-6 pr-2 font-semibold text-black focus:outline-none dark:text-white"
      >
        <Image
          className="flex-no-shrink h-10 w-10 rounded-full object-cover"
          src={imgSource}
          alt=""
          width={200}
          height={200}
        />
        <svg
          className="ml-2 h-6 w-6 text-black dark:text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z" />
        </svg>
      </button>

      <div
        className={`absolute right-0 w-64 origin-top-right transform overflow-hidden text-left transition duration-150 ease-in-out ${
          isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        <div className="dark:border-2-black dark:border-pink-600 rounded-lg border-2  bg-white shadow-lg dark:bg-[url('/images/explore/bgDark.jpeg')]">
          <div className="flex items-center px-6 py-4">
            <Image
              className="flex-no-shrink h-10 w-10 rounded-full object-cover"
              src={imgSource}
              alt=""
              width={200}
              height={200}
            />
            <div className="ml-4">
              <p className="text-gray-900 font-semibold leading-none dark:text-white">
                {name}
              </p>
            </div>
          </div>
          <button
            className="px-6 py-3  text-left leading-tight transition duration-150 ease-in-out hover:scale-105 dark:text-white hover:text-red-500"
            onClick={handleLogout}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;