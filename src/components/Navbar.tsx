import Link from "next/link";
import Image from "next/image";

import CustomButton from "./CustomButton";

export const Navbar = () => {
  return (
    <header className="w-full">
      <nav className="max-w-[1440px] mx-auto flex relative justify-between items-center sm:px-16 px-6 py-4">
        <Link href="/" className="flex justify-center items-center">
          <Image
            src="/tesouro-logo.png"
            alt="logo tesouro direto"
            width={200}
            height={200}
            className="object-contain"
          />
        </Link>
      </nav>
    </header>
  );
};
