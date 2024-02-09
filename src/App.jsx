import "./index.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./_auth/form/SignIn";
import SignUp from "./_auth/form/SignUp";
import { BrowserRouter } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout.jsx";
import Navbar from "./components/shared/Navbar";
import { AuthProvider } from "./lib/context/AuthContext";
import { Home, UrlList } from "./_root/pages";
import { Toaster } from "sonner";

function App() {
  return (
    <main className="flex flex-col h-screen">
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            // private routes
            <Route element={<AuthLayout />}>
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
            </Route>
            // public routes /* index - allows child component to be rendered on
            the same path as parent */
            <Route element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path="/:profileName/my-url" element={<UrlList />} />
            </Route>
          </Routes>
          <Toaster />
        </AuthProvider>
      </BrowserRouter>
    </main>
  );
}

export default App;
