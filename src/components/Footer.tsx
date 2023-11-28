import Image from "next/image";
import Link from "next/link";
import { footerLinks } from "@/constants";

const Footer = () => {
  return (
    <footer className="flex flex-col text-black-100 mt-5 border-t border-gray-100">
      <div className="flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10">
        <div className="flex flex-col justify-start items-start gap-6">
          <Image
            src="/tesouro-logo.png"
            alt="logo tesouro direto"
            height={100}
            width={100}
            className="object-contain"
          />
          <p className="text-base text-gray-700">
            Oráculo do Tesouro 2023 <br />
            Todos os direitos reservados &copy;
          </p>
        </div>

        <div className="footer__links">
          {footerLinks.map((link) => (
            <div key={link.title} className="footer__link">
              <h3 className="font-bold">{link.title}</h3>
              <div className="flex flex-col gap-5">
                {link.links.map((item) => (
                  <Link
                    key={item.title}
                    href={item.url}
                    className="text-gray-500"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between text-gray-500 items-center flex-wrap mt-10 border-t border-gray-100 sm:px-16 px-6 py-10 ">
        <p>@2023 Oráculo do Tesouro. Todos os Direitos Reservados. </p>
        <div className="footer__copyrights-link flex-row flex">
          <Link href="/" className="text-gray-500">
            Politica de Privacidade
          </Link>
          <Link href="/" className="text-gray-500">
            Termos de Uso
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
