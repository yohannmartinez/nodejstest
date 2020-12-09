const express = require("express")
//utilisation du Router fourni par express
const Router = express.Router()

//schema correspondant a "user" équivalent aux models dans sequelize
const User = require('../schemas/user')

//route POST qui permet d'ajouter de la donnée avec comme chemin /api/users/createUser
Router.post('/createUser', (req, res) => {
    //création d'une variable "nouvelUtilisateur" avec dedans les propriétés attendues par le schema "User"
    //on récupère les données depuis req.body qui correspondent aux paramètres envoyés par axios.post depuis le front
    const nouvelUtilisateur = new User({
        username: req.body.username,
        age: req.body.age
    });

    //sauvegarde de l'utilisateur en bdd
    nouvelUtilisateur.save().then((utilisateur)=>{
        //si l'utilisateur est créé avec succès, on renvoie un status 200 (success) avec dedans l'utilisateur renvoyé lors du save()
        res.status(200).send({ user: utilisateur})
    }).catch((err)=>{
        //si si il y a un problème, on renvoie un status 400 (error) avec un message d'erreur
        res.status(400).send({ message: "ça c'est pas bien passé"})
    })
})

//route GET qui permet de récupérer des données avec comme chemin /api/users/getUsers
Router.get('/getUsers',(req,res)=>{
    //user.find nous permet de dire que l'on veut récupérer toutes les données qui correspondent au schema (model) User
    User.find({}).then((users)=>{
        //si tout se passe bien, on renvoie un status 200 (success) avec dedans les utilisateurs renvoyé lors du find({})
        res.status(200).send({users})
    }).catch((err)=>{
        //si si il y a un problème, on renvoie un status 400 (error) avec un message d'erreur
        res.status(400).send({ message: "ça c'est pas bien passé"})
    })
})

//on exporte notre module pour pouvoir l'utilser en dehors de ce fichier ---- on exporte Router qui contient toutes nos routes 
module.exports = Router