'use client';

import React, { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Control } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/app/components/molecules/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/app/components/molecules/form';
import { Input } from '@/app/components/atoms/input';
import { Textarea } from '@/app/components/atoms/textarea';
import { toast } from '@/app/nucleus/hooks/common/useToast';
import useUpdateProfile from '@/app/nucleus/hooks/settings/profile/useUpdateProfile';
import useUploadProfilePicture from '@/app/nucleus/hooks/settings/profile/useUploadProfilePicture';
import { useUserSession } from '@/app/nucleus/context/user-provider';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

// Define the schema for profile form validation using Zod.
const profileFormSchema = z.object({
    email: z
        .string({
            required_error:
                'Please select an email to display.',
        })
        .email(),
    bio: z.string().max(160).min(4).optional(),
    picture: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
    const { userSession, updateUserSession } =
        useUserSession();

    // State variables for managing profile picture and its preview URL
    const [profilePic, setProfilePic] =
        useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<
        string | null
    >('');

    // Effect for updating profile picture URL
    useEffect(() => {
        if (!profilePic) {
            setPreviewUrl(null);
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result as string);
        };
        fileReader.readAsDataURL(profilePic);
    }, [profilePic]);

    // Callback to update Profile Pic State
    const handleProfilePicChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files
            ? event.target.files[0]
            : null;
        if (file) {
            if (file.size > MAX_FILE_SIZE) {
                toast({
                    title: 'File too large',
                    description:
                        'Please select a file smaller than 2MB.',
                });
                return;
            }
            setProfilePic(file);
        }
    };

    // Hooks for updating user information and uploading profile picture.
    const {
        updateProfile,
        isLoading: updateProfileLoading,
        error: updateProfileError,
    } = useUpdateProfile();
    const {
        uploadProfilePicture,
        isLoading: uploadProfilePictureLoading,
        error: uploadProfilePictureError,
    } = useUploadProfilePicture();

    // Initialize form using react-hook-form
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            email: userSession.user.email || '',
            bio: userSession.user.bio || '',
            picture: userSession.user.picture || '',
        },
        mode: 'onChange',
    });

    // Effect to reset form with updated user session data
    useEffect(() => {
        if (userSession && userSession.user) {
            const userData = {
                email: userSession.user.email || '',
                bio: userSession.user.bio || '',
                picture: userSession.user.picture || '',
            };
            form.reset(userData);
            if (userData.picture) {
                setPreviewUrl(userData.picture);
            }
        }
    }, [userSession, form.reset]);

    // Handle form submission
    const onSubmit = async (data: ProfileFormValues) => {
        if (profilePic) {
            const picResp = await uploadProfilePicture(
                profilePic,
            );
            if (picResp.success && picResp.imageUrl) {
                // Update form data
                data.picture = picResp.imageUrl;
                // Update form state
                form.setValue('picture', picResp.imageUrl);
            } else {
                toast({
                    title: 'Image upload failed',
                    description: picResp.message,
                });
                return;
            }
        }
        const resp = await updateProfile(data);
        if (resp.success && resp.updatedUser) {
            updateUserSession((prevSession) => ({
                ...prevSession,
                user: {
                    ...prevSession.user,
                    email:
                        resp?.updatedUser?.email ??
                        prevSession.user.email,
                    bio:
                        resp?.updatedUser?.bio ??
                        prevSession.user.bio,
                    picture:
                        resp?.updatedUser?.picture ??
                        prevSession.user.picture,
                },
            }));
            toast({
                title: 'You submitted the following values:',
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">
                            {JSON.stringify(data, null, 2)}
                        </code>
                    </pre>
                ),
            });
        } else {
            toast({
                title: 'Update failed',
                description: updateProfileError,
            });
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
            >
                <EmailField control={form.control} />
                <BioField control={form.control} />
                <ProfilePictureField
                    control={form.control}
                    previewUrl={previewUrl}
                    handleProfilePicChange={
                        handleProfilePicChange
                    }
                />
                <Button type="submit">
                    Update profile
                </Button>
            </form>
        </Form>
    );
}

// Component for email field
interface EmailFieldProps {
    control: Control<ProfileFormValues>;
}
const EmailField: React.FC<EmailFieldProps> = ({
    control,
}) => (
    <FormField
        control={control}
        name="email"
        render={({ field }) => (
            <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input {...field} />
                </FormControl>
                <FormDescription>
                    This email will be used for all
                    communications and account management.
                </FormDescription>
                <FormMessage />
            </FormItem>
        )}
    />
);

// Component for bio field
interface BioFieldProps {
    control: Control<ProfileFormValues>;
}
const BioField: React.FC<BioFieldProps> = ({ control }) => (
    <FormField
        control={control}
        name="bio"
        render={({ field }) => (
            <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                    <Textarea
                        className="resize-none"
                        {...field}
                    />
                </FormControl>
                <FormDescription>
                    Let everyone know a bit about what
                    drives you.
                </FormDescription>
                <FormMessage />
            </FormItem>
        )}
    />
);

// Component for profile picture field
interface ProfilePictureFieldProps {
    control: Control<ProfileFormValues>;
    previewUrl: string | null;
    handleProfilePicChange: (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => void;
}
const ProfilePictureField: React.FC<
    ProfilePictureFieldProps
> = ({ control, previewUrl, handleProfilePicChange }) => (
    <FormField
        control={control}
        name="picture"
        render={() => (
            <FormItem>
                <FormLabel>Profile Picture</FormLabel>
                <FormControl>
                    <div className="flex items-center space-x-4">
                        {previewUrl && (
                            <div className="rounded-full overflow-hidden w-12 h-12">
                                <img
                                    src={previewUrl}
                                    alt="Profile preview"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        )}
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={
                                handleProfilePicChange
                            }
                        />
                    </div>
                </FormControl>
                <FormDescription>
                    Upload your profile picture.
                </FormDescription>
                <FormMessage />
            </FormItem>
        )}
    />
);
