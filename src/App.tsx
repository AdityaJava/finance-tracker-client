import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./component/ProtectedRoute";
import OAuthSuccess from "./component/auth/OAuthSuccess";
import Dashboard from "./component/dashboard/Dashboard";
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import AccountList from "./component/account/AccountList";

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
      <Route path="/accounts" element={<AccountList />} />

    </Routes>
  )
}

export default App
