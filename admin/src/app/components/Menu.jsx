"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { LuShoppingBag } from "react-icons/lu";
import { MdAddCircleOutline } from "react-icons/md";
import { RiFileList3Line } from "react-icons/ri";
import { TbLogout2 } from "react-icons/tb";

const Menu = ({ setToken }) => {
  const pathname = usePathname();

  const menuItems = [
    {
      path: "/pages/add",
      label: "Add Items",
      icon: <MdAddCircleOutline className="h-6 w-6" />,
    },
    {
      path: "/pages/list",
      label: "List Items",
      icon: <RiFileList3Line className="h-6 w-6" />,
    },
    {
      path: "/pages/orders",
      label: "Orders",
      icon: <LuShoppingBag className="h-6 w-6" />,
    },
  ];

  return (
    <div className="h-screen px-5 pt-2 pb-10 border-r-2 flex flex-col gap-10 items-center w-20 md:w-fit">
      <div>
        <Logo />
        <p className="text-center mt-[-20px] text-gray-600 hidden md:block">
          Admin Panel
        </p>
      </div>
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-5 text-lg">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-1 py-2 px-3 rounded-full w-full justify-center md:justify-start ${
                pathname === item.path ? "bg-[#8b684c2e] " : ""
              }`}
            >
              {item.icon}
              <span className="hidden md:block">{item.label}</span>
            </Link>
          ))}
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            setToken("");
            window.location.reload();
          }}
          className="bg-[#8b684c] text-white px-4 py-1.5 rounded-full text-lg flex items-center gap-2"
        >
          <TbLogout2 className="h-6 w-6" />
          <span className="hidden md:block">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Menu;
