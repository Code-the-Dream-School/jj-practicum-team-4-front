import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Gallery from "./pages/Gallery";
import BestOfArtwork from "./pages/BestOfArtwork";
import About from "./pages/About";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import ChallengePrompt from "./pages/ChallengePrompt";
import Layout from "./components/layouts/Layout";
import SignUp from "./pages/SignUp";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./route/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="best-of-artwork" element={<BestOfArtwork />} />
            <Route path="about" element={<About />} />
            <Route path="sign-in" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route element={<ProtectedRoute />}>
              <Route path="challenge-prompt" element={<ChallengePrompt />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
