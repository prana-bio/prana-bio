'use client';

import React, { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    CalendarIcon,
    CaretSortIcon,
    CheckIcon,
} from '@radix-ui/react-icons';
import { format, parseISO } from 'date-fns';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { cn } from '@/app/nucleus/utils';
import { Button } from '@/app/components/molecules/button';
import { Calendar } from '@/app/components/molecules/calendar';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/app/components/molecules/command';
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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/app/components/molecules/popover';
import { toast } from '@/app/nucleus/hooks/common/useToast';
import useUpdateAccount from '@/app/nucleus/hooks/settings/account/useUpdateAccount';
import { useUserSession } from '@/app/nucleus/context/user-provider';

const languages = [
    { label: 'English', value: 'en' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' },
    { label: 'Spanish', value: 'es' },
    { label: 'Portuguese', value: 'pt' },
    { label: 'Russian', value: 'ru' },
    { label: 'Japanese', value: 'ja' },
    { label: 'Korean', value: 'ko' },
    { label: 'Chinese', value: 'zh' },
] as const;

const accountFormSchema = z.object({
    full_name: z
        .string()
        .min(2, {
            message: 'Name must be at least 2 characters.',
        })
        .max(30, {
            message:
                'Name must not be longer than 30 characters.',
        }),
    language: z.string({
        required_error: 'Please select a language.',
    }),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

export function AccountForm() {
    const { userSession, updateUserSession } =
        useUserSession();

    const {
        updateAccount,
        isLoading: updateAccountLoading,
        error: updateAccountError,
    } = useUpdateAccount();

    // Initial form values
    const form = useForm<AccountFormValues>({
        resolver: zodResolver(accountFormSchema),
        defaultValues: {
            full_name: userSession.user.full_name || '',
            language: userSession.user.language || '',
        },
        mode: 'onChange',
    });

    // Updated form values
    useEffect(() => {
        if (userSession && userSession.user) {
            form.reset({
                full_name: userSession.user.full_name || '',
                language: userSession.user.language || '',
            });
        }
    }, [userSession, form.reset]);

    const onSubmit = async (data: AccountFormValues) => {
        const { success, message, updatedUser } =
            await updateAccount(data);
        if (success && updatedUser) {
            updateUserSession((prevSession) => ({
                ...prevSession,
                user: {
                    ...prevSession.user,
                    full_name:
                        updatedUser.full_name ??
                        prevSession.user.full_name,
                    language:
                        updatedUser.language ??
                        prevSession.user.language,
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
                description: updateAccountError,
            });
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
            >
                <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="First last"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                This is the name that will
                                be used on formal
                                communications, etc.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Language</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                'w-[200px] justify-between',
                                                !field.value &&
                                                    'text-muted-foreground',
                                            )}
                                        >
                                            {field.value
                                                ? languages.find(
                                                      (
                                                          language,
                                                      ) =>
                                                          language.value ===
                                                          field.value,
                                                  )?.label
                                                : 'Select language'}
                                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search language..." />
                                        <CommandEmpty>
                                            No language
                                            found.
                                        </CommandEmpty>
                                        <CommandGroup>
                                            {languages.map(
                                                (
                                                    language,
                                                ) => (
                                                    <CommandItem
                                                        value={
                                                            language.label
                                                        }
                                                        key={
                                                            language.value
                                                        }
                                                        onSelect={() => {
                                                            form.setValue(
                                                                'language',
                                                                language.value,
                                                            );
                                                        }}
                                                    >
                                                        <CheckIcon
                                                            className={cn(
                                                                'mr-2 h-4 w-4',
                                                                language.value ===
                                                                    field.value
                                                                    ? 'opacity-100'
                                                                    : 'opacity-0',
                                                            )}
                                                        />
                                                        {
                                                            language.label
                                                        }
                                                    </CommandItem>
                                                ),
                                            )}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                This is the language that
                                will be used in the
                                dashboard.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                /> */}
                <Button type="submit">
                    Update account
                </Button>
            </form>
        </Form>
    );
}
