var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    displayAllItems();
  });

function displayAllItems() {
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        promptQuestions();
    });
}

function promptQuestions() {
    inquirer.prompt([
    {
        name: "item_id",
        type: "input",
        message: "What is the ID of the product that you would like to buy?"
    },
    {   name: "quantity",
        type: "input",
        message: "How many would you like to buy?"
    }
    ]).then(function(answer) {
        var query = "SELECT * FROM products WHERE ?";
        connection.query(query, {item_id: answer.item_id}, function(err, res) {
            if (err) throw err;
            if (parseInt(answer.quantity) > res[0].stock_quantity) {
                console.log("Sorry, there are only " + res[0].stock_quantity + " in stock");
                promptQuestions();
            } 
            else {
                connection.query("UPDATE products SET ? WHERE ?", [
                    {
                        stock_quantity: res[0].stock_quantity - answer.quantity
                    }, 
                    {
                        item_id: answer.item_id
                    }
                ], function(err, res) {
                    if (err) throw err;
                });
                connection.query("SELECT * FROM products WHERE ?", {item_id: answer.item_id}, function(err, res) {
                    console.log("Remaining stock quantity: " + res[0].stock_quantity);
                    console.log("You ordered: " + answer.quantity + " pc(s) of '" + res[0].product_name + "'");
                    console.log("Unit price is: $" + res[0].price);
                    console.log("---------------------------------------------------------")
                    console.log("Your order total is: $" + res[0].price * answer.quantity);
                    connection.end();
                });
            }
        });
    }) 
}



