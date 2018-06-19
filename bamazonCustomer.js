//require mysql and inquirer
var mysql = require('mysql');
var inquirer = require('inquirer');
//create connection to db
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "kirby112",
  database: "bamazon_db"
})

function start(){
//prints the items for sale and their details
connection.query('SELECT * FROM products', function(err, res){
  if(err) throw err;

  console.log(' _____---------_____Welcome to Bamazon_____--------_____')


  console.log('----------------------------------------------------------------------------------------------------')

  for(var i = 0; i<res.length;i++){
    console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: $" + res[i].price + " | " + "Quantity: " + res[i].stock_quantity);
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
  }

  console.log(' ');
  inquirer.prompt([
    {
      type: "input",
      name: "id",
      message: "What is the ID of the product you would like to purchase? Please enter a value of 1-10.",
      validate: function(value){
        if(isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0){
          return true;
        } else{
          return false;
        }
      }
    },
    {
      type: "input",
      name: "quantity",
      message: "How much would you like to purchase?",
      validate: function(value){
        if(isNaN(value)){
          return false;
        } else{
          return true;
        }
      }
    }
    ]).then(function(ans){
      var whatToBuy = (ans.item_id)-1;
      var howMuchToBuy = parseInt(ans.stock_quantity);
      var grandTotal = parseFloat(((res[whatToBuy].price)*howMuchToBuy).toFixed(2));

      if(res[whatToBuy].stock_quantity >= howMuchToBuy){
       
        connection.query("UPDATE products SET ? WHERE ?", [
        {stock_quantity: (res[whatToBuy].stock_quantity - howMuchToBuy)},
        {item_id: ans.item_id}
        ], function(err, result){
            if(err) throw err;
            console.log("Success! Your total is $" + grandTotal.toFixed(2) + ". Your item(s) will be shipped to you in the next nanosecond.");
        });

        connection.query("SELECT * FROM department_name", function(err, deptRes){
          if(err) throw err;
          var index;
          for(var i = 0; i < deptRes.length; i++){
            if(deptRes[i].department_name === res[whatToBuy].department_name){
              index = i;
            }
          }
          
          connection.query("UPDATE department_name SET ? WHERE ?", [
          {TotalSales: deptRes[index].TotalSales + grandTotal},
          {department_name: res[whatToBuy].department_name}
          ], function(err, deptRes){
              if(err) throw err;
            
          });
        });
      } else{
        console.log("Sorry, there's not enough in stock!");
      }

      reprompt();
    })
})
}

//ask if they would like to purchase another item
function reprompt(){
  inquirer.prompt([{
    type: "confirm",
    name: "reply",
    message: "Would you like to purchase another item?"
  }]).then(function(ans){
    if(ans.reply){
      start();
    } else{
      console.log("See you soon!");
    }
  });
}

start();