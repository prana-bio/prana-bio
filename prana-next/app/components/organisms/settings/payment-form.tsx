'use client';

import { Icons } from '@/app/components/atoms/icons';
import { Button } from '@/app/components/molecules/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/app/components/molecules/card';
import { Input } from '@/app/components/atoms/input';
import { Label } from '@/app/components/molecules/label';
import {
    RadioGroup,
    RadioGroupItem,
} from '@/app/components/molecules/radio-group';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/app/components/molecules/select';
import { useState } from 'react';
import {
    useStripe,
    useElements,
    CardElement,
} from '@stripe/react-stripe-js';
import { toast } from '@/app/nucleus/hooks/common/useToast';
import useUpdateCardPaymentMethod from '@/app/nucleus/hooks/settings/payments/useUpdateCardPaymentMethod';

export function PaymentForm() {
    const [isLoading, setIsLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const {
        updateCardPaymentMethod,
        isLoading: updateCardPaymentMethodLoading,
        error: updateCardPaymentMethodError,
    } = useUpdateCardPaymentMethod();

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setIsLoading(true);
        const cardElement =
            elements?.getElement(CardElement);
        if (stripe && cardElement) {
            const { paymentMethod } =
                await stripe.createPaymentMethod({
                    type: 'card',
                    card: cardElement,
                });
            if (paymentMethod) {
                const updatePaymentMethodResponse =
                    await updateCardPaymentMethod(
                        paymentMethod.id,
                    );
                toast({
                    title: 'Payment Method Saved. Thanks!',
                });
            } else {
                toast({
                    title: 'Unable to Save Payment Method. Please Try Again Later.',
                });
            }
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>
                    Add a new payment method to your
                    account.
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="grid gap-6">
                    <RadioGroup
                        defaultValue="card"
                        className="grid grid-cols-3 gap-4"
                    >
                        <div>
                            <RadioGroupItem
                                value="card"
                                id="card"
                                className="peer sr-only"
                            />
                            <Label
                                htmlFor="card"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="mb-3 h-6 w-6"
                                >
                                    <rect
                                        width="20"
                                        height="14"
                                        x="2"
                                        y="5"
                                        rx="2"
                                    />
                                    <path d="M2 10h20" />
                                </svg>
                                Card
                            </Label>
                        </div>
                        <div>
                            <RadioGroupItem
                                value="paypal"
                                id="paypal"
                                className="peer sr-only"
                                disabled
                            />
                            <Label
                                htmlFor="paypal"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                                <Icons.paypal className="mb-3 h-6 w-6" />
                                Paypal
                            </Label>
                        </div>
                        <div>
                            <RadioGroupItem
                                value="apple"
                                id="apple"
                                className="peer sr-only"
                                disabled
                            />
                            <Label
                                htmlFor="apple"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                                <Icons.apple className="mb-3 h-6 w-6" />
                                Apple
                            </Label>
                        </div>
                    </RadioGroup>
                    <div className="grid gap-2">
                        <CardElement
                            options={CARD_ELEMENT_OPTIONS}
                        />
                    </div>
                    {/* <div className="grid gap-2">
                        <Label>Card number</Label>
                        <CardNumberElement />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="grid gap-2">
                            <Label>Year</Label>
                            <CardExpiryElement />
                        </div>
                        <div className="grid gap-2">
                            <Label>CVC</Label>
                            <CardCvcElement />
                        </div>
                    </div> */}
                </CardContent>
                <CardFooter>
                    <Button
                        className="w-full"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading
                            ? 'Processing...'
                            : 'Save'}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: '#32325d',
            fontFamily:
                '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a',
        },
    },
};
