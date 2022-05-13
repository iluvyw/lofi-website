import LofieLogo from "../logo/LofieLogo";

const NavBar = () => {
  return (
    <nav className="flex">
      <div className="ml-[-45px] mt-[-50px] cursor-pointer">
        <LofieLogo />
      </div>
      <ul className="flex gap-10 text-[20px] font-semibold ml-auto mt-[50px]">
        <li className="nav-item">Features</li>
        <li className="nav-item">Pricing</li>
        <li className="nav-item">About</li>
        <li className="nav-item">Contact</li>
      </ul>
      <button className="rounded-[10px] bg-gunmetal px-6 h-9 py-[6px] mt-[47px] ml-24 hover:bg-black transition-all duration-300">
        Get started
      </button>
    </nav>
  );
};

export default NavBar;
