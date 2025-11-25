import * as S from "./Layout.styled";
import type { ReactNode } from "react";
import Sidebar from "../Sidebar/Sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <S.LayoutContainer>
      <Sidebar />
      <S.MainContent>{children}</S.MainContent>
    </S.LayoutContainer>
  );
};

export default Layout;
