"use client";

import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Profile from "./Profile";
import { useUser } from "@clerk/nextjs";

const Navbar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [drawerType, setDrawerType] = useState<string | null>(null);

  const { user } = useUser();

  const handleOpenProfile = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (!user) {
      params.set("drawer", "se-connecter");
      router.push(`?${params.toString()}`, { scroll: false });
      return;
    }

    if (params.get("drawer") === "mon-compte") {
      params.delete("drawer");
    } else {
      params.set("drawer", "mon-compte");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  }

  useEffect(() => {
    const drawer = searchParams.get("drawer");
    if (drawer) {
      setDrawerType(drawer);
    }
  }, [searchParams]);

  return (<>
    <div className="flex justify-center items-center p-4 h-16">
      <h1 className="text-md font-bold">
        L&apos;Assiette Futée
      </h1>
      <Button variant="ghost" className="absolute right-3" onClick={handleOpenProfile}>
        <Menu />
      </Button>
    </div>
      {/* <UserButton /> clerk addon*/}
    {drawerType === "mon-compte" && <>
      <Profile 
        open={searchParams.get("drawer") === "mon-compte"} 
        onOpenChange={handleOpenProfile} 
      />
    </>}
  </>
  );
};

export default Navbar;
