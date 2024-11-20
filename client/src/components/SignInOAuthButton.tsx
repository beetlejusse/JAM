import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";

export const SignInOAuthButton = () => {
  const { signIn, isLoaded } = useSignIn();
  if (!isLoaded) return null;

  const signInWithGoogle = () => {
    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      //finally we can save the user to database
      redirectUrlComplete: "/auth",
    });
  };

  return (
    <Button
      onClick={signInWithGoogle}
      variant={"secondary"}
      className="w-full text-white border-zinc-200 h-11"
    >
      Continue With Google
    </Button>
  );
};
