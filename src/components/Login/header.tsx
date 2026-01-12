import { Button } from "@heroui/button";

import logo from "../../assets/logo.png";

export function Header() {
  return (
    <>
    {/* Email Us */}
      <p className="text-right font-semibold py-[10px] px-[50px]">Email Us : bd@pharmapolymorph.com</p>
      <nav className="flex items-center justify-between px-6 py-[29px] shadow bg-white px-[50px]">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img alt="Logo" className="h-10 w-auto object-contain" src={logo} />
      </div>

      {/* Navigation + Button */}
      <div className="flex items-center gap-8">
        <ul className="flex items-center gap-6 text-default-700">
          <li className="cursor-pointer font-semibold hover:text-default-900">Home</li>
          <li className="cursor-pointer font-semibold hover:text-default-900">About us</li>
          <li className="cursor-pointer font-semibold hover:text-default-900">Services</li>
          <li className="cursor-pointer font-semibold hover:text-default-900">Contact us</li>
        </ul>

        <Button className="primary font-semibold roundedw-full bg-primary text-white py-2 rounded">
          Login Now
        </Button>
      </div>
    </nav>
    </>
  );
}
