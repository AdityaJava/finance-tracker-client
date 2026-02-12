import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./component/ProtectedRoute";
import OAuthSuccess from "./component/OAuthSuccess";
import Dashboard from "./component/Dashboard";

function App() {

  return (
    <Routes>
      <Route path="/oauth-success" element={<OAuthSuccess />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
