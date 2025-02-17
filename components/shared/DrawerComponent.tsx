"use client";

import React from "react";
import { SignIn, SignUp, useUser } from '@clerk/nextjs'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useDrawer from "@/app/store/drawer";
import { setSearchParam } from "@/lib/tools";
import Cart from "../drawers/Cart";
import { DrawerContent, DrawerHeader, DrawerTitle } from "../ui/drawer";
import { Drawer } from "../ui/drawer";
import useBetterMediaQuery from "@/lib/hooks/useBetterMediaQuery";

const DrawerComponent = () => {

    const { drawerType } = useDrawer();
    const router = useRouter();
    const handleOpenChange = () => {
        setSearchParam(router, "drawer", null);
    }

    const isDesktop = useBetterMediaQuery("(min-width: 640px)");

    useEffect(() => {
        console.log('isDesktop', isDesktop)
    }, [isDesktop])

    return (
        <>
            <DrawerButton />

            {/* Login and Signup modal */}
            <Dialog open={!!drawerType && (drawerType === "se-connecter" || drawerType === "creer-un-compte") || drawerType === "panier"} onOpenChange={handleOpenChange} >
                <DialogContent className="flex justify-center items-center bg-transparent border-none">
                    <DialogTitle className="text-center hidden"></DialogTitle>
                    {drawerType === "se-connecter" && <SignIn routing="virtual" withSignUp={false} signUpUrl="?drawer=creer-un-compte" />}
                    {drawerType === "creer-un-compte" && <SignUp routing="virtual" signInUrl="?drawer=se-connecter" />}
                </DialogContent>
            </Dialog>

            {/* Modals for desktop */}
            {
                isDesktop ? <Dialog open={!!drawerType && (drawerType === "panier")} onOpenChange={handleOpenChange} >
                    <DialogContent className="border-none h-50">
                        <DialogHeader>
                            <DialogTitle className="text-center">Mon panier</DialogTitle>
                        </DialogHeader>
                        <Cart />
                    </DialogContent>
                </Dialog>
                    :
                    <Drawer open={!!drawerType && (drawerType === "panier")} onOpenChange={handleOpenChange}>
                        <DrawerContent className="flex justify-center items-center bg-white border-none h-50">
                            <DrawerHeader>
                                <DrawerTitle className="text-center">Mon panier</DrawerTitle>
                            </DrawerHeader>
                                <Cart />
                        </DrawerContent>
                    </Drawer>
            }
        </>
    )
}

// button component in order to refactor it and pass only children
const DrawerButton = () => {
    const { isSignedIn } = useUser();
    const router = useRouter();
    const [label, setLabel] = useState("Se connecter");

    useEffect(() => {
        if (isSignedIn) {
            setLabel("Panier");
        } else {
            setLabel("Se connecter");
        }
    }, [isSignedIn])

    const handleClick = () => {
        if (label === "Se connecter") {
            setSearchParam(router, "drawer", "se-connecter");
        } else if (label === "Panier") {
            setSearchParam(router, "drawer", "panier");
        }
    }

    return (<>
        {/* only display on mobile */}
        <div className="fixed bottom-4 right-4 z-50 block sm:hidden">
            <div className="flex items-center gap-2 bg-black text-white hover:bg-zinc-900 p-3 py-4 rounded-md active:scale-95" role="button" onClick={handleClick}>
                {label}
            </div>
        </div>
        {/* only display on desktop */}
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 hidden sm:block">
            <div className="flex items-center gap-2 bg-white text-black hover:bg-gray-100 p-3 py-4 rounded-md active:scale-95" role="button" onClick={handleClick}>
                {label}
            </div>
        </div>
    </>
    )
}
export default DrawerComponent;