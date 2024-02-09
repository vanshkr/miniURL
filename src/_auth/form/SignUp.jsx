import React from "react";
import * as api from "../../lib/axios/api";
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
import { signUpFormSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "@/lib/context/AuthContext";
import { toast } from "sonner";

const SignUp = () => {
  const { isLoading, check } = useAuth();
  const form = useForm({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const navigate = useNavigate();
  async function onSubmit(userData) {
    try {
      const response = await api.signUp(userData);
      const { token } = response?.data;
      const result = jwtDecode(token);
      if (!result) {
        throw new Error("No user object found. ");
      }

      toast.success("Sign up Successful");
      localStorage.setItem("cloakCode", JSON.stringify(token));
      localStorage.setItem(
        "profile",
        JSON.stringify({ name: result?.name, email: result?.email })
      );
      await check();
      form.reset();
      navigate("/");
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
      <div className="flex flex-col">
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create a new account
        </h2>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="John Doe"
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
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
                "Sign Up"
              )}
            </Button>
            <p className="text-light-2/80 text-center text-small-regular">
              Already have an account?{" "}
              <Link
                className="text-bold-semibold text-primary-500 ml-1"
                to="/sign-in"
              >
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default SignUp;
