// Me encargo de buscar el sku de los torneos activo
import React from "react";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore";
import "firebase/database";
import LinkToFirebase from "./codes.component";
import "./tournaments.styles.scss";
class SkuTournaments extends React.Component {
  constructor() {
    super();
    this.state = {
      tournaments: [],
      code: "",
    };
  }
  componentDidMount() {
    var firebaseConfig = {
      apiKey: "AIzaSyBoR3To-c5lnRB74g5X4NxrX9WK6se_FVA",
      authDomain: "codigostorneos-965ef.firebaseapp.com",
      databaseURL: "https://codigostorneos-965ef.firebaseio.com",
      projectId: "codigostorneos-965ef",
      storageBucket: "codigostorneos-965ef.appspot.com",
      messagingSenderId: "6329310884",
      appId: "1:6329310884:web:7a6f872bd3f91fb4fc1031",
      measurementId: "G-TC89PSB289",
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    var torneosRef = firebase.database().ref("/torneos");
    var data = [];
    torneosRef
      .once("value")
      .then((snapshot) => snapshot.val())
      .then((sku) =>
        Object.keys(sku).map((element) => {
          return data.push(element);
        })
      )
      .then(() => this.setState({ tournaments: data }));
  }
  getCode = async (sku) => {
    var skuRef = firebase.database().ref("/torneos/" + sku);
    var torneosRef = firebase.database().ref("/torneos");
    var torneosData = await torneosRef
      .once("value")
      .then((snapshot) => snapshot.val()[sku]);
    var foundPendings = Object.values(torneosData).filter(
      (elemento) => elemento.status === "pending"
    );
    this.setState({ code: foundPendings[0] });

    var numero = Object.values(torneosData).findIndex(function (elemento) {
      return elemento === foundPendings[0];
    });

    await skuRef.child(numero).update({ status: "used" });
  };
  render() {
    return (
      <div>
        <img
          className="portada"
          alt="portada"
          src="https://cdn.shopify.com/s/files/1/0365/0686/1705/files/foto_perfil_fb_1163x.png?v=1585183065"
        ></img>
        {this.state.tournaments ? (
          this.state.tournaments.map((sku) => {
            return (
              <LinkToFirebase
                key={sku}
                sku={sku}
                click={this.getCode}
                code={this.state.code}
              ></LinkToFirebase>
            );
          })
        ) : (
          <h1>No hay torneos</h1>
        )}

        {this.state.code.code ? (
          <div className="code">
            <p>Pasos para inscribirte.</p>
            <p>
              1. Ingresa en (battlefy.com/houseplay) selecciona tu torneo y
              presiona "Join"
            </p>
            <p>-------------------------------------------------</p>
            <p>2. Crea una cuenta de BattleFy.</p>
            <p>-------------------------------------------------</p>
            <p>
              3. Coloca el siguiente código {this.state.code.code} donde dice
              "Join Code"
            </p>
            <p>-------------------------------------------------</p>
            <p>4. Rellena el formulario y únete al grupo de Discord</p>
            <p>-------------------------------------------------</p>
            <p>
              5. Ya inscrito, se coordinara vía BattleFy y Discord las fechas y
              oponentes que deberás enfrentar.
            </p>
            <p>-------------------------------------------------</p>
            <p>
              6. ¿Has sido el campeón? ¡Te contactaremos enseguida para que
              recibas tu gran premio!
            </p>
          </div>
        ) : null}
      </div>
    );
  }
}
export default SkuTournaments;
