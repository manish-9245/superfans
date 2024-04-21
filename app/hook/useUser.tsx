"use client";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useQuery } from "@tanstack/react-query";

const initUser = {
  created_at: "",
  first_name: "",
  id:"",
  last_name:"",
  email: "",
  profile_image: "",
  mobile: 0,
  username:""
};

export default function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const supabase = supabaseBrowser();
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        // fetch user information profile
        const { data: user } = await supabase
          .from("users")
          .select("*")
          .eq("id", data.session.user.id)
          .single();

        return user;
      }
      return initUser;
    },
  });
}
