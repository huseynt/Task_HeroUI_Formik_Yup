const API = "https://jsonplaceholder.typicode.com";

// Get Users
export const getUsers = async () => {
    try {
        const res = await fetch(`${API}/users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (res.ok) {
            return res.json();
        } else {
            throw new Error("Error fetching users");
        }
    } catch (error) {
        console.error("Error", error);
    }
  };