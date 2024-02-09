import React, { useEffect } from "react";
import { z } from "zod";
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
import { shortURLFormSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";
import * as api from "../../lib/axios/api";
import { useAuth } from "@/lib/context/AuthContext";
import { toast } from "sonner";

const EditShortUrlForm = ({
  alias,
  fullUrl,
  shortUrl,
  urlId,
  onValueChange,
}) => {
  const { isLoading, check } = useAuth();
  const form = useForm({
    resolver: zodResolver(shortURLFormSchema),
    defaultValues: {
      fullURL: fullUrl ? fullUrl : "",
      alias: alias ? alias : "",
      shortUrl: shortUrl ? shortUrl : "",
    },
  });
  const handleValueChange = () => {
    onValueChange({
      formToggleValue: false,
      fullUrlValue: "",
      shortUrlValue: "",
      alias: "",
      urlId: "",
    });
  };
  async function onSubmit(urlData) {
    try {
      await check();
      await api.updateUrl(urlId, urlData);
      toast.success("Edit Successful", {
        duration: 3000,
        cancel: {
          label: "x",
        },
      });
    } catch (err) {
      const errorMeesage = err?.response?.data?.message;
      toast.error(errorMeesage, {
        duration: 3000,
        cancel: {
          label: "x",
        },
      });
    } finally {
      handleValueChange();
    }
  }
  return (
    <Form {...form}>
      <div className="flex flex-col min-w-72">
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12 w-full">
          Shorten Share Simplify
        </h2>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="fullURL"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full URL</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter full link here"
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
            name="alias"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alias</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter alias (optional) "
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
            name="shortUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short URL</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    type="text"
                    placeholder="Short URL Here "
                    {...field}
                    className="shad-input "
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-wrap gap-2">
            <Button
              className=" bg-yellow-500 hover:bg-yellow-700 text-white px-4 py-2 rounded h-8"
              onClick={handleValueChange}
            >
              Cancel
            </Button>
            <Button className="bg-purple-500 hover:bg-purple-700" type="submit">
              {isLoading ? (
                <div className="flex-center gap-2">
                  <Loader /> Save
                </div>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default EditShortUrlForm;
