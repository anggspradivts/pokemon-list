"use client";
import { usePathname } from "next/navigation";
import SearchPokemon from "./SearchPokemon";
import Link from "next/link";
import Header from "./ui/header";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="h-[50px] w-full flex items-center justify-between p-5 bg-slate-400">
      <Link href="/">
        <Header text="Seek Pokemon" classnames="" />
      </Link>
      {pathname !== "/" && (
        <div className="">
          <SearchPokemon />
        </div>
      )}
    </div>
  );
};

export default Navbar;
