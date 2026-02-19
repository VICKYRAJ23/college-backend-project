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

app.get("/users", (req, res) => {
    if (fs.existsSync("users.json")) {
        const data = fs.readFileSync("users.json");
        res.json(JSON.parse(data));
    } else {
        res.json([]);
    }
});

app.delete("/delete/:id", (req, res) => {
    const userId = req.params.id;

    if (!fs.existsSync("users.json")) {
        return res.json({ message: "No users found" });
    }

    let users = JSON.parse(fs.readFileSync("users.json"));

    const filteredUsers = users.filter(user => user.id !== userId);

    fs.writeFileSync("users.json", JSON.stringify(filteredUsers, null, 2));

    res.json({ message: `User ${userId} deleted successfully` });
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
