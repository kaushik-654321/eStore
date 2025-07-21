import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Coupon {
  _id: string;
  name: string;
  code: string;
  discount: number
}

interface CouponState {
  selectedCoupon: Coupon | null;
  setSelectedCoupon: (coupon: Coupon) => void;
  clearSelectedCoupon: () => void
}

export const useCouponStore = create<CouponState>()(
  persist((set) => ({
    selectedCoupon: null,
    setSelectedCoupon: (coupon) => set({ selectedCoupon: coupon }),
    clearSelectedCoupon: () => set({ selectedCoupon: null }),
  }),
    {
      name: 'coupon-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)




