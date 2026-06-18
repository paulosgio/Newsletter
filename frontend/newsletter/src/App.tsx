import { Route, Routes } from "react-router-dom"
import Login from "./pages/login"
import Home from "./pages/home"
import PrivateRoute from "./routes/PrivateRoute"
import { AdminRoute } from "./routes/AdminRoute"
import AdminPage from "./pages/admin"
import Register from "./pages/register"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/home" element={
        <PrivateRoute>
          <Home/>
        </PrivateRoute>
    }/>
    <Route path="/admin" element={
        <AdminRoute>
          <AdminPage/>
        </AdminRoute>
    }/>
    <Route path="/register" element={<Register/>}/>
    </Routes>
  )
}

export default App
