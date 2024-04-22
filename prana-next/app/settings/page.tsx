import { Separator } from '@/app/components/molecules/separator';
import { ProfileForm } from '@/app/components/organisms/settings/profile-form';

export default function SettingsProfilePage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">
                    Profile
                </h3>
                <p className="text-sm text-muted-foreground">
                    Customize your public profile details.
                </p>
            </div>
            <Separator />
            <ProfileForm />
        </div>
    );
}
