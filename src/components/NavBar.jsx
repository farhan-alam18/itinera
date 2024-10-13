import Button from "./Button";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { useAuthStore } from "../global/store";

const NavBar = () => {
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

  const signOutUser = async () => {
    try {
      await signOut(auth);
      useAuthStore.getState().clearUser();
      console.log("User signed out");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };
  return (
    <nav className="border flex justify-between px-10 py-3 shadow-sm">
      <div className="flex gap-2 items-center">
        <div>✈️</div>
        <h1 className="font-bold tracking-tight text-xl">Itinera</h1>
      </div>
      {user ? (
        <Button bgColor="bg-rose-600" onClick={signOutUser}>
          Logout
        </Button>
      ) : (
        <Button onClick={signInWithGoogle}>Sign In</Button>
      )}
    </nav>
  );
};

export default NavBar;
