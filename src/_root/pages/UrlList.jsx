import EditShortURLForm from "@/components/form/EditShortUrlForm";
import { Button } from "@/components/ui/button";
import React, { useState, useRef, useEffect } from "react";
import * as api from "@/lib/axios/api";
import UrlCard from "@/components/shared/UrlCard";
import { useAuth } from "@/lib/context/AuthContext";
import { toast } from "sonner";

function UrlList() {
  const { check } = useAuth();
  const [formToggle, setFormToggle] = useState(false);
  const [urlId, setUrlId] = useState("");
  const [alias, setAlias] = useState("");
  const [urlList, setUrlList] = useState([]);
  const shortUrl = useRef();
  const fullUrl = useRef();
  const handleValue = ({
    formToggleValue,
    urlId,
    alias,
    shortUrlValue,
    fullUrlValue,
  }) => {
    setFormToggle(formToggleValue);
    setAlias(alias);
    setUrlId(urlId);
    shortUrl.current = shortUrlValue;
    fullUrl.current = fullUrlValue;
  };
  const handleInitialValue = () => {
    setFormToggle(false);
    setAlias("");
    setUrlId("");
    shortUrl.current = "";
    fullUrl.current = "";
  };
  const fetchUrlList = async () => {
    const response = await api.fetchUrlList();
    return response;
  };
  useEffect(() => {
    check();
    fetchUrlList()
      .then((res) => {
        setUrlList(res?.data?.urlList);
      })
      .catch((err) => {
        const errorMeesage = err?.response?.data?.message;
        toast.error("Something went wrong", {
          description: errorMeesage,
          duration: 3000,
          cancel: {
            label: "x",
          },
        });
      });
  }, [urlList]);

  return (
    <div className="flex flex-1 flex-col md:flex-row">
      <div className="w-full md:w-2/3 p-6 bg-white text-black md:mr-8">
        <div className="flex flex-1 justify-between items-center mb-4">
          <h3 className="text-base md:text-2xl font-semibold">
            Your Recent URLs
          </h3>
          <Button
            className="text-blue-500 hover:text-blue-700"
            onClick={async () => {
              try {
                if (urlList?.length < 1) {
                  toast.success("List is empty", {
                    duration: 3000,
                    cancel: {
                      label: "x",
                    },
                  });
                  return;
                }
                await api.deleteAllUrl();
                toast.success("Successfully deleted", {
                  duration: 3000,
                  cancel: {
                    label: "x",
                  },
                });
              } catch (err) {
                const errorMeesage = err?.response?.data?.message;
                toast.error("Something went wrong", {
                  description: errorMeesage,
                  duration: 3000,
                  cancel: {
                    label: "x",
                  },
                });
              } finally {
                handleInitialValue();
              }
            }}
          >
            Clear All
          </Button>
        </div>
        <div className="flex flex-col w-full p-2 gap-y-2">
          {urlList
            ? urlList.map((url) => (
                <UrlCard
                  disable={formToggle}
                  key={url._id}
                  url={url}
                  onValueChange={handleValue}
                />
              ))
            : undefined}
        </div>

        <div className="text-gray-500 mt-4 text-center">
          No more recent URLs in your history
        </div>
      </div>
      {formToggle ? (
        <div>
          <EditShortURLForm
            alias={alias}
            fullUrl={fullUrl?.current}
            shortUrl={shortUrl?.current}
            urlId={urlId}
            onValueChange={handleValue}
          />
        </div>
      ) : undefined}
    </div>
  );
}

export default UrlList;
