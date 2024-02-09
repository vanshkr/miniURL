import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInFormSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import * as api from "../../lib/axios/api";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "@/lib/context/AuthContext";
import { toast } from "sonner";

const SignIn = () => {
  const { isLoading, check } = useAuth();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(userData) {
    try {
      const response = await api.signIn(userData);
      const { token } = response?.data;
      const result = jwtDecode(token);
      localStorage.setItem("cloakCode", JSON.stringify(token));
      localStorage.setItem(
        "profile",
        JSON.stringify({ name: result?.name, email: result?.email })
      );

      toast.success("Login Successful", {
        duration: 3000,
        cancel: {
          label: "x",
        },
      });

      form.reset();
      navigate("/");
      await check();
    } catch (err) {
      const errorMeesage = err?.response?.data?.message;
      toast.error("Something went wrong", {
        description: errorMeesage,
        duration: 3000,
        cancel: {
          label: "x",
        },
      });
    }
  }
  return (
    <Form {...form}>
      <div className="flex flex-col animation-none">
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Sign In to Your Account
        </h2>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder=" johndoe@example.com"
                    {...field}
                    className="shad-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="********"
                    {...field}
                    className="shad-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-y-4">
            <Button className="shad-button_primary " type="submit">
              {isLoading ? (
                <div className="flex-center gap-2">
                  <Loader /> Loading...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
            <p className="text-light-2/80 text-center text-small-regular">
              Don't have an account?{" "}
              <Link
                className="text-bold-semibold text-primary-500 ml-1"
                to="/sign-up"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default SignIn;
