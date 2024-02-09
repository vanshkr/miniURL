import { z } from "zod";
export const signUpFormSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be atleast 2 characters. " }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be atleast 8 characters." }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords does not match",
  });
export const signInFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters." }),
});
export const shortURLFormSchema = z.object({
  fullURL: z
    .string()
    .url({ message: "Please enter a valid url. " })
    .refine(
      (url) => {
        if (url) {
          try {
            const urlObject = new URL(url);
            if (urlObject) return true;
          } catch (err) {
            return false;
          }
        }

        return false;
      },
      { path: ["fullURL"], message: "Please enter a valid url. " }
    )
    .refine(
      (url) => {
        if (url) {
          try {
            const urlObject = new URL(url);
            if (
              urlObject?.protocol === "https:" ||
              urlObject?.protocol === "http:"
            )
              return true;
          } catch (err) {
            return false;
          }
        }
        return false;
      },
      { path: ["fullURL"], message: "Provide URL protocol is not supported. " }
    ),
  alias: z
    .string()
    .min(7, { message: "Alias must be atleast 7 characters long. " })
    .max(15, { message: "Alias must be atmost 15 characters long. " })
    .optional()
    .or(z.literal("")),
});
