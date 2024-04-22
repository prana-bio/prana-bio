'use client';
import { Separator } from '@/app/components/molecules/separator';
import { OrganizationsForm } from '@/app/components/organisms/settings/organizations-form';

export default function SettingsOrganizationPage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">
                    Organizations
                </h3>
                <p className="text-sm text-muted-foreground">
                    Update your organization settings.
                </p>
            </div>
            <Separator />
            <OrganizationsForm />
        </div>
    );
}
