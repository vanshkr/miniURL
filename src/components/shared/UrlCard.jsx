import { Button } from "@/components/ui/button";
import { Forward, Copy, Pencil, Trash } from "lucide-react";
import React, { useRef } from "react";
import * as api from "@/lib/axios/api";
import { toast } from "sonner";

function UrlCard({ disable, url, onValueChange }) {
  const shortUrlRef = useRef("");
  const fullUrlRef = useRef("");
  const handleValueChange = (url) => {
    onValueChange({
      formToggleValue: true,
      fullUrlValue: fullUrlRef?.current?.innerText,
      shortUrlValue: shortUrlRef?.current?.innerText,
      alias: url.alias,
      urlId: url._id,
    });
  };
  const handleEmptyChange = () => {
    onValueChange({
      formToggleValue: false,
      fullUrlValue: "",
      shortUrlValue: "",
      alias: "",
      urlId: "",
    });
  };
  return (
    <div className="bg-black p-2 rounded-lg shadow-md text-white ">
      <div className="text-sm md:text-xl mb-2 py-2 ">
        Short URL :
        <span className="text-orange-700 ml-2 break-all" ref={shortUrlRef}>
          {import.meta.env.VITE_DOMAIN_URL + "url/" + url?.alias}
        </span>
      </div>
      <div className="text-sm md:text-xl mb-2 py-2 break-all">
        Full URL :
        <span ref={fullUrlRef} className="text-orange-700 ml-2">
          {url?.fullUrl}
        </span>
      </div>
      <div className="text-sm md:text-xl mb-2 py-2">Clicks : {url?.clicks}</div>
      <div className="flex flex-wrap gap-2">
        <Button
          className=" bg-yellow-500 hover:bg-yellow-700 text-white px-4 py-2 rounded "
          onClick={() => {
            window.open(shortUrlRef?.current?.innerText, "_blank");
          }}
        >
          <Forward className="h-6 w-6" />
        </Button>
        <Button
          disabled={disable}
          className=" bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded "
          onClick={() => {
            handleValueChange(url);
          }}
        >
          <Pencil className="mr-2 h-4 w-4" /> Edit
        </Button>
        <Button
          className=" bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded "
          onClick={() => {
            const copyUrl = shortUrlRef?.current?.innerText;
            navigator.clipboard.writeText(copyUrl);
            toast.success("Successfully copied", {
              duration: 3000,
              cancel: {
                label: "x",
              },
            });
          }}
        >
          <Copy className="mr-2 h-4 w-4" /> Copy
        </Button>
        <Button
          className="bg-rose-500 hover:bg-rose-700 text-white px-4 py-2 rounded"
          onClick={async () => {
            try {
              await api.deleteUrl(url._id);
              toast.success("Successfully deleted", {
                duration: 3000,
                cancel: {
                  label: "x",
                },
              });
              handleEmptyChange();
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
          }}
        >
          <Trash className="mr-2 h-4 w-4" /> Delete
        </Button>
      </div>
    </div>
  );
}

export default UrlCard;
