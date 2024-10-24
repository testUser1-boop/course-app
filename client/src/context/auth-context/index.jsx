import { Skeleton } from "@/components/ui/skeleton";
import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { checkAuthService, loginService, registerService } from "@/services";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  const [errorMessage, setErrorMessage] = useState("");
  const [auth, setAuth] = useState({
    authenticate: false,
    user: null,
  });
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  async function handleRegisterUser(event) {
    event.preventDefault();
    try {
      setAuthLoading(true);
      setErrorMessage(null);
      console.log("...");
      const data = await registerService(signUpFormData);

      console.log(signInFormData);
      setAuthLoading(false);
      console.log(data.message);
      setSignUpFormData(initialSignUpFormData);
      setSignInFormData(initialSignInFormData);
      return setErrorMessage(data.message);
    } catch (error) {
      setErrorMessage(error.data.message);
      setAuthLoading(false);
      setSignUpFormData(initialSignUpFormData);
      setSignInFormData(initialSignInFormData);
    }
  }

  async function handleLoginUser(event) {
    event.preventDefault();
    try {
      setAuthLoading(true);
      setErrorMessage(null);
      const data = await loginService(signInFormData);
      console.log(data, "data");

      if (data.success) {
        setAuthLoading(false);
        setErrorMessage(data.message);
        setSignUpFormData(initialSignUpFormData);
        setSignInFormData(initialSignInFormData);
        sessionStorage.setItem(
          "accessToken",
          JSON.stringify(data.data.accessToken)
        );
        setAuth({
          authenticate: true,
          user: data.data.user,
        });
      } else {
        setAuthLoading(false);
        setErrorMessage(data.message);
        setSignUpFormData(initialSignUpFormData);
        setSignInFormData(initialSignInFormData);
        setAuth({
          authenticate: false,
          user: null,
        });
      }
    } catch (error) {
      setAuthLoading(false);
      setErrorMessage(error.message);
      setSignUpFormData(initialSignUpFormData);
      setSignInFormData(initialSignInFormData);
    }
  }

  //check auth user

  async function checkAuthUser() {
    try {
      const data = await checkAuthService();
      if (data.success) {
        setAuth({
          authenticate: true,
          user: data.data.user,
        });
        setLoading(false);
      } else {
        setAuth({
          authenticate: false,
          user: null,
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      if (!error?.response?.data?.success) {
        setAuth({
          authenticate: false,
          user: null,
        });
        setLoading(false);
      }
    }
  }

  function resetCredentials() {
    setErrorMessage(null);

    setAuth({
      authenticate: false,
      user: null,
    });
  }

  useEffect(() => {
    checkAuthUser();
  }, []);

  console.log(auth, "gf");

  return (
    <AuthContext.Provider
      value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegisterUser,
        handleLoginUser,
        auth,
        resetCredentials,
        authLoading,
        errorMessage,
      }}
    >
      {loading ? <Skeleton /> : children}
    </AuthContext.Provider>
  );
}
