'use client';
import { Separator } from '@/app/components/molecules/separator';
import { AccountForm } from '@/app/components/organisms/settings/account-form';

export default function SettingsAccountPage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">
                    Account
                </h3>
                <p className="text-sm text-muted-foreground">
                    Update your account settings. Set your
                    preferred language and timezone.
                </p>
            </div>
            <Separator />
            <AccountForm />
        </div>
    );
}
