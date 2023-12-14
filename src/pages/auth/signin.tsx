import { Button } from "@/components/ui/button";
import { SiGoogle } from "@icons-pack/react-simple-icons";
import { signIn } from "next-auth/react";
import { FC } from "react";

type Props = {};

const Login: FC = (props: Props) => {
  return (
    <div className="h-[85vh] flex justify-center items-center">
      <Button
        onClick={() => signIn("google")}
        variant={"outline"}
        className="py-3 h-auto px-8 text-lg font-semibold dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 active:scale-95"
      >
        <SiGoogle className="mr-3 object-cover w-5 h-5" />
        SignIn with Google
      </Button>
    </div>
  );
};

export default Login;
