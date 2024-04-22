'use client';
import { Separator } from '@/app/components/molecules/separator';
import { NotificationsForm } from '@/app/components/organisms/settings/notifications-form';

export default function SettingsNotificationsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">
                    Notifications
                </h3>
                <p className="text-sm text-muted-foreground">
                    Configure how you receive notifications.
                </p>
            </div>
            <Separator />
            <NotificationsForm />
        </div>
    );
}
