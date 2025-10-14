import { Code } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full flex justify-between align-center py-4">
      © Sharon Yang, 2025
      <a
        href="https://github.com/sharonyang16/typing-game"
        target="_blank"
        rel="noopener"
      >
        <Code size={16} />
      </a>
    </footer>
  );
};

export default Footer;
