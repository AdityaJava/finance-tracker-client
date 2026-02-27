import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./component/ProtectedRoute";
import OAuthSuccess from "./component/auth/OAuthSuccess";
import Dashboard from "./component/dashboard/Dashboard";
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import AccountList from "./component/account/AccountList";
import CategoryList from "./component/category/CategoryList";
import Layout from "./component/layout/Layout";

function App() {

  return (
    <Routes>
      <Route path="/oauth-success" element={<OAuthSuccess />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Layout />}>
        <Route path="accounts" element={
          <ProtectedRoute>
            <AccountList />
          </ProtectedRoute>
        } />
        <Route path="categories" element={
          <ProtectedRoute>
            <CategoryList />
          </ProtectedRoute>
        } />
      </Route>
      <Route path="/login" element={
        <Login />
      } />
    </Routes>
  )
}

export default App
