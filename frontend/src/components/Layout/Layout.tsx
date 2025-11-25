import * as S from "./Layout.styled";
import type { ReactNode } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isAnalysisPage = location.pathname === "/analysis";

  return (
    <S.LayoutContainer>
      {!isAnalysisPage && <Sidebar />}
      <S.MainContent $fullWidth={isAnalysisPage}>{children}</S.MainContent>
    </S.LayoutContainer>
  );
};

export default Layout;
