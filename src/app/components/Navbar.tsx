"use client";
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
  const renderLinks = (classNames: string) =>
    navLinks.map(({ href, label }) => {
      return (
        <Link
          href={href}
          key={href}
          className={`btn-sm ${classNames} ${
            isActiveLink(href) ? "btn-accent" : null
          }`}
        >
          {label}
        </Link>
      );
    });
  return (
    <div className="">
      <div>
        <div>{renderLinks("btn")}</div>
      </div>
      <div></div>
    </div>
  );
};

export default Navbar;
