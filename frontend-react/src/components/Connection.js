import React, { useState } from "react";

const BACKEND_ADDRESS = "http://localhost:3000";

function Connection() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [nickname, setNickname] = useState("");
  const [adress, setAdress] = useState("");
  const [description, setDescription] = useState("");
  const [signInUsermail, setSignInUsermail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpUsermail, setSignUpUsermail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BACKEND_ADDRESS}/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nickname,
          email: signUpUsermail,
          adress,
          password: signUpPassword,
        }),
      });
      const data = await response.json();
      if (data.result) {
        setIsModalVisible(false); // Fermer la modale
        setNickname("");
        setSignUpUsermail("");
        setAdress("");
        setSignUpPassword("");
      } else {
        alert(data.error || "Erreur lors de l'inscription.");
      }
    } catch (e) {
      console.error("Erreur lors de la création du profil :", e.message);
      alert(e.message);
    }
  };

  const handleConnection = async () => {
    if (!signInUsermail || !signInPassword) {
      alert("Tous les champs sont obligatoires !");
      return;
    }

    setIsLoading(true);
    try {
      console.log({ email: signInUsermail, password: "********" }); // Cache les logs
      const response = await fetch(`${BACKEND_ADDRESS}/users/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: signInUsermail,
          password: signInPassword,
        }),
      });
      const data = await response.json();
      console.log(data);

      setIsLoading(false);
      if (data.result) {
        alert("Connexion réussie !");
        setSignInUsermail("");
        setSignInPassword("");
      } else {
        alert("Email et/ou mot de passe incorrect(s).");
      }
    } catch (error) {
      setIsLoading(false);
      alert("Erreur serveur, veuillez réessayer plus tard.");
      console.error("Erreur de connexion :", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Connexion</h2>
      <input
        type="email"
        placeholder="Email"
        value={signInUsermail}
        onChange={(e) => setSignInUsermail(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={signInPassword}
        onChange={(e) => setSignInPassword(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleConnection} style={styles.button}>
        Se connecter
      </button>

      <button onClick={() => setIsModalVisible(true)} style={styles.linkButton}>
        Pas encore inscrit ? Créez un compte
      </button>

      {isModalVisible && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3>Créer un compte</h3>
            <input
              type="text"
              placeholder="Pseudo"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              style={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              value={signInUsermail}
              onChange={(e) => setSignInUsermail(e.target.value)}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Adresse"
              value={adress}
              onChange={(e) => setAdress(e.target.value)}
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
              style={styles.input}
            />
            <button onClick={handleSignup} style={styles.button}>
              S'inscrire
            </button>
            <button
              onClick={() => setIsModalVisible(false)}
              style={styles.closeButton}
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {};
export default Connection;
