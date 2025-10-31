document.addEventListener("DOMContentLoaded", async function () {
    loadFoods();
    addSearchFunctionality();
});

async function loadFoods() {
    const foodContainer = document.getElementById("food-container");
    const foods = await fetchFoods();

    foodContainer.innerHTML = "";
    foods.forEach(food => {
        const div = document.createElement("div");
        div.classList.add("food-item");
        div.innerHTML = `
            <img src="${food.image}" alt="${food.name}">
            <h3>${food.name}</h3>
            <p>Brand: ${food.brand}</p>
            <p>Price: ${food.price}</p>
            <button onclick="orderFood(${food.id}, '${food.name}')">Order</button>
        `;
        foodContainer.appendChild(div);
    });
}

function addSearchFunctionality() {
    document.getElementById('search-bar').addEventListener('input', function() {
        const searchQuery = this.value.toLowerCase();
        const foodItems = document.querySelectorAll('.food-item');

        foodItems.forEach(item => {
            const name = item.querySelector('h3').innerText.toLowerCase();
            if (name.includes(searchQuery)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

async function orderFood(foodId, name) {
    const result = await placeOrder(foodId);
    if (result.success) {
        alert(`${name} has been ordered!`);
        saveOrderToDB({ id: foodId, name });
    } else {
        alert("Error placing order!");
    }
}


//order
async function orderFood(foodId, name) {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (!token || !user) {
        alert("Please log in first!");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, userId: user.userId }) // Send userId
        });

        const data = await response.json();
        if (response.status === 201) {
            alert("Order placed successfully!");
            loadOrders();
        } else {
            alert("Failed to place order");
        }
    } catch (error) {
        console.error("Order error:", error);
    }
}

//theme
document.addEventListener("DOMContentLoaded", function() {
    // Load and apply the saved theme on page load
    const savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme);

    // Set the theme selector dropdown to match saved theme
    document.getElementById("theme-selector").value = savedTheme;
});

// Function to toggle settings container
function toggleSettings() {
    const settings = document.getElementById("settings-container");
    settings.style.display = settings.style.display === "block" ? "none" : "block";
}

// Function to apply selected theme
function applyTheme(theme) {
    if (!theme) {
        theme = document.getElementById("theme-selector").value;
    }

    if (theme === "dark") {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }

    // Save the selected theme to localStorage
    localStorage.setItem("theme", theme);
}

// Event listener to apply theme when dropdown changes
document.getElementById("theme-selector").addEventListener("change", function() {
    applyTheme(this.value);
});


