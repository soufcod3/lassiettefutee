import LoginBtn from "../floating-btn/LoginBtn";
import { Button } from "../ui/button";
import { Drawer, DrawerTitle, DrawerHeader, DrawerContent, DrawerTrigger, DrawerFooter } from "../ui/drawer";

const FloatingBtn = () => {
    return (
        <Drawer>
            <div className="floating-btn" role="button">
                <DrawerTrigger>
                    <LoginBtn />
                </DrawerTrigger>
            </div>

            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className="text-center text-2xl font-bold">Se connecter</DrawerTitle>
                    </DrawerHeader>
                <DrawerFooter className="flex justify-center items-center">
                    <Button className="w-fit">Se connecter</Button>
                </DrawerFooter>
            </DrawerContent>

        </Drawer>
    )
}

export default FloatingBtn;