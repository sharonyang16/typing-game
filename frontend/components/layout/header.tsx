import Link from "next/link";
import { User } from "lucide-react";
import { useAuthContext } from "@/context/AuthContext";

const Header = ({ text }: { text: string }) => {
  const { user } = useAuthContext();
  console.log(user);

  return (
    <header className="w-full flex justify-between align-center py-4">
      <div className="font-mono text-xl font-bold">
        <Link href="/">typing game</Link>
      </div>
      <div>{text}</div>
      <Link href={user ? "/authentication/logout" : "/authentication/login"}>
        <User />
      </Link>
    </header>
  );
};

export default Header;
