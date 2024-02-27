import Link from "next/link";

type NavItemType = {
  text: string;
  to: string;
};

export default function Navbar() {
  const navItems: NavItemType[] = [
    { text: "HOME", to: "/" },
    { text: "BLOGS", to: "/blogs" },
    { text: "CONTACTS", to: "/contacts" },
  ];
  return (
    <nav className="fixed top-0 w-full flex justify-between px-10 py-4 text-white z-50">
      <div>Logo</div>
      <ul className="flex font-light text-sm">
        {navItems.map((item, index) => (
          <li className="mx-4" key={index}>
            <Link href={item.to}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
