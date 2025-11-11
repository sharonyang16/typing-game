import Link from "next/link";
import { User } from "lucide-react";
import { useAuthContext } from "@/context/AuthContext";

const Header = () => {
  const { user } = useAuthContext();

  return (
    <header className="w-full flex justify-between align-center py-4">
      <div className="font-mono text-xl font-bold">
        <Link href="/">typing game</Link>
      </div>
      <div>{user ? `Hi, ${user.email}!` : "Welcome!"}</div>
      <Link href={user ? "/authentication/logout" : "/authentication/login"}>
        <User />
      </Link>
    </header>
  );
};

export default Header;
