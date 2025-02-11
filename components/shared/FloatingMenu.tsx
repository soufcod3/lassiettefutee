"use client";

import React from "react";
import { User2 } from "lucide-react";
import { SignIn, SignUp, useUser } from '@clerk/nextjs'
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const FloatingMenu = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const { isSignedIn } = useUser();

    const [buttonType, setButtonType] = useState<string>("se-connecter");

    const [drawerType, setDrawerType] = useState<string | null>(null);

    useEffect(() => {
        if (!isSignedIn) {
            setButtonType("se-connecter");
        } else {
            setButtonType("panier");
        }
    }, [isSignedIn]);

    const handleOpen = (type: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("drawer", type);
        router.push(`?${params.toString()}`, { scroll: false });
    }

    const handleClose = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("drawer");
        router.push(`?${params.toString()}`, { scroll: false });
    }

    useEffect(() => {
        console.log('searchParams', searchParams.get("drawer"));
        setDrawerType(searchParams.get("drawer") || null);
    }, [searchParams]);

    return (
        <>
            <DynamicButton type={buttonType} handleOpen={handleOpen} />

            <Dialog open={searchParams.get("drawer") === "se-connecter" || searchParams.get("drawer") === "creer-un-compte"} onOpenChange={handleClose}>
                <DialogContent className="flex justify-center items-center bg-transparent border-none">
                    <DialogTitle className="text-center hidden"></DialogTitle>
                    {drawerType === "se-connecter" && <SignIn routing="virtual" withSignUp={false} signUpUrl="?drawer=creer-un-compte" />}
                    {drawerType === "creer-un-compte" && <SignUp routing="virtual" signInUrl="?drawer=se-connecter" />}
                </DialogContent>
            </Dialog>
        </>
    )
}

const DynamicButton = ({ type, handleOpen }: { type: string, handleOpen: (type: string) => void }) => {
    return (
        type === "se-connecter" ? (
            <Button type={type} handleOpen={handleOpen}>
                <User2 className="h-4 w-4" />
                <span className="text-md">Se connecter</span>
            </Button>
        ) : (
            <Button type={type} handleOpen={handleOpen}>
                Panier
            </Button>
        )
    )
}

// button component in order to refactor it and pass only children
const Button = ({ children, type, handleOpen }: { children: React.ReactNode, type: string, handleOpen: (type: string) => void }) => {
    return (<>
        {/* only display on mobile */}
        <div className="fixed bottom-4 right-4 z-50 block sm:hidden">
            <div className="flex items-center gap-2 bg-black text-white hover:bg-zinc-900 p-3 py-4 rounded-md active:scale-95" onClick={() => handleOpen(type)}>
                {children}
            </div>
        </div>
        {/* only display on desktop */}
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 hidden sm:block">
            <div className="flex items-center gap-2 bg-white text-black hover:bg-gray-100 p-3 py-4 rounded-md active:scale-95" onClick={() => handleOpen(type)} role="button">
                {children}
            </div>
        </div>
    </>
    )
}
export default FloatingMenu;