// Navbar.tsx

import Image from "next/image";
import Link from "next/link";
import Profile from "./Profile";

export const Navbar: React.FC = () => {
  return (
    <header className="relative w-full">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
        <Link href="/" className="flex justify-center items-center">
          <Image
            src="/tesouro-logo.png"
            alt="logo tesouro direto"
            width={200}
            height={200}
            className="object-contain"
          />
        </Link>
        <Profile />
      </nav>
    </header>
  );
};
