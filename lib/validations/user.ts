import * as z from "zod";

export const UserValidation = z.object({
    lastname: z.string().min(2, {
        message: "Ton nom est trop court.",
    }).max(20, {
        message: "Ton nom est trop long.",
    }),
    firstname: z.string().min(2, {
        message: "Ton nom est trop court.",
    }).max(30, {
        message: "Ton nom est trop long.",
    }),
    email: z.string().email({
        message: "Ton email est invalide.",
    }),
    phone: z.string().min(10, {
        message: "Vérifie ton numéro de téléphone.",
    }).max(15, {
        message: "Ton numéro de téléphone est trop long.",
    })
})