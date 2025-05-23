const GUEST_EXPIRY_MINUTES = 1;
const GUEST_TIMESTAMP_KEY = 'guest_cart_saved_at';
const PERSIST_KEY = 'persist:cart';


export const clearExpiredGuestData = () => {
    const savedAt = localStorage.getItem(GUEST_TIMESTAMP_KEY);
    if (!savedAt) return;

    const expired =
        Date.now() - parseInt(savedAt, 10) > GUEST_EXPIRY_MINUTES * 60 * 1000;


        // clear only guest cart from persist storage
     
           localStorage.removeItem(PERSIST_KEY);
        

        // optionally clear the timestamp
        localStorage.removeItem(GUEST_TIMESTAMP_KEY);
    
};