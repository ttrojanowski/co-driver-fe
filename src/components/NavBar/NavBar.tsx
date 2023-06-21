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
    // <NavLink key="qa" to="/qa" className="flex items-center space-x-1">
    //   <PIcon name="question" />
    //   <p>Ask the question</p>
    // </NavLink>,
    <NavLink
      key="settings"
      to="/settings"
      className="flex items-center space-x-1"
    >
      <PIcon name="wrenches" />
      <p>Settings</p>
    </NavLink>,
    <NavLink key="logout" to="/" className="flex items-center space-x-1">
      <PIcon name="logout" />
      <p>Logout</p>
    </NavLink>,
  ];

  return (
    <div className="bg-white sticky top-0 z-50">
      <nav className="max-w-screen-xl mx-auto p-0 lg:gap-8 xl:gap-0 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <div className="grid grid-cols-12">
            <Link
              to="/"
              className="col-span-4 cursor-pointer flex items-center justify-start gap-3"
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
            <div className="col-span-4 flex items-center justify-center">
              <PWordmark aria={{ "aria-label": "Porsche Homepage" }} />
            </div>

            <div className="col-span-4 flex items-center justify-end pr-4 md:pr-10">
              <DropdownMenu items={items} />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
