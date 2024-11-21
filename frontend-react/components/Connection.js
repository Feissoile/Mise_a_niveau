import React, { useState } from "react";

const BACKEND_ADDRESS = "http://localhost:3000";

function Connection() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [nickname, setNickname] = useState("");
  const [adress, setAdress] = useState("");
  const [description, setDescription] = useState("");
  const [signInUsermail, setSignInUsermail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const createProfile = async (userData) => {
    setIsLoading(true);
    try {
      const resCreation = await fetch(`${BACKEND_ADDRESS}/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!resCreation.ok) {
        throw new Error(`Erreur HTTP : ${resCreation.status}`);
      }

      console.log(createProfile);
      const dataCreation = await resCreation.json();
      console.log(dataCreation);
      if (!dataCreation.result) {
        throw new Error(dataCreation.error || "Error signing up");
      }
    } catch (e) {
      console.error("Erreur lors de la création du profil :", e.message);
      alert(e.message);
    }
  };

  const handleConnection = () => {
    if (!signInUsermail || !signInPassword) {
      alert("Tous les champs sont obligatoires !");
      return;
    }

    setIsLoading(true);

    console.log({ email: signInUsermail, password: "********" }); // Cacher le mot de passe dans les logs
    fetch(`${BACKEND_ADDRESS}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: signInUsermail, password: signInPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setIsLoading(false);
        if (data.result) {
          alert("Connexion réussie !");
          setSignInUsermail("");
          setSignInPassword("");
        } else {
          alert("Email et/ou mot de passe incorrect(s).");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        alert("Erreur serveur, veuillez réessayer plus tard.");
        console.error("Erreur de connexion :", error);
      });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Connexion</h1>
      <input
        style={styles.input}
        type="email"
        placeholder="Email"
        value={signInUsermail}
        onChange={(e) => setSignInUsermail(e.target.value)}
      />
      <input
        style={styles.input}
        type="password"
        placeholder="Mot de passe"
        value={signInPassword}
        onChange={(e) => setSignInPassword(e.target.value)}
      />
      <button
        style={styles.button}
        onClick={handleConnection}
        disabled={isLoading}
      >
        {isLoading ? "Connexion en cours..." : "Se connecter"}
      </button>
    </div>
  );
}

const styles = {};
export default Connection;
