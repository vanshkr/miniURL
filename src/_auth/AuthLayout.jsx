import React from "react";
import { Outlet, Navigate } from "react-router-dom";

import { useAuth } from "@/lib/context/AuthContext";

const AuthLayout = () => {
  const { isAuthenticated, check } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <section className="flex flex-1 justify-center items-center py-10">
          <Outlet />
        </section>
      )}
    </>
  );
};

export default AuthLayout;
