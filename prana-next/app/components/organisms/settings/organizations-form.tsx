'use client';

import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Control } from 'react-hook-form';
import * as z from 'zod';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/app/components/molecules/card';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/app/components/molecules/avatar';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/app/components/molecules/table';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/app/components/molecules/dialog';
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
import { Badge } from '@/app/components/molecules/badge';
import { useUserSession } from '@/app/nucleus/context/user-provider'; // Import the context hook
import { Tenant } from '@/app/types/Tenant';
import { Button } from '@/app/components/molecules/button';

const organizationFormSchema = z.object({
    name: z.string().optional(),
    type: z.string().optional(),
    default_country_id: z.string().optional(),
    email: z
        .string({
            required_error:
                'Please select an email to display.',
        })
        .email()
        .optional(),
});

type OrganizationFormValues = z.infer<
    typeof organizationFormSchema
>;

export function OrganizationsForm() {
    const { userSession } = useUserSession(); // Use the context hook to get userSession
    console.log(userSession.tenants);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [currentTenant, setCurrentTenant] =
        useState<Tenant | null>(null);

    const handleOpenDialog = (tenant: Tenant) => {
        setCurrentTenant(tenant);
        setDialogOpen(true);
    };

    // Initialize form using react-hook-form
    const form = useForm<OrganizationFormValues>({
        resolver: zodResolver(organizationFormSchema),
        defaultValues: {
            name: currentTenant?.name || '',
            type: currentTenant?.type || '',
            default_country_id:
                currentTenant?.default_country_id || '',
            email: userSession.user.email || '',
        },
        mode: 'onChange',
    });

    return (
        <Card>
            <CardHeader className="px-7">
                <CardTitle>Organizations</CardTitle>
                <CardDescription>
                    Manage your connected organizations.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                Organization Name
                            </TableHead>
                            <TableHead className="hidden sm:table-cell">
                                Type
                            </TableHead>
                            <TableHead className="hidden sm:table-cell">
                                Role
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                                Default
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                                Avatar
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                                Created Date
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                                Edit
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {userSession.tenants.map(
                            (tenant) => (
                                <TableRow key={tenant.id}>
                                    <TableCell>
                                        <div className="font-medium">
                                            {tenant.name}
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        {tenant.type}
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        {tenant.roles &&
                                            tenant.roles[0]}
                                        {/* Placeholder, adjust based on your data structure */}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <Badge
                                            className="text-xs"
                                            variant="secondary"
                                        >
                                            {tenant.default_tenant
                                                ? 'Yes'
                                                : 'No'}{' '}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <Avatar className="mr-2 h-8 w-8">
                                            <AvatarImage
                                                src={
                                                    tenant?.type ===
                                                    'Organization'
                                                        ? tenant?.picture
                                                        : userSession
                                                              .user
                                                              .picture
                                                }
                                            />
                                            <AvatarFallback></AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    {tenant.created && (
                                        <TableCell className="hidden md:table-cell">
                                            {new Date(
                                                tenant.created,
                                            ).toLocaleDateString(
                                                'en-US',
                                                {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                },
                                            )}
                                        </TableCell>
                                    )}
                                    {tenant.roles &&
                                    tenant.roles[0] ==
                                        'Admin' ? (
                                        <TableCell className="hidden sm:table-cell">
                                            <Badge
                                                className="text-xs cursor-pointer"
                                                variant="secondary"
                                                onClick={() =>
                                                    handleOpenDialog(
                                                        tenant,
                                                    )
                                                }
                                            >
                                                Edit
                                            </Badge>
                                        </TableCell>
                                    ) : (
                                        <TableCell>
                                            <Badge
                                                className="text-xs"
                                                variant="secondary"
                                            >
                                                N/A
                                            </Badge>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ),
                        )}
                    </TableBody>
                </Table>
                {dialogOpen && currentTenant && (
                    <Dialog
                        open={dialogOpen}
                        onOpenChange={setDialogOpen}
                    >
                        <DialogHeader>
                            <DialogTitle>
                                {currentTenant.name}
                            </DialogTitle>
                        </DialogHeader>
                        {/* <DialogContent>
                            <Form {...form}>
                                <form
                                    // onSubmit={form.handleSubmit(
                                    //     onSubmit,
                                    // )}
                                    className="space-y-8"
                                >
                                    <NameField
                                        control={
                                            form.control
                                        }
                                    />
                                    <Button type="submit">
                                        Update Organization
                                        Name
                                    </Button>
                                </form>
                            </Form>
                             <p>
                                <strong>Type:</strong>{' '}
                                {currentTenant.type}
                            </p>
                            <p>
                                <strong>Role:</strong>{' '}
                                {currentTenant.roles.join(
                                    ', ',
                                )}
                            </p>
                            <p>
                                <strong>Default:</strong>{' '}
                                {currentTenant.default_tenant
                                    ? 'Yes'
                                    : 'No'}
                            </p>
                            <p>
                                <strong>Created:</strong>{' '}
                                {new Date(
                                    currentTenant.created,
                                ).toLocaleDateString(
                                    'en-US',
                                    {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    },
                                )}
                            </p> 
                        </DialogContent> */}
                        <DialogFooter>
                            <Button
                                onClick={() =>
                                    setDialogOpen(false)
                                }
                            >
                                Close
                            </Button>
                        </DialogFooter>
                    </Dialog>
                )}
            </CardContent>
        </Card>
    );
}

// Component for name field
interface NameFieldProps {
    control: Control<OrganizationFormValues>;
}
const NameField: React.FC<NameFieldProps> = ({
    control,
}) => (
    <FormField
        control={control}
        name="name"
        render={({ field }) => (
            <FormItem>
                <FormLabel>Organization Name</FormLabel>
                <FormControl>
                    <Input {...field} />
                </FormControl>
                <FormDescription>
                    Enter the full name of the organization.
                </FormDescription>
                <FormMessage />
            </FormItem>
        )}
    />
);
