// traitement de /req_simon_phase_repetition

"use strict";

var fs = require("fs");
require("remedial")
var page;
var marqueur;

var trait = function (req, res, query) {
   var partie ; 		// DECOMPRESSION DU JSON
	var redirection;	// REQUETE REDIRIGER
	var bouton ;		
	var i;
	var fin ;
	// LECTURE DU JSON

	partie = fs.readFileSync("simon_partie_"+query.pseudo+".json");
	partie = JSON.parse(partie);
	
	
	// RECUPERATION DU QUERY BUTTON & ASSIGNEMENT DES COULEURS JOUER
	
	bouton = query.button ;
	
	if ( bouton === "blue" ){
		partie[3][partie[2]] = 1;
		partie[2] = [Number(partie[2])+1];
	}else if ( bouton === "red"){
		partie[3][partie[2]] = 2;
		partie[2] = [Number(partie[2])+1];
	}else if ( bouton === "green"){
		partie[3][partie[2]] = 3;
		partie[2] = [Number(partie[2])+1];
	}else if ( bouton === "yellow"){
		partie[3][partie[2]] = 4;
		partie[2] = [Number(partie[2])+1];
	}
	
	// COMRARAISON DES COULEURS GENERER ET COULEURS JOUER
	
	if ( Number(partie[0]) === Number(partie[2])){
		console.log("CA RENTRE ?")
		redirection = 1;
		
		for ( i = 0 ; i < partie[2] ; i++){
			if (partie[1][i] !== partie[3][i]){
				redirection = 0;
			}
		}
	}
	
	if ( partie[0] === 14 ){
		fin = true ;
		partie[4] = [1];
	}  
	
	if ( redirection === 0 ){
		partie[4] = [0];
	}

	// CREATION DES MARQUEURS 

	marqueur = {};
	marqueur.pseudo = query.pseudo;
	
	if ( redirection === 0 || fin === true ){
		marqueur.button ="<form action ='req_simon_fin' method='GET'><input type='hidden' name='pseudo' value ='"+query.pseudo+"'><button class='button6'name='action'value='jeu'><span>Valider</span></button><br>";
	} else if ( redirection === 1 && Number(partie[0]) < 14){
		marqueur.button ="<form action ='req_simon_phase_memorisation' method='GET'><input type='hidden' name='pseudo' value ='"+query.pseudo+"'><button class='button6'name='action'value='jeu'><span>Valider</span></button><br>";
	} else {
		marqueur.button = "";
	}

	// ENREGISTREMENT DU JSON
	
	partie = JSON.stringify(partie);
	fs.writeFileSync("simon_partie_"+query.pseudo+".json", partie , "UTF-8");

	// ENVOIE DE LA PAGE

	page = fs.readFileSync("simon_phase_repetition.html", "UTF-8");
	page = page.supplant(marqueur)

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end(); 
}

module.exports = trait;
