import { FC } from "react";

import "./Button.scss";

interface IButton {
  onClick?: any;
  type?: any;
  title: string;
}

const Button: FC<IButton> = ({ type, title, onClick }) => (
  <button type={type} onClick={onClick}>
    {title}
  </button>
);

export default Button;
