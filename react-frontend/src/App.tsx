import './App.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Protected from './pages/protected';

import { Toaster } from "@/components/ui/sonner"


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="protected" element={<Protected />} />
      <Route path="gpt" element={"localhost:5000/"} />
      {/* \<Route path="protected" element={<PrivateRoute unauthorizedMessage='Please authenticate to access this page'><Protected /></PrivateRoute>} /> */}
    </Route>
  )
)


    
function App() {
  return (
    <>
      <div>
        <RouterProvider router={router} />
        <Toaster />
      </div>
    </>
  )
}

export default App
