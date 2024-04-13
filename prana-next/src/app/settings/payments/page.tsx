'use client';
import { Separator } from '@/app/components/molecules/separator';
import { PaymentFormWrapper } from '@/app/components/organisms/settings/payment-form-wrapper';

export default function SettingsPaymentPage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">
                    Payments
                </h3>
                <p className="text-sm text-muted-foreground">
                    Configure your preferred payment method.
                </p>
            </div>
            <Separator />
            <PaymentFormWrapper />
        </div>
    );
}
