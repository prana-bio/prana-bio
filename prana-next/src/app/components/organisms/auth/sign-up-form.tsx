'use client';

import React, {
    useState,
    ChangeEvent,
    FormEvent,
} from 'react';

import { Icons } from '@/app/components/atoms/icons';
import { Button } from '@/app/components/molecules/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/app/components/molecules/card';
import { Input } from '@/app/components/atoms/input';
import { Label } from '@/app/components/molecules/label';

interface UserSignUpFormProps {
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}

interface FormData {
    fullName: string;
    email: string;
    password: string;
}

export function SignUpForm({
    onSuccess,
    onError,
}: UserSignUpFormProps) {
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        password: '',
    });

    const [isLoading, setIsLoading] =
        useState<boolean>(false);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement>,
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>,
    ) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                onSuccess(data);
            } else {
                const errorData = await response.json();
                onError(errorData);
            }
        } catch (error) {
            console.error('Error during login:', error);
            onError({
                message: 'An error occurred during login',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl flex items-center justify-between">
                        <span className="align-middle">
                            Join the Club 🐟
                        </span>
                    </CardTitle>
                    <CardDescription>
                        Sign up and start exploring.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 pt-2">
                    {/* <div className="grid grid-cols-2 gap-6">
                        <Button
                            variant="outline"
                            disabled={true}
                        >
                            <Icons.gitHub className="mr-2 h-4 w-4" />
                            Github
                        </Button>
                        <Button
                            variant="outline"
                            disabled={true}
                        >
                            <Icons.google className="mr-2 h-4 w-4" />
                            Google
                        </Button>
                    </div> */}
                    {/* <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                    </div> */}
                    <div className="grid gap-2">
                        <Label htmlFor="fullName">
                            Full Name
                        </Label>
                        <Input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Enter your Full Name"
                            autoCapitalize="words"
                            autoComplete="on"
                            autoCorrect="off"
                            disabled={isLoading}
                            className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your Email"
                            autoCapitalize="none"
                            autoComplete="on"
                            autoCorrect="off"
                            disabled={isLoading}
                            className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">
                            Password
                        </Label>
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your Password"
                            autoCapitalize="none"
                            autoComplete="off"
                            autoCorrect="off"
                            disabled={isLoading}
                            className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900"
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        className="w-full hover:text-primary hover:outline-dashed"
                        disabled={isLoading}
                        type="submit"
                    >
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Create account
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}
