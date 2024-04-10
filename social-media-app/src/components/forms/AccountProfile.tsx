'use client';
import React, { ChangeEvent, useState } from "react";
import * as z from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { usePathname, useRouter, useParams, redirect } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";

import FileBase64 from 'react-file-base64';
import { isBase64Image } from "@/lib/utils";

import { UserValidation } from "@/lib/validations/user";
import { updateUser } from "@/lib/actions/user.actions";

// Define component props
interface Props {
    user: {
        id: string;
        fullname: string;
        username: string;
        bio: string;
        image: string;
    };
    btnTitle: string;
}

const AccountProfile = ({ user, btnTitle}: Props) => {
    const params = useParams();
    if (params.id !== user.id) redirect("/");

    const router = useRouter(); // Get the router object
    const pathname = usePathname(); // Get the current url pathname

    // Set states
    const [loading, setLoading] = useState(false);

    // Define the form & its validation from the Zod UserValidation schema
    const form = useForm<z.infer<typeof UserValidation>>({
        resolver: zodResolver(UserValidation),
        defaultValues: {
            image: user ? user?.image : "",
            fullname: user ? user?.fullname : "",
            username: user ? user?.username : "",
            bio: user ? user?.bio : "",
        },
    });

    // Handle the form submit -> returns UserValidation object
    const onSubmit = async (values: z.infer<typeof UserValidation>) => {
        const userData = {
            userId: user.id,
            image: values.image || "",
            fullname: values.fullname,
            username: values.username,
            bio: values.bio || "",
            path: pathname,
        };

        if (!(userData.fullname || userData.username || userData.bio || userData.image)) {
            return toast.error('Missing fields... All fields are required!');
        }

        console.log(userData);

        try {
            setLoading(true);

            await updateUser(userData);

            setLoading(false);

            toast.success('Profile updated successfully!');

            setTimeout(() => {
                router.push(`/profile/${user.id}`);
            }, 2000);
        } catch (error: any) {
            setLoading(false);
            console.log(error);
            toast.error(error.message);
        }
    };

    // Handle image upload
    const handleImage = (base64: string, onChange: (value: string) => void) => {
        if (isBase64Image(base64)) {
            onChange(base64);

            // Trigger an animation here
        } else {
            console.log('Invalid image format');
            toast.error('Invalid image format');
        }
    };
    return (
        <Form {...form}>
            <form
                className='flex flex-col justify-start gap-10'
                onSubmit={form.handleSubmit(onSubmit)}
            >
                {/* User profile pic field */}
                <FormField
                    control={form.control}
                    name='image'
                    render={({ field }) => (
                        <FormItem className='flex items-center gap-4'>
                            {/* Profile pic */}
                            <FormLabel className='account-form_image-label'>
                                <img
                                    src={field.value}
                                    alt='profile_icon'
                                    width={96}
                                    height={96}
                                    className='rounded-full object-contain'
                                />
                            </FormLabel>

                            {/* Photo picker */}
                            <FormControl className='flex-1 text-base-semibold text-gray-200'>
                                <FileBase64
                                    type='file'
                                    accept='image/*'
                                    placeholder='Add profile photo'
                                    className='account-form_image-input'
                                    onDone={({ base64 }: { base64: string }) => handleImage(base64, field.onChange)}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />


                {/* User fullname field */}
                <FormField
                    control={form.control}
                    name='fullname'
                    render={({ field }) => (
                        <FormItem className='flex w-full flex-col gap-3'>
                            <FormLabel className='text-base-semibold text-light-2'>
                                Name
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type='text'
                                    className='account-form_input no-focus'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* User username field */}
                <FormField
                    control={form.control}
                    name='username'
                    render={({ field }) => (
                        <FormItem className='flex w-full flex-col gap-3'>
                            <FormLabel className='text-base-semibold text-light-2'>
                                Username
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type='text'
                                    className='account-form_input no-focus'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* User bio field */}
                <FormField
                    control={form.control}
                    name='bio'
                    render={({ field }) => (
                        <FormItem className='flex w-full flex-col gap-3'>
                            <FormLabel className='text-base-semibold text-light-2'>
                                Bio
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    rows={10}
                                    className='account-form_input no-focus'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Continue to home btn */}
                <Button type='submit' className='bg-primary-500' disabled={loading}>
                    {loading ? 'Updating User...' : btnTitle}
                </Button>
            </form>
        </Form>
    )
}

export default AccountProfile