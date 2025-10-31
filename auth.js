function logout() {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    window.location.href = "index.html";
}
