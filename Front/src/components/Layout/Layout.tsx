import { FC } from "react";

import { ReactComponent as Hospital } from "../../images/hospital.svg";

import "./Layout.scss";

const Layout: FC = ({ children }) => {
  return (
    <div className="main_wrap">
      <main>
        <Hospital />
        {children}
      </main>
    </div>
  );
};

export default Layout;
