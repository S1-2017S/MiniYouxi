// traitement de /req_solitaire_plateau_mouvement

"use strict";

var fs = require("fs");
require("remedial");

var trait = function (req, res, query)  {
	var page;
	var marqueur = [];
	var ver;                      // VERTICAL
	var hor;                      // HORIZONTAL
	var coo;                      // COORDONNÉE DE LA CASE CLIQUÉE
	var pionActif;						// PION ACTIF
	var now;
	var plateau;
	var verPS;
	var horPS;
	var fin;
	
	// LECTURE DU FICHIER PLATEAU

	now = fs.readFileSync("./solitaire_partie_"+query.pseudo+".json","UTF-8");
	plateau  = JSON.parse(now);


	// LECTURE DU PION ACTIF

	pionActif = String(plateau[8][0]);
	
	if ( pionActif !== 0 ) {
		verPS = Number(pionActif[0]);
		horPS = Number(pionActif[1]);
	}

	// ON EFFECTUE LE MOUVEMENT (SI POSSIBLE)

	coo = query.place;
	// SI LA CASE CONTIENT LE PION ACTIF IL DEVIENT PASSIF
	if ( plateau[coo[0]][coo[1]] === 2) {
		plateau[coo[0]][coo[1]] = 1;
		plateau[8] = [0];
	// SI LA CASE CLIQUE EST LIBRE ON APPLIQUE UN MOUVEMENT
	} else if (plateau[coo[0]][coo[1]] === 3) {	
		if(String(verPS)+String(horPS) === String(Number(coo[0])-2)+coo[1]) {
			if(plateau[String(Number(coo[0])-1)][coo[1]] === 1) {
				// MOUVEMENT HAUT A BAS
				plateau[coo[0]][coo[1]] = 1;
				plateau[verPS+1][horPS]= 3;
				plateau[verPS][horPS] = 3;
				plateau[7] = [plateau[7]-1];
				plateau[8] = [0];
			}
		} else if(String(verPS)+String(horPS) === String(Number(coo[0])-2)+String(Number(coo[1])+2)) {
			if ( plateau[String(Number(coo[0])-1)][String(Number(coo[1])+1)] === 1) {
				// MOUVEMENT HAUT DROITE A BAS GAUCHE
				plateau[coo[0]][coo[1]] = 1;
				plateau[verPS+1][horPS-1] = 3;
				plateau[verPS][horPS] = 3;
				plateau[7] = [plateau[7]-1];
				plateau[8] = [0];
			}
		} else if(String(verPS)+String(horPS) === String(coo[0])+String(Number(coo[1])+2)) {
			if ( plateau[coo[0]][String(Number(coo[1])+1)] === 1) {
				// MOUVEMENT DROITE A GAUCHE
				plateau[coo[0]][coo[1]] = 1;
				plateau[verPS][horPS-1] = 3;
				plateau[verPS][horPS] = 3;
				plateau[7] = [plateau[7]-1];
				plateau[8] = [0];
			}
		} else if(String(verPS)+String(horPS) === String(Number(coo[0])+2)+String(Number(coo[1])+2)) {
			if ( plateau[String(Number(coo[0])+1)][String(Number(coo[1])+1)] === 1) {
				// MOUVEMENT BAS DROITE A HAUT GAUCHE
				plateau[coo[0]][coo[1]] = 1;
				plateau[verPS-1][horPS-1] = 3;
				plateau[verPS][horPS] = 3;
				plateau[7] = [plateau[7]-1];
				plateau[8] = [0];
			}
		} else if(String(verPS)+String(horPS) === String(Number(coo[0])+2)+String(coo[1])) {
			if ( plateau[String(Number(coo[0])+1)][coo[1]] === 1) {
				// MOUVEMENT BAS A HAUT
				plateau[coo[0]][coo[1]] = 1;
				plateau[verPS-1][horPS] = 3;
				plateau[verPS][horPS] = 3;
				plateau[7] = [plateau[7]-1];
				plateau[8] = [0];
			}
		} else if(String(verPS)+String(horPS) === String(Number(coo[0])+2)+String(Number(coo[1])-2)) {
			if ( plateau[String(Number(coo[0])+1)][String(Number(coo[1])-1)] === 1 ) {
			// MOUVEMENT BAS GAUCHE A HAUT DROITE 
				plateau[coo[0]][coo[1]] = 1;
				plateau[verPS-1][horPS+1] = 3;
				plateau[verPS][horPS] = 3;
				plateau[7] = [plateau[7]-1];
				plateau[8] = [0];
			}
		} else if(String(verPS)+String(horPS) === String(coo[0])+String(Number(coo[1])-2)) {
			if ( plateau[String(coo[0])][String(Number(coo[1])-1)] === 1 ) {
				// MOUVEMENT GAUCHE A DROITE
				plateau[coo[0]][coo[1]] = 1;
				plateau[verPS][horPS+1] = 3;
				plateau[verPS][horPS] = 3;
				plateau[7] = [plateau[7]-1];
				plateau[8] = [0];
			}
		} else if(String(verPS)+String(horPS) === String(Number(coo[0])-2)+String(Number(coo[1])-2)) {
			if( plateau[String(Number(coo[0])-1)][String(Number(coo[1])-1)] === 1 ) {
				// MOUVEMENT HAUT GAUCHE A BAS DROITE
				plateau[coo[0]][coo[1]] = 1;
				plateau[verPS+1][horPS+1] = 3;
				plateau[verPS][horPS] = 3;
				plateau[7] = [plateau[7]-1];
				plateau[8] = [0];
			}
		}
	}
	

	// ENRIGISTREMENT DU FICHIER PLATEAU

	now = JSON.stringify(plateau);
	fs.writeFileSync("solitaire_partie_"+query.pseudo+".json",now,"utf-8")

	// CREATION DES MARQUEURS

	marqueur.pseudo = query.pseudo;

	for( ver = 0 ; ver < 7 ; ver++) {
		for ( hor = 0 ; hor < 7 ; hor++) {
			if( plateau[ver][hor] === 1) {
				marqueur["img"+String(ver)+String(hor)] = "solitaire_p1.png";
			}else if( plateau[ver][hor] === 2) {
				marqueur["img"+String(ver)+String(hor)] = "solitaire_p2.png";
			}else if( plateau[ver][hor] === 3) {
				marqueur["img"+String(ver)+String(hor)] = "solitaire_l.png";
			}
		}
	}

	// ENVOI PAGE MISE A JOUR
	
	page = fs.readFileSync("solitaire_plateau_mouvement.html", "UTF-8");
	page = page.supplant(marqueur)
	
	res.writeHead(200,  {'Content-Type': 'text/html'});
	res.write(page);
	res.end(); 
}

module.exports = trait;
