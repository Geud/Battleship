/**** Import npm libs ****/

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const session = require("express-session")({
    // battle ship encode in sha256
    secret: "eb8fcc253281389225b4f7872f2336918ddc7f689e1fc41b64d5c4f378cdc438", //je sais pas comment obtenir un nouveau hash
    resave: true,                                                              //mais d'apres ce que je comprend c'est juste pour la sécu du site
    saveUninitialized: true,
    cookie: {
        maxAge: 2 * 60 * 60 * 1000,
        secure: false
    }
});
const sharedsession = require("express-socket.io-session");
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');

/**** Import project libs ****/

const states = require('./back/modules/states');


/**** Project configuration ****/

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Init of express, to point our assets

app.use(express.static(__dirname + '/front/')); //on montre a serveur qu il peut utiliser le dossier front, qu'il agit dessu
app.use(urlencodedParser);
app.use(session);

// Configure socket io with session middleware
io.use(sharedsession(session, {
    // Session automatiquement sauvegardée en cas de modification
    autoSave: true
}));

// Détection de si nous sommes en production, pour sécuriser en https
if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    session.cookie.secure = true // serve secure cookies
}

/**** Code ****/

app.get('/', (req, res) => {
    let sessionData = req.session;

    // Test pour s'assurer que le server marche
    states.printServerStatus();
  
    

    // Si l'utilisateur n'est pas connecté on le renvoi sur la page de login sinon sur la page d'acceuil
    if (!sessionData.username) {
        res.sendFile(__dirname + '/front/login.html');
    } else {
        res.sendFile(__dirname + '/front/Acceuil.html');
    }
});

app.post('/login', body('login').isLength({ min: 3 }).trim().escape(), (req, res) => { //validation de l'entrée des utilisateurs
    const login = req.body.login

    // Error management
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        
    } else {
        // Store login
        req.session.username = login;
        req.session.save()
        res.redirect('/');
    }
});

http.listen(3300, () => {
    console.log('Serveur lancé sur le port 3300');
})
/* a partir d'ici ca marche pas mais je laisse la trace 
io.on('connection', (socket) => {
    console.log('un joueur s\'est connecté');

    socket.on("login", () => {
        let srvSockets = io.sockets.sockets;
        srvSockets.forEach(user => {
            console.log(user.handshake.session.username);
        });
        io.emit('new-message', 'Utilisateur ' + socket.handshake.session.username + ' vient de se connecter');
    });

    socket.on('message', (msg) => {
        console.log('message: ' + msg);
        //Envoie le message pour tous!
        io.emit('new-message', socket.handshake.session.username + ' : ' + msg);
        //Autre alternative : envoyer le message à tous les autres socket ormis celui qui envoie
        //socket.broadcast.emit('new-message', msg);
    });

    socket.on('disconnect', () => {
        io.emit('new-message', 'Serveur : Utilisateur ' + socket.handshake.session.username + ' vient de se déconnecter');
        console.log('Un joueur s\'est déconnecté');
    });
}); */

/*cette partie correspond a un tuto youtube trouver qui gere les tir et la logique du jeux multiplayer
mais il ne correspondais pas a notre maniere de placer les bateaux et creer les grilles et j'ai pas su comment
l'adapter mais j'ai chercher
// Start server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

// Handle a socket connection request from web client
const connections = [null, null]

io.on('connection', socket => {
  // console.log('New WS Connection')

  // Find an available player number
  let playerIndex = -1;
  for (const i in connections) {
    if (connections[i] === null) {
      playerIndex = i
      break
    }
  }

  // Tell the connecting client what player number they are
  socket.emit('player-number', playerIndex)

  console.log(`Player ${playerIndex} has connected`)

  connections[playerIndex] = false

  // Tell eveyone what player number just connected
  socket.broadcast.emit('player-connection', playerIndex)

  // Handle Diconnect
  socket.on('disconnect', () => {
    console.log(`Player ${playerIndex} disconnected`)
    connections[playerIndex] = null
    //Tell everyone what player numbe just disconnected
    socket.broadcast.emit('player-connection', playerIndex)
  })

  // On Ready
  socket.on('player-ready', () => {
    socket.broadcast.emit('enemy-ready', playerIndex)
    connections[playerIndex] = true
  })

  // Check player connections
  socket.on('check-players', () => {
    const players = []
    for (const i in connections) {
      connections[i] === null ? players.push({connected: false, ready: false}) : players.push({connected: true, ready: connections[i]})
    }
    socket.emit('check-players', players)
  })

  // On Fire Received
  socket.on('fire', id => {
    console.log(`Shot fired from ${playerIndex}`, id)

    // Emit the move to the other player
    socket.broadcast.emit('fire', id)
  })

  // on Fire Reply
  socket.on('fire-reply', square => {
    console.log(square)

    // Forward the reply to the other player
    socket.broadcast.emit('fire-reply', square)
  })
})*/