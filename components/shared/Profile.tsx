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
import { useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "@/lib/validations/user";
import { useEffect } from "react";
import { IUserData, IUserDb } from "@/lib/models/user.model";
import { updateClerkUser } from "@/lib/actions/user.actions";
import { PhoneIcon } from "lucide-react";

type Props = {
    open: boolean,
    onOpenChange: () => void
}

const Profile = ({ open, onOpenChange }: Props) => {

    //// USER MANAGEMENT
    // Fetch user from clerk
    const { user } = useUser();

    // Fetched user from db
    // const userDb: IUserDb = await getUser(user?.id);
    const userDb: IUserDb = {
        _id: undefined,
        lastname: "",
        firstname: "",
        email: "",
        phone: undefined,
    };

    // User full data
    const userData: IUserData = {
        id: user?.id || "",
        objectId: userDb?._id,
        lastname: user?.lastName || userDb?.lastname,
        firstname: user?.firstName || userDb?.firstname,
        email: user?.emailAddresses[0].emailAddress || userDb?.email,
        phone: user?.phoneNumbers[0]?.phoneNumber || userDb?.phone || "",
    }

    useEffect(() => { // because useUser is undefined when the component is mounted
        if (user) {
            form.reset({
                lastname: user.lastName || undefined,
                firstname: user.firstName || undefined,
                email: user.emailAddresses[0].emailAddress,
                phone: user.phoneNumbers[0]?.phoneNumber || "",
            })
        }
    }, [user])
    //// END USER MANAGEMENT

    const form = useForm({
        resolver: zodResolver(UserValidation),
        defaultValues: {
            lastname: userData.lastname,
            firstname: userData.firstname,
            email: userData.email,
            phone: userData.phone,
        }
    })

    const onSubmit = async (values: z.infer<typeof UserValidation>) => {
        console.log(values);
        try {
            await updateClerkUser(values);
        } catch (error) {
            console.log(error);
        }
    }

    return (user &&
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[300px] sm:max-w-[350px] rounded-lg">
                <DialogHeader>
                    <DialogTitle className="mb-3">Mon compte</DialogTitle>
                    <DialogDescription>
                        Ces informations sont importantes pour la gestion de ton compte.
                    </DialogDescription>
                </DialogHeader>

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
                            <Button type="submit">Sauvegarder</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default Profile;