import { Input } from "../ui/input"

import { Dialog, DialogTitle, DialogContent, DialogHeader, DialogDescription, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "@/lib/validations/user";
import { useEffect } from "react";
import {  updateClerkUser, updateUserDb } from "@/lib/actions/user.actions";
import { PhoneIcon } from "lucide-react";
import { z } from "zod";
import { useUser } from "@/lib/hooks/useUser";
// import { updateSearchParams } from "@/lib/tools";
import { useRouter } from "next/navigation";
import useDrawer from "@/app/store/drawer";
import { setSearchParam } from "@/lib/tools";

const Profile = () => {

    const { user, isLoading } = useUser();

    const { drawerType } = useDrawer();
    const router = useRouter();
    
    const handleOpenChange = () => {
        setSearchParam(router, "drawer", null);
    }

    const form = useForm<{
        lastname: string;
        firstname: string;
        email: string;
        phone: string;
    }>({
        resolver: zodResolver(UserValidation),
        defaultValues: {
            lastname: user?.lastname,
            firstname: user?.firstname,
            email: user?.email,
            phone: user?.phone,
        }
    })

    const onSubmit = async (values: z.infer<typeof UserValidation>) => {
        try {
            await updateClerkUser({
                ...values,
                id: user?.id || ""
            });
            await updateUserDb({
                ...values,
                id: user?.id || ""
            });
            setSearchParam(router, "drawer", null);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        form.reset({
            lastname: user?.lastname,
            firstname: user?.firstname,
            email: user?.email,
            phone: user?.phone,
        })
    }, [user, form])

    return (
        <Dialog open={!!drawerType && drawerType === "mon-compte"} onOpenChange={handleOpenChange}>
            <DialogContent className="max-w-fit sm:max-w-[350px] rounded-lg">
                <DialogHeader>
                    <DialogTitle className="mb-3">Mon compte</DialogTitle>
                    <DialogDescription>
                        Ces informations sont importantes pour la gestion de ton compte.
                    </DialogDescription>
                </DialogHeader>

                {isLoading ? (
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row gap-4 justify-center items-center my-4">
                            Chargement...
                        </div>
                    </div>
                ) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid gap-4 py-4">
                            <div className="flex flex-col  gap-4">
                                <div className="flex flex-row gap-4">
                                    <FormField
                                        control={form.control}
                                        name="lastname"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="lastname" className="text-left">
                                                    Ton nom
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        id="lastname"
                                                        className="col-span-3"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="firstname"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="firstname" className="text-left">
                                                    Ton prénom
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        id="firstname"
                                                        className="col-span-3"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col  gap-4">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    disabled
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="email" className="text-left">
                                                Ton adresse email
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="email"
                                                    className="col-span-3"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex flex-col  gap-4">
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="phone" className="text-left">
                                                Ton téléphone
                                            </FormLabel>
                                            <div className="flex flex-row gap-2">
                                                <FormControl className="flex flex-row gap-2">
                                                    <Input
                                                        id="phone"
                                                        className="col-span-3"
                                                        {...field}
                                                        type="tel"
                                                    />
                                                </FormControl>
                                                <Button variant="ghost" className="h-9">
                                                    Vérifier
                                                </Button>
                                            </div>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <DialogFooter className="flex flex-row gap-2">
                            {/* ouvrir telephoner */}
                            <Button
                                variant="ghost"
                                className="flex flex-row gap-2"
                            >
                                <PhoneIcon className="w-3 h-3" />
                                <a href="tel:+33600000000">Nous contacter</a>
                            </Button>
                            <Button type="submit" disabled={!form.formState.isValid}>Sauvegarder</Button>
                        </DialogFooter>
                        </form>
                    </Form>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default Profile;