import SideBar from "./Components/SideBar";

const Layout = ({ children }) => {
  return (
    <div className=" flex">
      <SideBar />
      <div className=" w-5/6 bg-[#FEFAE0] h-[96vh] mt-[2vh] overflow-y-scroll  rounded-s-3xl">
        {children}
      </div>
    </div>
  );
};
export default Layout;
