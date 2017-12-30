// traitement de /req_joueur_pose_pion_morpion

"use strict";

var fs = require("fs");
require("remedial")
var page;
var marqueur;
var places;
var nb
var piece
var position

var trait = function (req, res, query) {
    

	marqueur = fs.readFileSync("information_plateau_morpion_" + query.pseudo + ".json", "UTF-8");
	marqueur = JSON.parse(marqueur);

	console.log(query.pseudo)
	places = fs.readFileSync("places_disponible_morpion_" + query.pseudo + ".json", "UTF-8");
	places = JSON.parse(places);

    position = fs.readFileSync("position_morpion_" + query.pseudo + ".json", "UTF-8");
	position = JSON.parse(position);



    if ("place00" in query && marqueur.val00 === "libre"){
	    marqueur.val00 = "joueur"
		position[0][0] = "joueur"
		marqueur.case00 = "croix.png"
		places.splice(places.indexOf("place00"), 1)
	}
	
    if ("place10" in query && query.place10 === "libre"){
	    marqueur.val10 = "joueur"
		position[0][1] = "joueur"
		marqueur.case10 = "croix.png"
		places.splice(places.indexOf("place10"), 1)
	}
	
    if ("place20" in query && query.place20 === "libre"){
	    marqueur.val20 = "joueur"
		position[0][2] = "joueur"
		marqueur.case20 = "croix.png"
		places.splice(places.indexOf("place20"), 1)
	}

    if ("place01" in query && query.place01 === "libre"){
	    marqueur.val01 = "joueur"
		position[1][0] = "joueur"
		marqueur.case01 = "croix.png"
		places.splice(places.indexOf("place01"), 1)
	}
	
    if ("place11" in query && query.place11 === "libre"){
	    marqueur.val11 = "joueur"
		position[1][1] = "joueur"
		marqueur.case11 = "croix.png"
		places.splice(places.indexOf("place11"), 1)
	}
	    
    if ("place21" in query && query.place21 === "libre"){
	    marqueur.val21 = "joueur"
		position[1][2] = "joueur"
		marqueur.case21 = "croix.png"
		places.splice(places.indexOf("place21"), 1)
	}

    if ("place02" in query && query.place02 === "libre"){
	    marqueur.val02 = "joueur"
		position[2][0] = "joueur"
		marqueur.case02 = "croix.png"
		places.splice(places.indexOf("place02"), 1)
	}
	    
    if ("place12" in query && query.place12 === "libre"){
	    marqueur.val12 = "joueur"
		position[2][1] = "joueur"
		marqueur.case12 = "croix.png"
		places.splice(places.indexOf("place12"), 1)
	}

    if ("place22" in query && query.place22 === "libre"){
	    marqueur.val22 = "joueur"
		position[2][2] = "joueur"
		marqueur.case22 = "croix.png"
		places.splice(places.indexOf("place22"), 1)
	}

// le joueur a jouer
// on regarde si il y a un gagnant

	var value = "true";
	for (var idx = 0; idx < position.length ; idx += 1) {
	    for (var index = 0; index < position[idx].length ; index += 1) {
		    if (position[idx][index] === "rien") {
			    value = "false";
				
			}
		}
	}

    var gagnant

	if (
	// On regarde si toutes les places sont prise
		value === "true"
	) {gagnant = "nul, il n'y a pas de de gagnant"}
	if (
        position[0][0] !== "rien" &&
		position[0][0] === position[0][1] &&
		position[0][0] === position[0][2]
	) {gagnant = position[0][0]}
	//console.log("1A")}

	if (
		position[1][0] !== "rien" &&
		position[1][0] === position[1][1] &&
		position[1][0] === position[1][2]
	) {gagnant = position[1][0]}
	//console.log("2A")}
	if (
		position[2][0] !== "rien" &&
		position[2][0] === position[2][1] &&
		position[2][0] === position[2][2]
	) {gagnant = position[2][0]}
	//console.log("3A")}

	//les lignes
	if (
		position[0][0] !== "rien" &&
		position[0][0] === position[1][0] &&
		position[0][0] === position[2][0]
	) {gagnant = position[0][0]}
	//console.log("4A")}

    if (
		position[0][1] !== "rien" &&
		position[0][1] === position[1][1] &&
		position[0][1] === position[2][1]
	) {gagnant = position[0][1]}
	//console.log("5A")}

	if (
        position[0][2] !== "rien" &&
	    position[0][2] === position[1][2] &&
	    position[0][2] === position[2][2]
	) {gagnant = position[0][2]}
	//console.log("6A")}

	//les colones
	if (
		position[0][0] !== "rien" &&
		position[0][0] === position[1][1] &&
		position[0][0] === position[2][2]
	) {gagnant = position[0][0]}
	//console.log("7A")}
    if (
		position[0][2] !== "rien" &&
		position[0][2] === position[1][1]&&
		position[0][2] === position[2][0]
	) {gagnant = position[0][2]}
	//console.log("8A")}
	//les diagonales

// le gagnan est déterminé

	if (gagnant !== "joueur") {
	//l'ordi va jouer

		nb = Math.floor(Math.random() * places.length - 1) + 1

		piece = places[nb]

		switch (piece) {
			case "place00":
				marqueur.val00 = "ordi";
				position[0][0] = "ordi"
				marqueur.case00 = "cercle.png";
				places.splice(places.indexOf("place00"), 1)
				break;
			case "place10":
				marqueur.val10 = "ordi";
				position[0][1] = "ordi"
				marqueur.case10 = "cercle.png"
				places.splice(places.indexOf("place10"), 1)
				break;
			case "place20":
				marqueur.val20 = "ordi";
				position[0][2] = "ordi"
				marqueur.case20 = "cercle.png"
				places.splice(places.indexOf("place20"), 1)
				break;
			case "place01":
				marqueur.val01 = "ordi";
				position[1][0] = "ordi"
				marqueur.case01 = "cercle.png"
				places.splice(places.indexOf("place01"), 1)
				break;
			case "place11":
				marqueur.val11 = "ordi";
				position[1][1] = "ordi"
				marqueur.case11 = "cercle.png"
				places.splice(places.indexOf("place11"), 1)
				break;
			case "place21":
				marqueur.val21 = "ordi"
				position[1][2] = "ordi"
				marqueur.case21 = "cercle.png"
				places.splice(places.indexOf("place21"), 1)
				break;
			case "place02":
				marqueur.val02 = "ordi";
				position[2][0] = "ordi"
				marqueur.case02 = "cercle.png";
				places.splice(places.indexOf("place02"), 1)
				break;
			case "place12":
				marqueur.val12 = "ordi";
				position[2][1] = "ordi"
				marqueur.case12 = "cercle.png";
				places.splice(places.indexOf("place12"), 1)
				break;
			case "place22":
				marqueur.val = "ordi";
				position[2][2] = "ordi"
				marqueur.case22 = "cercle.png";
				places.splice(places.indexOf("place22"), 1)
				break;
		}
		
	// l'ordi a jouer

	// on regarde si il y a un gagnant

		var value = "true";
		for (var idx = 0; idx < position.length ; idx += 1) {
			for (var index = 0; index < position[idx].length ; index += 1) {
				if (position[idx][index] === "rien") {
					value = "false";
					
				}
			}
		}

		var gagnant

		if (
		// On regarde si toutes les places sont prise
			value === "true"
		) {gagnant = "nul, il n'y a pas de de gagnant"}
		if (
			position[0][0] !== "rien" &&
			position[0][0] === position[0][1] &&
			position[0][0] === position[0][2]
		) {gagnant = position[0][0]}
		//console.log("1B")}
		if (
			position[1][0] !== "rien" &&
			position[1][0] === position[1][1] &&
			position[1][0] === position[1][2]
		) {gagnant = position[1][0]}
		//console.log("2B")}
		if (
			position[2][0] !== "rien" &&
			position[2][0] === position[2][1] &&
			position[2][0] === position[2][2]
		) {gagnant = position[2][0]}
		//console.log("3B")}
		//les lignes
		if (
			position[0][0] !== "rien" &&
			position[0][0] === position[1][0] &&
			position[0][0] === position[2][0]
		) {gagnant = position[0][0]}
		//console.log("4B")}
		if (
			position[0][1] !== "rien" &&
			position[0][1] === position[1][1] &&
			position[0][1] === position[2][1]
		) {gagnant = position[0][1]}
		//console.log("5B")}
		if (
			position[0][2] !== "rien" &&
			position[0][2] === position[1][2] &&
			position[0][2] === position[2][2]
		) {gagnant = position[0][2]}
		//console.log("6B")}
		//les colones
		if (
			position[0][0] !== "rien" &&
			position[0][0] === position[1][1] &&
			position[0][0] === position[2][2]
		) {gagnant = position[0][0]}
		//console.log("7B")}
		if (
			position[0][2] !== "rien" &&
			position[0][2] === position[1][1]&&
			position[0][2] === position[2][0]
		) {gagnant = position[0][2]}
		//console.log("8B")}
		//les diagonales
	// le gagnan est déterminé
	}

	if (gagnant !== undefined ) {
	// si il y a un gagnant

		// On prépare les marqueurs pour la page puis on renvoie la page
		if (gagnant === "joueur") {
		    marqueur.winer = "Le gagnant est : " + query.pseudo
		} else if (gagnant === "ordi") {
			marqueur.winer = "Le gagnant est : " + gagnant
		} else if (value === "true") {
		    marqueur.winer = "Match nul"
		}

	    page = fs.readFileSync("resultat_morpion.html", "UTF-8");
		var plateau = fs.readFileSync("information_plateau_morpion_" + query.pseudo + ".json", "UTF-8");

		marqueur.place00 = plateau.case00;
		marqueur.place10 = plateau.case10;
		marqueur.place20 = plateau.case20;
		marqueur.place01 = plateau.case01;
		marqueur.place11 = plateau.case11;
		marqueur.place21 = plateau.case21;
		marqueur.place02 = plateau.case02;
		marqueur.place12 = plateau.case12;
		marqueur.place22 = plateau.case22;

		console.log(marqueur.winer)

		page = page.supplant(marqueur);

		// On remet le morpion comme avant "on range le jeu"

		fs.unlinkSync("information_plateau_morpion_" + query.pseudo + ".json");
		fs.unlinkSync("places_disponible_morpion_" + query.pseudo + ".json");
		fs.unlinkSync("position_morpion_" + query.pseudo + ".json");

		var effacer = "true"

    } else {
	// on affiche le plateau

	marqueur.pseudo = query.pseudo
	page = fs.readFileSync("plateau_morpion.html", "UTF-8");
	page = page.supplant(marqueur)

    marqueur = JSON.stringify(marqueur)
	fs.writeFileSync("information_plateau_morpion_" + query.pseudo + ".json", marqueur, "UTF-8");

	places = JSON.stringify(places)
	fs.writeFileSync("places_disponible_morpion_" + query.pseudo + ".json", places, "UTF-8");
	
	position = JSON.stringify(position);
	fs.writeFileSync("position_morpion_" + query.pseudo + ".json", position, "UTF-8");

	}



	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end(); 

//	if (effacer) {
	    //fs.unlinkSync("resultat_morpion_" + query.pseudo + ".html");
//	}

}

module.exports = trait;
