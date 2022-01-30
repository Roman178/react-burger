import React, { FC } from "react";
import cn from "classnames";
import css from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

const AppHeader: FC = () => {
  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <ul className={css.navList}>
          <li className={cn(css.listItem, "pl-5", "pr-5")}>
            <BurgerIcon type="primary" />
            <Link
              to="/"
              className={cn(
                css.listItemLink,
                "text text_type_main-default ml-2"
              )}
            >
              Конструктор
            </Link>
          </li>
          <li className={cn(css.listItem, "pl-5", "pr-5")}>
            <ListIcon type="secondary" />
            <Link
              to="/feed"
              className={cn(
                css.listItemLink,
                "text text_type_main-default ml-2 text_color_inactive"
              )}
            >
              Лента заказов
            </Link>
          </li>
          <li className={cn(css.listItem, css.logoItem)}>
            <Logo />
          </li>
          <li className={cn(css.listItem, "pl-5", "pr-5")}>
            <ProfileIcon type="secondary" />

            <Link
              to="/profile"
              className={cn(
                css.listItemLink,
                "text text_type_main-default ml-2 text_color_inactive"
              )}
            >
              Личный кабинет
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
