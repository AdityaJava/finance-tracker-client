import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./component/ProtectedRoute";
import OAuthSuccess from "./component/OAuthSuccess";
import Dashboard from "./component/Dashboard";
import Login from "./component/login";
import { register } from "module";
import Register from "./component/Register";

function App() {

  return (
    <Routes>
      <Route path="/oauth-success" element={<OAuthSuccess />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          // Means <ProtectedRoute children={<Dashboard />} />
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={
        <Login />
      } />

    </Routes>
  )
}

export default App
