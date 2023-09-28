const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
function afficherMenu() {
  console.log('********************************************');
  console.log('*        Analyseur de Fichier by Zwx       *');
  console.log('********************************************');
  console.log('1. Analyser le nombre de lignes');
  console.log('2. Analyser le nombre de mots');
  console.log('3. Analyser la longueur moyenne des lignes');
  console.log('4. Afficher le contenu complet du fichier');
  console.log('5. Tout analyser en même temps');
  console.log('6. Quitter');
  rl.question('Veuillez choisir une option (1-6) : ', (choix) => {
    if (choix === '1') {
      analyserFichier('lignes');
    } else if (choix === '2') {
      analyserFichier('mots');
    } else if (choix === '3') {
      analyserFichier('longueurMoyenne');
    } else if (choix === '4') {
      analyserFichier('complet');
    } else if (choix === '5') {
      analyserFichier('tout');
    } else if (choix === '6') {
      rl.close();
    } else {
      console.log('Option invalide. Veuillez choisir une option valide (1-6).');
      afficherMenu();
    }
  });
}
function analyserFichier(type) {
  rl.question('Veuillez entrer le nom du fichier à analyser : ', (nomFichier) => {
    fs.readFile(nomFichier, 'utf-8', (err, data) => {
      if (err) {
        console.error(`Erreur lors de la lecture du fichier : ${err.message}`);
        rl.question('Voulez-vous réessayer (O/N) ? ', (reponse) => {
          if (reponse.toLowerCase() === 'o') {
            analyserFichier(type); 
          } else {
            afficherMenu();
          }
        });
        return;
      }
      switch (type) {
        case 'lignes':
          const nombreDeLignes = data.split('\n').length;
          console.log(`Nombre de lignes : ${nombreDeLignes}`);
          break;
        case 'mots':
          const mots = data.split(/\s+/);
          const nombreDeMots = mots.length;
          console.log(`Nombre de mots : ${nombreDeMots}`);
          break;
        case 'longueurMoyenne':
          const lignes = data.split('\n');
          const sommeDesLongueurs = lignes.reduce((total, ligne) => total + ligne.length, 0);
          const longueurMoyenne = sommeDesLongueurs / lignes.length;
          console.log(`Longueur moyenne des lignes : ${longueurMoyenne.toFixed(2)} caractères`);
          break;
        case 'complet':
          console.log('Contenu du fichier :\n');
          console.log(data);
          break;
        case 'tout':
          const tout = {
            nombreDeLignes: data.split('\n').length,
            nombreDeMots: data.split(/\s+/).length,
            longueurMoyenne: (data.length / data.split('\n').length).toFixed(2),
            contenu: data
          };
          console.log('Résultats complets :\n');
          console.log(`Nombre de lignes : ${tout.nombreDeLignes}`);
          console.log(`Nombre de mots : ${tout.nombreDeMots}`);
          console.log(`Longueur moyenne des lignes : ${tout.longueurMoyenne} caractères`);
          console.log('Contenu du fichier :\n');
          console.log(tout.contenu);
          break;
      }
      afficherMenu();
    });
  });
}
afficherMenu(); 
