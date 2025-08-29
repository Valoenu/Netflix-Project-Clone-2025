import { useAuthStore } from "../../store/authUser";
import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";

// Create home page
const HomePage = () => {
  const { user } = useAuthStore(); // destructure data to check if user exist and only if user exist then render home screen

  return <>{user ? <HomeScreen /> : <AuthScreen />}</>;
};
export default HomePage;
