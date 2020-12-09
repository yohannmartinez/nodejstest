import React from "react"
import axios from "axios"
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      //on initialise un state user vide dans lequel on va mettre nos utilisateur récupérés de la base de données
      users: [],

      //new user
      username: "",
      age: 0,
    }
    this.changeInput = this.changeInput.bind(this);
    this.addUser = this.addUser.bind(this);
  }

  componentDidMount() {
    //on envoie une requête http GET à /api/users/getUsers qui nous renvoie un tableau avec nos utilisateurs dedans
    //le "res" du .then((res)=>{}) correspond au à la réponse de l'API
    axios.get('http://localhost:8000/api/users/getUsers').then((res) => {
      //une fois que tous les utilisateurs sont rapatriés, on les mets dans le state users qui sera donc users : [{user1},{user2},{etc}]
      this.setState({ users: res.data.users })
    })
  }

  changeInput(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  addUser() {
    //requête http POST, pour faire un post ou un put pas besoin de mettre {params : {les paramètres}}, il faut directement mettre {les paramètres}
    //on envoie donc la requête à /api/users/createUser avec les paramètres correspondants au schema User et qui seront transmis au req.body
    //le résultat de la requête se trouve également dans "res" avec les attribus du nouvel utilisateur
    axios.post('http://localhost:8000/api/users/createUser', { username: this.state.username, age: this.state.age }).then((res) => {
      //on ajoute l'utilisateur créé stocké dans res en redéfinissant le state "users"
      //...this.state.users permet de récupérer tous les utilisateurs déjà ajoutés au state users et après la virgule on ajoute les éléments
      this.setState({ users: [...this.state.users, res.data.user] })
    })
  }

  render() {
    return (
      <div onClick={() => { console.log(this.state) }}>
        {this.state.users.length > 0 &&
          <React.Fragment>
            utilisateurs
            {this.state.users.map((user) => (
            <div>{user.username}</div>
          ))}
          </React.Fragment>
        }

        <div>
          <h1>Ajouter un utilisateur</h1>
          <input name="username" value={this.state.username} onChange={this.changeInput} />
          <input name="age" value={this.state.age} onChange={this.changeInput} />
          <button onClick={this.addUser}>add user</button>
        </div>
      </div>
    )
  }
}

export default App;
