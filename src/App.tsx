import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./component/ProtectedRoute";
import OAuthSuccess from "./component/OAuthSuccess";
import Dashboard from "./component/Dashboard";
import Login from "./component/login";

function App() {

  return (
    <Routes>
      <Route path="/oauth-success" element={<OAuthSuccess />} />
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
