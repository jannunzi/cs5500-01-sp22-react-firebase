import {BrowserRouter, Routes, Route}
  from "react-router-dom";
import {AuthProvider}
  from "./contexts/auth-context";
import Signup from "./screens/signup";
import Login from "./screens/login";
import Home from "./screens/home";
import Profile from "./screens/profile";
import Administrator from "./screens/admin";
import ProtectedRoute from "./routes/protected-route";
import SuperChat from "./screens/super-chat";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/chat"    element={<SuperChat/>}/>
          <Route path="/"        element={<Login/>}/>
          <Route path="/signup"  element={<Signup/>}/>
          <Route path="/home"    element={
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          }/>
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile/>
            </ProtectedRoute>
          }/>
          <Route path="/admin"   element={
            <ProtectedRoute>
              <Administrator/>
            </ProtectedRoute>
          }/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )}

export default App;
