import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../lib/context/AuthContext";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();

  const profilename = user?.name?.toLowerCase();
  return (
    <nav className="flex items-center py-4 border-b-2 ">
      <div className="flex justify-start">
        <Link to="/">
          <h1 className="text-xl md:text-3xl  font-bold text-blue-600 px-2 md:px-4">
            Mini URL
          </h1>
        </Link>
      </div>

      <div className="mr-5 ml-auto flex items-center">
        {isAuthenticated ? (
          <>
            <div className="px-1 md:px-2 hover:text-blue-300 ">
              {user?.name}
            </div>
            <Link to={`/${profilename}/my-url`} className="px-1 md:px-2">
              <Button className="shad-input hover:text-amber-400 ">
                MyUrls
              </Button>
            </Link>
            <Button
              className="shad-input hover:text-rose-600"
              onClick={() => {
                logout();
              }}
            >
              <LogOut className="hover:text-rose-600" />
            </Button>
          </>
        ) : (
          <>
            <Link to="/sign-in" className="px-1 md:px-2">
              <Button className="shad-input hover:text-amber-400 ">
                Sign In
              </Button>
            </Link>
            <Link to="/sign-up" className="px-1 md:px-2">
              <Button className="shad-input hover:text-amber-400 ">
                Sign Up
              </Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
