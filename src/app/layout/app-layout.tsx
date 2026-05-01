import { Outlet } from "react-router";
import { Header } from "@/widgets/header";

function MainLayout() {
  return (
    <div className="w-screen h-screen flex bg-(--main-bg)">
      <div className="w-full h-full flex flex-col m-auto">
        <Header />
        <div className="w-full max-w-6xl h-full flex flex-col m-auto border-x border-(--color-primary)">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
