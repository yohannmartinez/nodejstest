const express = require('express')
const app = express();

//monogoose = équivalent pour mongodb de sequelize
const mongoose = require('mongoose')

const bodyParser = require("body-parser");

//lien vers les routes de la catégorie "users"
const users = require('./routes/users');

//bodyparse = parse les paramètres des requêtes PUT et POST dans req.body
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

// indique que seulement les datas de type json seront parsées dans nos requêtes
app.use(bodyParser.json());

//initialisation de la connexion à la base de données
mongoose
    .connect(
        "mongodb+srv://admin:u2315125o@cluster0.upze0.mongodb.net/test?retryWrites=true&w=majority",
        { useNewUrlParser: true }
    )
    //si la connexion s'éxecute sans problème on execute la ligne suivante
    .then(() => console.log("MongoDB successfully connected"))
    //si la connexion échoue on execute la ligne suivante
    .catch(err => console.log(err));

//la ligne suivante indique que toutes les routes contenues dans users seront utilisées par express
//elles auront "/api/users" comme index
//exemple pour la fonction getUsers dans les routes, on pourra l'atteindre depuis le front avec le lien http://localhost:8000/api/users/getUsers 
app.use('/api/users', users)

//indique que express et lancée sur le port 8000 (le port est modifiable selon l'envie)
app.listen(8000, () => console.log(`Server up and running on port 8000 !`));