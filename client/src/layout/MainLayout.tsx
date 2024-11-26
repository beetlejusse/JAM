import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import { LeftSideBarComponent } from "./LayoutComponent/LeftSideBarComponent";

const MainLayout = () => {
  const isMobile = false;

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <ResizablePanelGroup
        direction="horizontal"
        className="flex-1 h-full overflow-hidden p-2"
      >
        {/* left side bar component */}
        <ResizablePanel
          defaultSize={20}
          minSize={isMobile ? 0 : 10}
          maxSize={30}
        >
          <LeftSideBarComponent />
        </ResizablePanel>
        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

        {/* maincontent */}
        <ResizablePanel defaultSize={isMobile ? 80 : 60}>
          <Outlet />
        </ResizablePanel>
        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

        {/* right side */}
        <ResizablePanel
          defaultSize={20}
          minSize={0}
          maxSize={25}
          collapsedSize={0}
        >
          friend activity component
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default MainLayout;
