'use client';

import React, { useState } from 'react';

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

import { Badge } from '@/app/components/molecules/badge';
import { useUserSession } from '@/app/nucleus/context/user-provider'; // Import the context hook
import { Tenant } from '@/app/types/Tenant';
import { Button } from '@/app/components/molecules/button';

// TODO: extend so if the user is an admin, they can see the edit cell which is a modal

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
                        <DialogContent>
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
                        </DialogContent>
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
