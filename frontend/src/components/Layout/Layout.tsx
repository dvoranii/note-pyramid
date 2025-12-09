// components/Layout.tsx
import * as S from "./Layout.styled";
import type { ReactNode } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { useKeyboardNavigation } from "../../context/KeyboardNavigationContext/useKeyboardNavigation";
import { useState } from "react";
import { HelpModal } from "../HelpModal/HelpModal";
import { KeyboardNavIndicator } from "../KeyboardNavIndicator/KeyboardNavIndicator";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const { isEnabled, activeContext } = useKeyboardNavigation();
  const isAnalysisPage = location.pathname === "/analysis";
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  return (
    <S.LayoutContainer>
      {!isAnalysisPage && (
        <S.SidebarWrapper $isActive={isEnabled && activeContext === "sidebar"}>
          <Sidebar />
        </S.SidebarWrapper>
      )}
      <S.MainContent
        $fullWidth={isAnalysisPage}
        $isActive={isEnabled && activeContext === "pyramid" && !isAnalysisPage}
      >
        {children}

        {!isAnalysisPage && (
          <>
            <S.CommonScentsHomeWrapper>
              <S.CommonScentsHomeLink href="https://common-scents.duckdns.org/">
                ←Home
              </S.CommonScentsHomeLink>
            </S.CommonScentsHomeWrapper>
            <S.HelpIconWrapper>
              <S.HelpIcon onClick={() => setIsHelpModalOpen(true)}>
                ?
              </S.HelpIcon>
            </S.HelpIconWrapper>
          </>
        )}
      </S.MainContent>
      <HelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />
      {!isAnalysisPage && <KeyboardNavIndicator />}
    </S.LayoutContainer>
  );
};

export default Layout;
