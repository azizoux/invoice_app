import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();
  const navLinks = [
    {
      href: "/",
      label: "Factures",
    },
  ];
  const isActiveLink = (href: string) =>
    pathname.replace(/\/$/, "") === href.replace(/\/$/, "");
  const renderLinks = (classNames: string) => {
    navLinks.map(({ href, label }) => {
      return (
        <Link href={href} key={href} className={`btn-sm btn ${classNames}`}>
          {label}
        </Link>
      );
    });
  };
  return (
    <div>
      <h1>Navbar</h1>
    </div>
  );
};

export default Navbar;
