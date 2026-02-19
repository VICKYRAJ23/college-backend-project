const express = require("express");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Route to handle login
app.post("/login", (req, res) => {
    const { id, password } = req.body;

    if (!id || !password) {
        return res.json({ message: "Please enter ID and password" });
    }

    const newUser = { id, password };

    let users = [];

    if (fs.existsSync("users.json")) {
        const data = fs.readFileSync("users.json");
        users = JSON.parse(data);
    }

    users.push(newUser);

    fs.writeFileSync("users.json", JSON.stringify(users, null, 2));

    res.json({ message: "Login data saved successfully!" });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
