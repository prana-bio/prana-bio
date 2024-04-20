'use client';

import React, {
    useState,
    ChangeEvent,
    FormEvent,
} from 'react';

import { cn } from '@/app/nucleus/utils';
import { Icons } from '@/app/components/atoms/icons';
import { Button } from '@/app/components/molecules/button';
import { Input } from '@/app/components/atoms/input';
import { Label } from '@/app/components/molecules/label';

interface UserLoginFormProps {
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}

interface FormData {
    email: string;
    password: string;
}

export function LogInForm({
    onSuccess,
    onError,
}: UserLoginFormProps) {
    const [formData, setFormData] = useState<FormData>({
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
            const response = await fetch('/api/login', {
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
        <div className={cn('grid gap-6')}>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label
                            className="mb-1"
                            htmlFor="email"
                        >
                            Email
                        </Label>
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
                        />
                    </div>
                    <div className="grid gap-1">
                        <Label
                            className="mb-1 mt-2"
                            htmlFor="password"
                        >
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
                        />
                    </div>
                    <Button
                        variant="default"
                        className={`mt-4 bg-primary`}
                        disabled={isLoading}
                        type="submit"
                    >
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Sign In
                    </Button>
                </div>
            </form>
            {/* <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>
            <Button
                variant="outline"
                type="button"
                disabled={true}
            >
                {isLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                <Icons.gitHub className="mr-2 h-4 w-4" />
                )}{' '}
                Github
            </Button> */}
        </div>
    );
}
