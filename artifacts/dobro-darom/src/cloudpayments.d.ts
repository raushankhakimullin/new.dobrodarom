// Type declarations for CloudPayments widget
// Loaded via <script src="https://widget.cloudpayments.ru/bundles/cloudpayments.js">

interface CloudPaymentsRecurrent {
  interval: "Day" | "Week" | "Month";
  period: number;
  maxPeriods?: number; // 0 = unlimited
  startDate?: string;  // ISO date string
  amount?: number;
}

interface CloudPaymentsParams {
  publicId: string;
  description: string;
  amount: number;
  currency: string;
  accountId?: string;
  invoiceId?: string;
  email?: string;
  phone?: string;
  skin?: "classic" | "mini" | "modern";
  requireEmail?: boolean;
  requirePhone?: boolean;
  recurrent?: CloudPaymentsRecurrent;
  data?: Record<string, unknown>;
}

interface CloudPaymentsCallbacks {
  onSuccess?: (options: CloudPaymentsParams) => void;
  onFail?: (reason: string, options: CloudPaymentsParams) => void;
  onComplete?: (paymentResult: { success: boolean }, options: CloudPaymentsParams) => void;
}

interface CloudPaymentsWidget {
  pay(
    action: "charge" | "auth",
    params: CloudPaymentsParams,
    callbacks?: CloudPaymentsCallbacks
  ): void;
}

declare global {
  interface Window {
    cp?: {
      CloudPayments: new () => CloudPaymentsWidget;
    };
  }
}

export {};
