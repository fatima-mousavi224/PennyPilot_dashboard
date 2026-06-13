import Image from "next/image";

const Footer = () => {
  return (
    <div className="w-full bg-secondary">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between px-4 sm:px-6 md:px-10 lg:px-14  py-6">
        <Image
          src="/light-logo/light-logo-1.svg"
          alt="footer logo"
          width={150}
          height={150}
        />
        <p className="small text-border">
          © 2026 PennyPilot — Built by Fatima Mousavi
        </p>
      </div>
    </div>
  );
};

export default Footer;
