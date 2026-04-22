let _razorpay: any = null;

export function getRazorpay() {
  if (_razorpay) return _razorpay;
  const Razorpay = require("razorpay");
  _razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID ?? "placeholder",
    key_secret: process.env.RAZORPAY_KEY_SECRET ?? "placeholder",
  });
  return _razorpay;
}

export function formatAmountForRazorpay(amount: number) {
  return amount * 100; // Razorpay expects paise
}
