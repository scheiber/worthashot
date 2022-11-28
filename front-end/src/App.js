import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import LandingPage from "./Pages/LandingPage";
import SplashPage from "./Pages/SplashPage";
import Home from "./Pages/Home";
import "./App.css";
import Establishments from "./Components/Establishments";
import Onboarding from "./Components/Onboarding";
import NavBar from "./Components/NavBar";
import Drinks from "./Components/Drinks";
import LandingPageSignedIn from "./Pages/LandingSignedIn";
import UserSignIn from "./Components/UserSignIn";
import UserSignUp from "./Components/UserSignUp";
import IndividualDrink from "./Components/IndividualDrink";
import DrinksByPref from "./Components/DrinksByPref"
import UserPreferences from "./Components/UserPreferences";

const App = () => {
  const [loggedIn, setLogin] = useState(false);
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in.
      setLogin(true);
    } else {
      // No user is signed in.
      setLogin(false);
    }
  });

  const signOutOfAccount = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        alert("You have signed out");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div className="worth-a-shot">
      <Router>
        <NavBar signOutOfAccount={signOutOfAccount} loggedIn={loggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/user/landing" element={<LandingPageSignedIn />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/sign-in" element={<UserSignIn />} />
          <Route path="/sign-up" element={<UserSignUp />} />
          <Route path="/splash" element={<SplashPage />} />
          <Route path="/places" element={<Establishments />} />
          <Route path="/alcohols" element={<Drinks />} />
          <Route path="/alcohols/:id" element={<IndividualDrink />} />
          <Route path="/alcohols/category" element={<DrinksByPref />}/>
          <Route path="/user/:id/preferences" element={<UserPreferences/>}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
