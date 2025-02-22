
export const fetchData = async ({API_URL, limit=null, page=null, searchQuery=null, categoryId=null}) => {
    try {
        const url = new URL(API_URL);
        if (page) url.searchParams.append("page", page);
        if (limit) url.searchParams.append("limit", limit);
        if (searchQuery) url.searchParams.append("search", searchQuery);
        if (categoryId) url.searchParams.append("id", categoryId);

        const response = await fetch(url, { credentials: "include" });

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