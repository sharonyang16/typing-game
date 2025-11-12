import Link from "next/link";
import { User } from "lucide-react";
import useHeader from "@/hooks/useHeader";

const Header = () => {
  const { headerText, link } = useHeader();

  return (
    <header className="w-full flex justify-between align-center py-4">
      <div className="font-mono text-xl font-bold">
        <Link href="/">typing game</Link>
      </div>

      <div className="flex gap-4">
        <div>{headerText}</div>
        <Link href={link}>
          <User />
        </Link>
      </div>
    </header>
  );
};

export default Header;
