import * as z from "zod";

export const SignUpValidation = z.object({
    fullname: z
        .string()
        .min(3, { message: "Minimum 3 characters." })
        .max(30, { message: "Maximum 30 caracters." }),
    username: z
        .string()
        .min(3, { message: "Minimum 3 characters." })
        .max(30, { message: "Maximum 30 caracters." }),
    email: z
        .string()
        .email({ message: "Invalid email." }),
    password: z
        .string()
        .min(8, { message: "Minimum 8 characters." })
        .refine(
            password => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password),
            {
                message: "Password must contain at least: 1 lowercase, 1 uppercase, 1 number, and 1 special character."
            }
        )
});

export const SignInValidation = z.object({
    email: z
        .string()
        .email({ message: "Invalid email." }),
});