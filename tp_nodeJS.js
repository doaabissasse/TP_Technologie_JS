const axios = require('axios');
const prompt = require('prompt-sync')();

// Initialisation des HP des deux joueurs
let playerHP = 300;
let botHP = 300;
let playerPokemon, botPokemon;
let playerMoves = [], botMoves = [];

// Fonction pour récupérer un Pokémon aléatoire
async function getRandomPokemon() {
    const id = Math.floor(Math.random() * 898) + 1; // Il y a 898 Pokémon dans PokéAPI
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return response.data;
}

// Fonction pour permettre au joueur de choisir son Pokémon
async function choosePlayerPokemon() {
    playerPokemon = await getRandomPokemon();
    console.log(`Vous avez choisi ${playerPokemon.name}`);
    
    // Choix de 5 mouvements aléatoires pour le joueur
    playerMoves = playerPokemon.moves
        .sort(() => 0.5 - Math.random()) // Mélanger les mouvements
        .slice(0, 5)
        .map(move => ({
            name: move.move.name,
            url: move.move.url
        }));
    
    console.log('Vos mouvements:', playerMoves);
}

// Fonction pour configurer le Pokémon du bot
async function setupBot() {
    botPokemon = await getRandomPokemon();
    console.log(`Le bot a choisi ${botPokemon.name}`);

    // Choix de 5 mouvements aléatoires pour le bot
    botMoves = botPokemon.moves
        .sort(() => 0.5 - Math.random())
        .slice(0, 5)
        .map(move => ({
            name: move.move.name,
            url: move.move.url
        }));

    console.log('Mouvements du bot:', botMoves);
}

// Fonction pour obtenir les détails d'un mouvement
async function getMoveDetails(url) {
    const response = await axios.get(url);
    const { power, accuracy, pp } = response.data;
    return { power, accuracy, pp };
}

// Fonction pour simuler une attaque
async function attack(attacker, defender, move) {
    const moveDetails = await getMoveDetails(move.url);
    console.log(`${attacker.name} utilise ${move.name}!`);

    // Vérification de la précision du mouvement
    const hitChance = Math.random() * 100;
    if (hitChance > moveDetails.accuracy) {
        console.log(`${move.name} a raté sa cible !`);
        return;
    }

    // Dégâts infligés
    const damage = moveDetails.power || 10; // Valeur par défaut si power est null
    defender.hp -= damage;
    console.log(`${attacker.name} inflige ${damage} points de dégâts!`);
}

// Boucle principale du jeu
async function gameLoop() {
    await choosePlayerPokemon();
    await setupBot();

    playerPokemon.hp = playerHP;
    botPokemon.hp = botHP;

    let playerTurn = true;

    while (playerPokemon.hp > 0 && botPokemon.hp > 0) {
        if (playerTurn) {
            console.log('Votre tour! Choisissez un mouvement :');
            playerMoves.forEach((move, index) => {
                console.log(`${index + 1}: ${move.name}`);
            });

            const choice = parseInt(prompt('Choisissez votre mouvement (1-5): ')) - 1;
            const playerMove = playerMoves[choice];

            await attack(playerPokemon, botPokemon, playerMove);
        } else {
            const randomMoveIndex = Math.floor(Math.random() * botMoves.length);
            const botMove = botMoves[randomMoveIndex];

            await attack(botPokemon, playerPokemon, botMove);
        }

        console.log(`HP Joueur: ${playerPokemon.hp}, HP Bot: ${botPokemon.hp}`);
        playerTurn = !playerTurn;
    }

    if (playerPokemon.hp <= 0) {
        console.log('Vous avez perdu!');
    } else {
        console.log('Vous avez gagné!');
    }
}

// Lancer le jeu
gameLoop();
