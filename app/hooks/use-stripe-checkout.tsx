import { useMutation } from "@tanstack/react-query";

interface CreateCheckoutSessionData {
    userId: string;
    userEmail?: string;
    userName?: string;
}

interface CheckoutSessionResponse {
    sessionId: string;
    url: string;
}

export function useCreateCheckoutSession() {
    return useMutation({
        mutationFn: async (data: CreateCheckoutSessionData): Promise<CheckoutSessionResponse> => {
            const response = await fetch('/api/stripe/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to create checkout session');
            }

            return response.json();
        },
    });
}