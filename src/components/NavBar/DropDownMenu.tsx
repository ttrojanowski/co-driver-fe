import { PButtonPure } from "@porsche-design-system/components-react";
import React, { FC, useEffect, useRef, useState } from "react";
import avatar from "../../assets/avatar2.png";

interface DropdownItemProps {
  item: React.ReactNode;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DropdownMenuProps {
  items: React.ReactNode[];
}

const DropdownItem: FC<DropdownItemProps> = ({ item, setIsOpen }) => (
  <div className="p-1 px-4 hover:bg-slate-100 first:hover:bg-white">
    <button onClick={() => setIsOpen(false)}>{item}</button>
  </div>
);

const DropdownMenu: FC<DropdownMenuProps> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div ref={menuRef}>
      <div>
        <PButtonPure
          aria={{ "aria-haspopup": true, "aria-expanded": true }}
          icon="menu-dots-horizontal"
          hideLabel={true}
          onClick={() => setIsOpen(!isOpen)}
        >
          Menu
        </PButtonPure>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-auto translate-x-[-90%] w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-2" role="none">
            <div key="avatar" className="flex items-center space-x-6 p-1">
              <img src={avatar} className="w-10" />
              <div className="cursor-default">John Doe</div>
            </div>
            {items.map((item, index) => (
              <DropdownItem key={index} item={item} setIsOpen={setIsOpen} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
