var connection = require("../config/connection.js");

//==========================================================
// Helper Functions for MYSQL Syntax

// adds a ? for each value we want to add to a MYSQL query
function printQuestionMarks(num) {
    var arr = [];
    for (let i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

// helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];
    //convert each key/value pair to string and push into array
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // add quotes if the string has spaces
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // insert '=' in place of ':'
            arr.push(key + "=" + value);
        }
    }
    // translate array of strings to a single comma-separated string
    return arr.toString();
}

// End Helper Functions
//==============================================================

//==============================================================
// ORM Object with Methods to Handle All Necessary MYSQL Commands
var orm = {
    selectAll: function(tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            
            cb(result);
        });
    },
      
    insertOne: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";
        
        console.log(queryString);
        
        connection.query(queryString, vals, function(err, result) {
            if (err) {
                throw err;
            }
            
            cb(result);
        });
    },
    
    updateOne: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;
        
        console.log(queryString);
        
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            
            cb(result);
        });
    }
};
// End ORM Object
//===========================================================

module.exports = orm;