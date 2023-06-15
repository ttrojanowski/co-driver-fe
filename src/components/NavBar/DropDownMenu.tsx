import { PButtonPure } from "@porsche-design-system/components-react";
import React, { useState, FC } from "react";

interface DropdownItemProps {
  item: React.ReactNode;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DropdownMenuProps {
  items: React.ReactNode[];
}

const DropdownItem: FC<DropdownItemProps> = ({ item, setIsOpen }) => (
  <div className="p-1 px-4 border-b last:border-b-0 border-b-slate-950">
    <button onClick={() => setIsOpen(false)}>
      {item}
    </button>
  </div>
);
const DropdownMenu: FC<DropdownMenuProps> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
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
          className="origin-top-right absolute right-0 lg:right-auto mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-2" role="none">
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
