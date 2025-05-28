import { persistor, store } from "../app/store";
import { clearCart } from "../features/cartSlice";

const INACTIVITY_DAYS = 1;  // Customize as needed
const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;

export const updateActivity = () => {
    localStorage.setItem('lastActivity', Date.now().toString());
};

export const checkActivity = () => {
    const lastActivity = localStorage.getItem('lastActivity');
    if (lastActivity) {
        const lastTime = parseInt(lastActivity, 10);
        const now = Date.now();
        const diffInDays = (now - lastTime) / MILLISECONDS_IN_A_DAY;

        if (diffInDays > INACTIVITY_DAYS) {
            // Clear guest data
            localStorage.removeItem('persist:cart');
            localStorage.removeItem('lastActivity');
            persistor.purge();
            store.dispatch(clearCart());
        }
    }
}