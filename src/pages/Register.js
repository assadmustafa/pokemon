import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [score] = useState(0); // You might want to handle score appropriately
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputError, setInputError] = useState(false); // New state for input validation

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // Input validation
      if (!nickname) {
        toast.error("Please enter a nickname.");
        setInputError(true);
        return;
      }

      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Add user to Firestore
      const userRef = await addDoc(collection(db, "users"), {
        uid: user.uid,
        nickname: nickname,
        email: email,
        score: score,
        // You can add more user-related data here
      });

      console.log("User added to Firestore with ID: ", userRef.id);

      toast.success("Account created successfully");
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);

      setInputError(true);

      if (errorCode === "auth/weak-password") {
        toast.error("Password is too weak. Please use a stronger password.");
      } else if (errorCode === "auth/invalid-email") {
        toast.error(
          "Invalid email format. Please enter a valid email address."
        );
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <div className="background">
      <div className="spacer"></div>
      <form>
        <h1> Sign up </h1>
        <div>
          <input
            type="text"
            className={inputError ? "error" : ""}
            label="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
            placeholder="Nickname"
          />
        </div>

        <div>
          <input
            type="email"
            className={inputError ? "error" : ""}
            label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
        </div>

        <div>
          <input
            type="password"
            className={inputError ? "error" : ""}
            label="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </div>

        <button type="submit" onClick={onSubmit} className="button">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Register;
