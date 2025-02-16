"use client";

import React from "react";
import { SignIn, SignUp, useUser } from '@clerk/nextjs'
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useDrawer from "@/app/store/drawer";
import { setSearchParam } from "@/lib/tools";
import Cart from "../drawers/Cart";

const FloatingMenu = () => {

    const { drawerType } = useDrawer();
    const router = useRouter();
    const handleOpenChange = () => {
        setSearchParam(router, "drawer", null);
    }

    return (
        <>
            <DrawerButton />

            <Dialog open={!!drawerType && (drawerType === "se-connecter" || drawerType === "creer-un-compte") || drawerType === "panier"} onOpenChange={handleOpenChange} >
                <DialogContent className="flex justify-center items-center bg-transparent border-none">
                    <DialogTitle className="text-center hidden"></DialogTitle>
                    {drawerType === "se-connecter" && <SignIn routing="virtual" withSignUp={false} signUpUrl="?drawer=creer-un-compte" />}
                    {drawerType === "creer-un-compte" && <SignUp routing="virtual" signInUrl="?drawer=se-connecter" />}
                    {drawerType === "panier" && <Cart />}
                </DialogContent>
            </Dialog>
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
export default FloatingMenu;