var express = require('express');
var orm = require('orm');
var app = express();
const cors = require('cors');

app.use(cors({
    origin: '*'
}));

app.use(orm.express("mysql://anontxt:apassword@localhost/sw-1", {
	define: function (db, models, next) {
		models.deck = db.define("deck", {id:{type: 'integer', key: true}, name : String, faction: String, card: Object});
		next();
	}
}));

/*
Create Model

CREATE TABLE `anontxt_dev-1`.`deck` ( `id` INT(11) NOT NULL AUTO_INCREMENT , `name` VARCHAR(25) NOT NULL , `faction` VARCHAR(25) NOT NULL , `card` JSON NOT NULL , PRIMARY KEY (`id`), UNIQUE (`name`)) ENGINE = InnoDB;

*/

app.use(express.json())
app.listen(5000);


app.get("/", function (req, res) {
	res.send("Api Up");
});

/*

Deck
 id int auto
 name string unique
 faction enum
 card array[] Object

post json 

{
    "name":"Group 1",
    "faction":"Rebel",
    "card":[1,2,3]
}

*/
app.post("/deckscreate", function (req, res) {

//int
//var id = req.body.id;	
//string	
var name = req.body.name;
//string
var faction = req.body.faction;
//object - array
var card = req.body.card;
//var card = [];

var newRecord = {};
//newRecord.id = 1;
//newRecord.id = id;
newRecord.name = name;
newRecord.faction = faction;
newRecord.card = card;

	req.models.deck.create(newRecord, function(err, items) {

		// err - description of the error or null
		// items - array of inserted items

        if(err) {
			if(Array.isArray(err)) {
			  res.send(200);
			} else {
			  //res.send(err);
			  //res.send(200);
			}
		  }

		  res.send(items);
		
	});	

});

/*

Deck
 id int auto
 name string unique
 faction enum
 card array[] Object

delete by name

{"name":"test6"}

*/

app.post("/decksdelete", function (req, res) {

	
//int
//var id = req.body.id;	
//string	
var name = req.body.name;
//string
var faction = req.body.faction;
//object - array
var card = req.body.card;
//var card = [];

var newRecord = {};
//newRecord.id = 1;
//newRecord.id = id;
newRecord.name = name;
newRecord.faction = faction;
newRecord.card = card;

	req.models.deck.find({ name: newRecord.name }).remove(function (err) {
		// 
		
		// err - description of the error or null
		// items - array of inserted items

        if(err) {
			if(Array.isArray(err)) {
			  res.send(200);
			} else {
			  //res.send(err);
			  //res.send(200);
			}
		  }

		  res.send("removed");
	  });

});

/*

Deck
 id int auto
 name string unique
 faction enum
 card array[] Object

select deck by name
push card id onto card array
and save

{"name":"test6", "addcardid":7}

*/

app.post("/addcardtodecks", function (req, res) {

//int
var addcardid = req.body.addcardid;

//int
//var id = req.body.id;	
//string	
var name = req.body.name;
//string
//var faction = req.body.faction;


//object - array
//var card = req.body.card;
//var card = [];



var newRecord = {};
//newRecord.id = 1;
//newRecord.id = id;
newRecord.name = name;
//newRecord.faction = faction;

//newRecord.card = card;

newRecord.addcardid = addcardid;



	
	req.models.deck.find({ name: newRecord.name }, function (err, items) {


		var a = items[0].card;
		let arr1 = a; 
		let arr2 = [newRecord.addcardid]; 
		items[0].card = [...arr1, ...arr2];

		//items[0].card = [newRecord.addcardid];
		
        items[0].save(function (err) {
            // err.msg = "under-age";
			if(err) {
				if(Array.isArray(err)) {
				  res.send(200);
				} else {
				  res.send(err);
				  //res.send(200);
				}
			  }
	
			  res.send(items);



        });

		
	});	


});

/*
*****
Deck
 id int auto
 name string unique
 faction enum
 card array[] Object

select deck by name
see if card in card array
copy array
remove card no. from array

save array back in database

*/

// /remove/deck1/cardid
app.get("/removecard", function (req, res) {

});

/*
*****
Deck
 id int auto
 name string unique
 faction enum
 card array[] Object


read json post that has two deck names 
read first deck to see if card in deck (find deck by name)
if so remove card
update that deck

add card to new deck by adding it the card array (find deck by name)
update that deck

save array back in database

*/



// /swapcard/deck1name/deck2name
app.get("/swapcard", function (req, res) {

});


// read all decks
app.get("/alldecks", function (req, res) {

	req.models.deck.find(function(err, items) {

        if(err) {
			if(Array.isArray(err)) {
			  res.send(200);
			} else {
			  //res.send(err);
			  //res.send(200);
			}
		  }

		  res.send(items);

	});

});

/*
// read decks by name
app.get("/alldecks", function (req, res) {

});

// read decks by id
app.get("/alldecks", function (req, res) {

});
*/