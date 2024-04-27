'use client';

import * as React from 'react';
import {
    CaretSortIcon,
    CheckIcon,
    PlusCircledIcon,
} from '@radix-ui/react-icons';

import { cn } from '@/app/nucleus/utils';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/app/components/molecules/avatar';
import { Button } from '@/app/components/molecules/button';
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
} from '@/app/components/molecules/command';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/app/components/molecules/dialog';
import { Input } from '@/app/components/atoms/input';
import { Label } from '@/app/components/molecules/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/app/components/molecules/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/app/components/molecules/select';
import { useUserSession } from '@/app/nucleus/context/user-provider';
import { Tenant } from '@/app/types/Tenant';
import { getInitials } from '@/app/nucleus/slice-and-dice';
import { z } from 'zod';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
    typeof PopoverTrigger
>;

interface TeamSwitcherProps extends PopoverTriggerProps {}

const schema = z.object({
    organizationName: z.string(),
    subscriptionType: z.string(),
});

export default function TeamSwitcher({
    className,
}: TeamSwitcherProps) {
    const { userSession, updateUserSession } =
        useUserSession();

    // State to manage the currently selected tenant.
    const [selectedTenant, setSelectedTenant] =
        React.useState(userSession.selectedTenant);

    // Function to determine the display value for the selected tenant.
    const getDisplayValue = () => {
        if (!selectedTenant) return 'Select a tenant';
        if (selectedTenant.type === 'Personal')
            return userSession.user.full_name?.split(
                ' ',
            )[0];
        return selectedTenant.name;
    };

    // State to manage the visibility of the popover and the create tenant dialog.
    const [open, setOpen] = React.useState(false);
    const [
        showCreateTenantDialog,
        setShowCreateTenantDialog,
    ] = React.useState(false);

    React.useEffect(() => {
        if (userSession) {
            setSelectedTenant(userSession.selectedTenant);
        }
    }, [userSession]);

    // Handler for tenant selection.
    const handleTenantSelect = (tenant: Tenant) => {
        //   setSelectedTenant(tenant);
        updateUserSession({
            ...userSession,
            selectedTenant: tenant,
        }); // Update context instead of local state
        setOpen(false);
    };

    if (!userSession) {
        return <></>;
    }
    return (
        <Dialog
            open={showCreateTenantDialog}
            onOpenChange={setShowCreateTenantDialog}
        >
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        aria-label="Select a tenant"
                        className={cn(
                            'w-auto justify-between',
                            className,
                        )}
                    >
                        <Avatar className="mr-2 h-5 w-5">
                            <AvatarImage
                                src={
                                    selectedTenant?.type ===
                                    'Organization'
                                        ? selectedTenant?.picture
                                        : userSession.user
                                              .picture
                                }
                                alt={getDisplayValue()}
                            />
                            <AvatarFallback></AvatarFallback>
                        </Avatar>
                        {getDisplayValue() ||
                            selectedTenant?.name}
                        <CaretSortIcon className="ml-4 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandList>
                            {/* Personal Tenants */}
                            <CommandGroup heading="Personal">
                                {userSession.tenants
                                    .filter(
                                        (tenant) =>
                                            tenant.type ===
                                            'Personal',
                                    )
                                    .map((tenant) => (
                                        <CommandItem
                                            key={tenant.id}
                                            onSelect={() =>
                                                handleTenantSelect(
                                                    tenant,
                                                )
                                            }
                                            className="text-sm"
                                        >
                                            <Avatar className="mr-2 h-5 w-5">
                                                <AvatarImage
                                                    src={
                                                        userSession
                                                            .user
                                                            .picture
                                                    }
                                                    alt={
                                                        userSession
                                                            .user
                                                            .full_name
                                                    }
                                                />
                                                <AvatarFallback className="p-10">
                                                    {getInitials(
                                                        userSession
                                                            .user
                                                            .full_name ||
                                                            '',
                                                    )}
                                                </AvatarFallback>
                                            </Avatar>
                                            {
                                                userSession
                                                    .user
                                                    .full_name
                                            }
                                            {selectedTenant &&
                                                selectedTenant.id ===
                                                    tenant.id && (
                                                    <CheckIcon className="ml-auto h-4 w-4" />
                                                )}
                                        </CommandItem>
                                    ))}
                            </CommandGroup>

                            {/* Other Tenants */}
                            <CommandGroup heading="Organizations">
                                {userSession.tenants
                                    .filter(
                                        (tenant) =>
                                            tenant.type !==
                                            'Personal',
                                    )
                                    .map((tenant) => (
                                        <CommandItem
                                            key={tenant.id}
                                            onSelect={() =>
                                                handleTenantSelect(
                                                    tenant,
                                                )
                                            }
                                            className="text-sm"
                                        >
                                            <Avatar className="mr-2 h-5 w-5">
                                                <AvatarImage
                                                    src={
                                                        selectedTenant?.picture
                                                    }
                                                    alt={
                                                        tenant.name
                                                    }
                                                />
                                                <AvatarFallback>
                                                    {getInitials(
                                                        userSession
                                                            .user
                                                            .full_name ||
                                                            '',
                                                    )}
                                                </AvatarFallback>
                                            </Avatar>
                                            {tenant.name}
                                            {selectedTenant &&
                                                selectedTenant.id ===
                                                    tenant.id && (
                                                    <CheckIcon className="ml-auto h-4 w-4" />
                                                )}
                                        </CommandItem>
                                    ))}
                            </CommandGroup>
                        </CommandList>
                        <CommandItem
                            onSelect={() =>
                                setShowCreateTenantDialog(
                                    true,
                                )
                            }
                        >
                            <PlusCircledIcon className="mr-2" />
                            Create Organization
                        </CommandItem>
                    </Command>
                </PopoverContent>
            </Popover>
            {/* Dialog Content for Creating New Organization */}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Create organization
                    </DialogTitle>
                    <DialogDescription>
                        Add a new organization to track your
                        organization's contributions and
                        rewards centrally.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <div className="space-y-4 py-2 pb-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">
                                Organization name
                            </Label>
                            <Input
                                id="name"
                                placeholder="My organization"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="plan">
                                Subscription plan
                            </Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a plan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="free">
                                        <span className="font-medium">
                                            Free
                                        </span>{' '}
                                        -{' '}
                                        <span className="text-muted-foreground">
                                            Beta
                                        </span>
                                    </SelectItem>
                                    {/* <SelectItem value="pro">
                                        <span className="font-medium">
                                            Pro
                                        </span>{' '}
                                        -{' '}
                                        <span className="text-muted-foreground">
                                            $9/month per
                                            user
                                        </span>
                                    </SelectItem> */}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() =>
                            setShowCreateTenantDialog(false)
                        }
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className={`hover:text-primary hover:bg-transparent hover:outline-dashed`}
                        onClick={() =>
                            setShowCreateTenantDialog(false)
                        }
                    >
                        Create
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
