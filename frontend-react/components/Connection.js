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
      console.log({ email: signInUsermail, password: "********" }); // Cacher le mot de passe dans les logs
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

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh", // Centre le contenu verticalement
    backgroundColor: "#f9f9f9",
  },
  input: {
    width: "80%",
    maxWidth: "400px",
    padding: "10px",
    margin: "10px 0",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
  },
  button: {
    width: "80%",
    maxWidth: "400px",
    padding: "10px",
    margin: "10px 0",
    backgroundColor: "#4caf50",
    color: "#fff",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  linkButton: {
    background: "none",
    border: "none",
    color: "#007bff",
    textDecoration: "underline",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
  },
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fond semi-transparent
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    width: "90%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  closeButton: {
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    marginTop: "10px",
    cursor: "pointer",
  },
};
export default Connection;
