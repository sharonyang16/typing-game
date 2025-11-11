import Link from "next/link";
import { User } from "lucide-react";
const Header = () => {
  return (
    <header className="w-full flex justify-between align-center py-4">
      <div className="font-mono text-xl font-bold">
        <Link href="/">typing game</Link>
      </div>
      <Link href="/authentication/login">
        <User />
      </Link>
    </header>
  );
};

export default Header;
