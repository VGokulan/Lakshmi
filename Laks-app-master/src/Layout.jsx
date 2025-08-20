import BottomNavBar from "./components/BottomNavBar";
import Header from "./components/Header";

const Layout = ({ children }) => {
  return (
    <div className="h-[100dvh] bg-[#022213]">
      <Header />
      <div className="rounded-3xl overflow-y-scroll bg-[#022213] h-[81dvh] px-2">
        {children}
      </div>
      <BottomNavBar />
    </div>
  );
};
export default Layout;
