import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { useState } from "react";
import { Forward, Copy } from "lucide-react";
import { toast } from "sonner";

const ShortURLForm = () => {
  const { isLoading, user, check } = useAuth();
  const navigate = useNavigate();
  const [urlObject, setUrlObject] = useState(undefined);
  const [toggleForm, setToggleForm] = useState(false);
  const form = useForm({
    resolver: zodResolver(shortURLFormSchema),
    defaultValues: {
      fullURL: "",
      alias: "",
      shortUrl: "",
    },
  });
  useEffect(() => {
    setToggleForm(false);
    setUrlObject(undefined);
  }, [navigate]);
  async function onSubmit(urlData) {
    try {
      await check();
      const url = await api.createUrl(urlData);
      toast.success("ShortUrl created", {
        duration: 3000,
        cancel: {
          label: "x",
        },
      });
      setUrlObject({ ...urlData, ...url?.data });
      setToggleForm((prev) => !prev);
      form.reset();
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
      <div className="flex flex-col min-w-72">
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12 w-full">
          Shorten Share Simplify
        </h2>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-1 flex-col gap-4 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="fullURL"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full URL</FormLabel>
                <FormControl>
                  {urlObject ? (
                    <Input
                      disabled={urlObject ? true : false}
                      type="text"
                      placeholder="Enter full link here"
                      {...field}
                      value={urlObject?.fullURL}
                      className="shad-input"
                    />
                  ) : (
                    <Input
                      disabled={urlObject ? true : false}
                      type="text"
                      placeholder="Enter full link here"
                      {...field}
                      className="shad-input"
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {toggleForm ? undefined : (
            <FormField
              control={form.control}
              name="alias"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alias</FormLabel>
                  <FormControl>
                    {urlObject ? (
                      <Input
                        disabled={urlObject ? true : false}
                        type="text"
                        placeholder="Enter alias (optional) "
                        {...field}
                        value={urlObject.alias}
                        className="shad-input"
                      />
                    ) : (
                      <Input
                        disabled={urlObject ? true : false}
                        type="text"
                        placeholder="Enter alias (optional) "
                        {...field}
                        className="shad-input"
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {toggleForm ? (
            <FormField
              control={form.control}
              name="shortUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short URL</FormLabel>
                  <FormControl>
                    <Input
                      disabled={urlObject ? true : false}
                      type="text"
                      placeholder="Short URL Here "
                      {...field}
                      value={urlObject?.shortUrl}
                      className="shad-input "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : undefined}

          {toggleForm ? (
            <Button
              className="shad-button_primary "
              onClick={() => {
                setUrlObject(undefined);
                setToggleForm((prev) => !prev);
              }}
            >
              {isLoading ? (
                <div className="flex-center gap-2">
                  <Loader /> Shortern Another URL
                </div>
              ) : (
                "Shorten Another URL"
              )}
            </Button>
          ) : (
            <Button
              disabled={user ? false : true}
              className="shad-button_primary "
              type="submit"
            >
              {isLoading ? (
                <div className="flex-center gap-2">
                  <Loader /> Shortern URL
                </div>
              ) : (
                "Shorten URL"
              )}
            </Button>
          )}
        </form>
        {toggleForm ? (
          <div className="flex flex-wrap w-full gap-2 mt-2">
            <Button
              className=" bg-yellow-500 hover:bg-yellow-700 text-white px-4 py-2 rounded h-8 flex flex-1"
              onClick={() => {
                window.open(urlObject?.shortUrl, "_blank");
              }}
            >
              <Forward className="mr-2 h-6 w-6" /> Visit Url
            </Button>

            <Button
              className=" bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded h-8 flex flex-1"
              onClick={() => {
                const copyUrl = urlObject?.shortUrl;
                navigator.clipboard.writeText(copyUrl);
                toast.success("Url copied", {
                  duration: 3000,
                  cancel: {
                    label: "x",
                  },
                });
              }}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
          </div>
        ) : undefined}
      </div>
    </Form>
  );
};

export default ShortURLForm;
