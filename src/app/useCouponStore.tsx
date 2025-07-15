import { create } from 'zustand';

interface Coupon{
    _id:string;
    name: string;
    code: string;
    discount: number
}

interface CouponState{
    selectedCoupon : Coupon | null;
    setSelectedCoupon : (coupon : Coupon) =>void;
    clearSelectedCoupon : () => void
}

export const useCouponStore = create<CouponState>((set) => ({
  selectedCoupon: null,
  setSelectedCoupon: (coupon) => set({ selectedCoupon: coupon }),
  clearSelectedCoupon: () => set({ selectedCoupon: null }),
}))
