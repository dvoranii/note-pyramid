// components/Layout.tsx
import * as S from "./Layout.styled";
import type { ReactNode } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { useKeyboardNavigation } from "../../context/KeyboardNavigationContext/useKeyboardNavigation";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const { isEnabled, activeContext } = useKeyboardNavigation(); // Add isEnabled
  const isAnalysisPage = location.pathname === "/analysis";

  return (
    <S.LayoutContainer>
      {!isAnalysisPage && (
        <S.SidebarWrapper
          $isActive={isEnabled && activeContext === "sidebar"} // Only show when enabled
        >
          <Sidebar />
        </S.SidebarWrapper>
      )}
      <S.MainContent
        $fullWidth={isAnalysisPage}
        $isActive={isEnabled && activeContext === "pyramid" && !isAnalysisPage} // Only show when enabled
      >
        {children}
      </S.MainContent>
    </S.LayoutContainer>
  );
};

export default Layout;
