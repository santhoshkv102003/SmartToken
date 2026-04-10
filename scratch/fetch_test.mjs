(async () => {
    try {
        const res = await fetch("http://localhost:5000/api/patients");
        const body = await res.text();
        console.log("Status:", res.status);
        console.log("Body:", body);
    } catch (err) {
        console.error("Fetch failed:", err);
    }
})();
