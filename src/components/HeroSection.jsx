import { signInWithPopup } from "firebase/auth";
import Button from "./Button";
import { auth, googleProvider } from "../config/firebase";
import { useAuthStore } from "../global/store";

const HeroSection = () => {
  const user = useAuthStore((state) => state.user);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      useAuthStore.getState().setUser({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
      console.log("User signed in:");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="flex flex-col items-center px-20 text-center py-16 gap-3">
      <h1 className="text-4xl font-extrabold md:text-6xl">
        Effortless Travel Planning <br /> with{" "}
        <span className="text-rose-600">Itinera</span>
      </h1>
      <h3 className="px-24">
        A seamless travel itinerary planner that helps you organize, customize,
        and share your travel plans effortlessly
      </h3>
      {
        user? <Button bgColor="bg-slate-500">Let&apos;s Go 👇</Button> : <Button onClick={signInWithGoogle}>Get Started</Button>
      }
    </div>
  );
};

export default HeroSection;
