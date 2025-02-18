"use client";

import React from "react";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Profile from "./Profile";
import { useUser } from "@clerk/nextjs";
import { setSearchParam } from "@/lib/tools";

const Navbar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [drawerType, setDrawerType] = useState<string | null>(null);
  

  const { user } = useUser();

  const handleOpenProfile = () => {
    if (!user) {
      setSearchParam(router, "drawer", "se-connecter");
    } else {
      setSearchParam(router, "drawer", "mon-compte");
    }
  }

  useEffect(() => {
    const drawer = searchParams.get("drawer");
    if (drawer) {
      setDrawerType(drawer);
    }
  }, [searchParams]);

  return (<>
    <div className="flex justify-center items-center p-4 h-16 w-full">
      <Link href="/">
        <h1 className="text-md font-bold">
          L&apos;Assiette Futée
        </h1>
      </Link>
      <Button variant="ghost" className="absolute right-3" onClick={handleOpenProfile}>
        <Menu />
      </Button>
    </div>
      {/* <UserButton /> clerk addon*/}
    {drawerType === "mon-compte" && <>
      <Profile />
    </>}
  </>
  );
};

export default Navbar;
