import ShortURLForm from "@/components/form/ShortURLForm";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/context/AuthContext";
import { useEffect } from "react";

const Home = () => {
  const { isAuthenticated, check } = useAuth();
  useEffect(() => check(), []);
  return (
    <div className="flex flex-1 gap-4 gap-y-6 justify-center items-center flex-col md:flex-row">
      <section className="flex flex-1 gap-2 justify-center ">
        <ShortURLForm />
      </section>
      <section
        className="flex flex-1 flex-col
      p-4 gap-4 "
      >
        <h3 className="text-xl md:text-3xl  font-extrabold text-beige-300 mb-4">
          Create shortener URLs with Mini URL
        </h3>
        <p className="text-lg text-blue-300 mb-6">
          Mini URL is a fast and efficient URL shortening service designed to
          simplify the sharing of links. Our mission is to provide users with a
          convenient way to shorten long URLs into compact, manageable links
          that are easy to share and remember.
        </p>
        <p className="text-lg text-blue-300 mb-6">
          At Mini URL, we envision a web where sharing links is effortless and
          streamlined. We strive to empower users to share content seamlessly
          across various platforms, without the hassle of lengthy URLs.
        </p>
        {isAuthenticated ? (
          <></>
        ) : (
          <p className="text-lg text-blue-300">
            <Link to="/sign-up" className="text-rose-500 underline">
              Sign up
            </Link>{" "}
            now and start shortening URLs in seconds!
          </p>
        )}
      </section>
    </div>
  );
};

export default Home;
