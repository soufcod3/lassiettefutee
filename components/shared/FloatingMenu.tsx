import { PlusIcon, User2 } from "lucide-react";
import { Button } from "../ui/button";

const FloatingMenu = () => {
  return (
    <>
        <div className="fixed bottom-4 right-4 z-50 block sm:hidden">
          <Button
            variant="outline"
            size="lg"
            className="bg-black text-white hover:bg-zinc-900 p-4 py-6"
          >
            <User2 className="h-4 w-4" />
            <span className="text-md">Se connecter</span>
          </Button>
        </div>
        <div className="hidden sm:flex fixed bottom-6 w-full left-0 justify-center">
          <Button
            variant="outline"
            size="lg"
            className="bg-white text-black hover:bg-gray-200 p-4 py-6"
          >
            <User2 className="h-4 w-4" />
            <span className="text-md">Se connecter</span>
          </Button>
        </div>
    </>
  )
}

export default FloatingMenu;