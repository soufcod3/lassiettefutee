"use client";

import React, { useEffect, useState } from "react";
import { SignIn, SignUp, useUser } from "@clerk/nextjs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useRouter } from "next/navigation";
import useDrawer from "@/app/store/drawer";
import { setSearchParam } from "@/lib/tools";
import Cart from "../drawers/Cart";
import { DrawerContent, DrawerHeader, DrawerTitle, Drawer } from "../ui/drawer";
import useBetterMediaQuery from "@/lib/hooks/useBetterMediaQuery";

const DrawerComponent = () => {
    const { drawerType } = useDrawer();
    const router = useRouter();
    const isDesktop = useBetterMediaQuery("(min-width: 640px)");

    const handleOpenChange = () => setSearchParam(router, "drawer", null);
    const isAuthModal = drawerType === "se-connecter" || drawerType === "creer-un-compte";
    const isCartModal = drawerType === "panier";

    return (
        <>
            <DrawerButton />

            {/* Authentication Modal */}
            {isAuthModal && (
                <Dialog open={true} onOpenChange={handleOpenChange}>
                    <DialogContent className="flex justify-center items-center bg-transparent border-none">
                        {drawerType === "se-connecter" && <SignIn routing="virtual" withSignUp={false} signUpUrl="?drawer=creer-un-compte" />}
                        {drawerType === "creer-un-compte" && <SignUp routing="virtual" signInUrl="?drawer=se-connecter" />}
                    </DialogContent>
                </Dialog>
            )}

            {/* Cart Modal (Desktop) / Drawer (Mobile) */}
            {isCartModal && (
                isDesktop ? (
                    <Dialog open={true} onOpenChange={handleOpenChange}>
                        <DialogContent className="border-none h-50">
                            <DialogHeader>
                                <DialogTitle className="text-center">Mon panier</DialogTitle>
                            </DialogHeader>
                            <Cart />
                        </DialogContent>
                    </Dialog>
                ) : (
                    <Drawer open={true} onOpenChange={handleOpenChange}>
                        <DrawerContent className="flex justify-center items-center bg-white border-none h-50">
                            <DrawerHeader>
                                <DrawerTitle className="text-center">Mon panier</DrawerTitle>
                            </DrawerHeader>
                            <Cart />
                        </DrawerContent>
                    </Drawer>
                )
            )}
        </>
    );
};

const DrawerButton = () => {
    const { isSignedIn } = useUser();
    const router = useRouter();
    const [label, setLabel] = useState("Se connecter");

    useEffect(() => {
        setLabel(isSignedIn ? "Panier" : "Se connecter");
    }, [isSignedIn]);

    const handleClick = () => {
        setSearchParam(router, "drawer", isSignedIn ? "panier" : "se-connecter");
    };

    return (
        <>
            {/* Mobile Button */}
            <ButtonContainer isMobile onClick={handleClick} label={label} />
            {/* Desktop Button */}
            <ButtonContainer onClick={handleClick} label={label} isMobile={false} />
        </>
    );
};

const ButtonContainer = ({ isMobile = false, onClick, label }: { isMobile: boolean, onClick: () => void, label: string }) => (
    <div className={`fixed bottom-4 ${isMobile ? "right-4 block sm:hidden" : "left-1/2 -translate-x-1/2 hidden sm:block"} z-50`}>
        <div className={`flex items-center gap-2 ${isMobile ? "bg-black text-white hover:bg-zinc-900" : "bg-white text-black hover:bg-gray-100"} p-3 py-4 rounded-md active:scale-95`} role="button" onClick={onClick}>
            {label}
        </div>
    </div>
);

export default DrawerComponent;
