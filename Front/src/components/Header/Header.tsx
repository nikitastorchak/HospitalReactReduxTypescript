import { FC } from "react";

import { ReactComponent as Logo } from "../../images/logo.svg";
import { HeaderProps } from "../../types/appoints";

import "./Header.scss";

const Header: FC<HeaderProps> = ({ children, title }) => (
  <div className="header">
    <div className="header__content">
      <Logo />
      <p>{title}</p>
      {children}
    </div>
  </div>
);

export default Header;
