import React, { FC } from "react";
import cn from "classnames";
import css from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader: FC = () => {
  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <ul className={css.navList}>
          <li className={cn(css.listItem, "pl-5", "pr-5")}>
            <BurgerIcon type="primary" />
            <a
              href="/"
              className={cn(
                css.listItemLink,
                "text text_type_main-default ml-2"
              )}
            >
              Конструктор
            </a>
          </li>
          <li className={cn(css.listItem, "pl-5", "pr-5")}>
            <ListIcon type="secondary" />
            <a
              href="/"
              className={cn(
                css.listItemLink,
                "text text_type_main-default ml-2 text_color_inactive"
              )}
            >
              Лента заказов
            </a>
          </li>
          <li className={cn(css.listItem, css.logoItem)}>
            <Logo />
          </li>
          <li className={cn(css.listItem, "pl-5", "pr-5")}>
            <ProfileIcon type="secondary" />
            <a
              href="/"
              className={cn(
                css.listItemLink,
                "text text_type_main-default ml-2 text_color_inactive"
              )}
            >
              Личный кабинет
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
