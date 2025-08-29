import { Link } from "react-router-dom";

// Custom 404 page
const NotFoundPage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-white"
      style={{ backgroundImage: `url('/404Background.png')` }}
    >
      <header className="absolute top-0 left-0 p-4 bg-black w-full ">
        <Link to={"/"}>
          <img src="/netflix-logo.png" alt="Netflix" className="h-8" />
        </Link>
      </header>
      <main className="text-center error-page--content z-10">
        <h1 className="text-7xl font-semibold mb-4">Oops! Page not found.</h1>
        <p className="mb-6 text-xl">
          Looks like you’ve wandered off script. Let’s get you back to the main
          lineup and start streaming something amazing
        </p>
        <Link to={"/"} className="bg-white text-black py-2 px-4 rounded">
          Netflix Home
        </Link>
      </main>
    </div>
  );
};
export default NotFoundPage;
