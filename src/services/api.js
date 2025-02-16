const API_URL = "https://fantastic-disco-x457747qvww2p5vp-5000.app.github.dev/fruits/";

export const fetchData = async (API_URL, limit, page, searchQuery) => {
    try {
        const response = await fetch(`${API_URL}?page=${page}&limit=${limit}&search=${searchQuery}`, { credentials: "include" });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
        return { error: "Failed to fetch data" };
    }
};