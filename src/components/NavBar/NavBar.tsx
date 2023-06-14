import {
  PHeading,
  PIcon,
  PWordmark,
} from "@porsche-design-system/components-react";
import codriverlogo from "../../assets/co-driver-logo.png";
import avatar from "../../assets/avatar2.png";
import { Link, NavLink } from "react-router-dom";
import DropdownMenu from "./DropDownMenu";

interface Props {
  className?: string;
}

export const NavBar = ({ className }: Props) => {
  const items = [
    <div key="avatar" className="flex items-center space-x-6 p-1">
      <img src={avatar} className="w-10" />
      <p>John Doe</p>
    </div>,
    <NavLink key="chat" to="/" className="flex items-center space-x-1">
      <PIcon name="chat" />
      <p>Chat</p>
    </NavLink>,
    <NavLink key="qa" to="/qa" className="flex items-center space-x-1">
      <PIcon name="question" />
      <p>Ask the question</p>
    </NavLink>,
    <NavLink key="logout" to="/" className="flex items-center space-x-1">
      <PIcon name="logout" />
      <p>Logout</p>
    </NavLink>,
  ];

  return (
    <nav
      className={`${className} flex px-3 py-4
            w-full
            fixed top-0 left-0 right-0 z-10 h-[80px] md:justify-around justify-between`}
    >
      <Link
        to="/"
        className="cursor-pointer items-center hover:text-orange-700 flex"
      >
        <img src={codriverlogo} className="w-20" />
        <PHeading
          className="hidden md:block"
          tag="h2"
          size="medium"
          color="inherit"
        >
          Porsche Co-Driver
        </PHeading>
      </Link>

      <div className="items-center hidden space-x-8 md:flex">
        <PWordmark
          href="https://www.porsche.com"
          aria={{ "aria-label": "Porsche Homepage" }}
        />
      </div>

      <div className="flex items-center space-x-5">
        <DropdownMenu items={items} />
      </div>
    </nav>
  );
};
