import React from "react";
import cn from "classnames";
import css from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <ul className={css.navList}>
          <li className={cn(css.listItem, "pl-5", "pr-5")}>
            <BurgerIcon />
            <a className="text text_type_main-default">Конструктор</a>
          </li>
          <li className={cn(css.listItem, "pl-5", "pr-5")}>
            <ListIcon />
            <a className="text text_type_main-default">Лента заказов</a>
          </li>
          <li className={cn(css.listItem, css.logoItem)}>
            <Logo />
          </li>
          <li className={cn(css.listItem, "pl-5", "pr-5")}>
            <ProfileIcon />
            <a className="text text_type_main-default">Личный кабинет</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
