"use client";

import { useEffect } from "react";
import useDrawer from "@/app/store/drawer";
import { useSearchParams } from "next/navigation";

///// EXPLANATION /////
// This component is used to initialize the drawer type
// It is used to open the drawer when the user navigates to the page
// It is also used to close the drawer when the user navigates to the page
// It is used to set the drawer type when the user navigates to the page
// It is used to close the drawer when the user navigates to the page


const DrawerManager = () => {
  const searchParams = useSearchParams();
  const drawer = searchParams.get("drawer");

  const { setDrawerType } = useDrawer();

  useEffect(() => {
    if (drawer) {
      setDrawerType(drawer);
    } else {
      setDrawerType(null);
    }
  }, [drawer, setDrawerType]);

  return null;
};

export default DrawerManager;
