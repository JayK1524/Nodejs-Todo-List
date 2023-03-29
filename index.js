const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

// Set up EJS as the view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Set up body-parser to parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static assets from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Define the to-do list route
let todoList = [];
app.get("/", (req, res) => {
	res.render("index", { todoList });
});

app.post("/add", (req, res) => {
	const todoItem = req.body.todo;
	if (todoItem) {
		todoList.push(todoItem);
	}
	res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
	const id = req.params.id;
	const todoItem = todoList[id];
	res.render("edit", { id, todoItem });
});

app.post("/update/:id", (req, res) => {
	const id = req.params.id;
	const todoItem = req.body.todo;
	todoList[id] = todoItem;
	res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
	const id = req.params.id;
	todoList.splice(id, 1);
	res.redirect("/");
});

// Start the server
app.listen(3000, () => {
	console.log("Server started on port 3000");
});
