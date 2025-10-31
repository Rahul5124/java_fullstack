const API_URL = "http://localhost:5000/api";

async function fetchFoods() {
    const response = await fetch(`${API_URL}/food`);
    return response.json();
}

async function placeOrder(foodId) {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Please log in first!");
        return;
    }

    const response = await fetch(`${API_URL}/order`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ foodId })
    });

    return response.json();
}
