import { useUser } from "@clerk/nextjs";
import { create } from "zustand";

interface DrawerState {
    drawerType: string | null;
    setDrawerType: (type: string | null) => void;
}


const useDrawer = create<DrawerState>((set) => ({
    drawerType: null,
    setDrawerType: (drawerType: string | null) => set({ drawerType }),
}));
 
export default useDrawer;