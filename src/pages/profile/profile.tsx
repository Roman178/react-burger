import React, { ChangeEvent, useState } from "react";
import { useCookies } from "react-cookie";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants/constants";
import { logoutThunk } from "../../services/actions/user";
import { useDispatch, useSelector } from "../../services/hooks";
import css from "./profile.module.css";
import cn from "classnames";
import {
  Switch,
  Route,
  useParams,
  useRouteMatch,
  Link,
  NavLink,
  useLocation,
} from "react-router-dom";
import Orders from "./orders";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

const Profile = () => {
  const dispatch = useDispatch();
  const [cookies, , removeCookie] = useCookies([ACCESS_TOKEN, REFRESH_TOKEN]);
  const { path, url } = useRouteMatch();
  const location = useLocation();
  const { name, email } = useSelector((store) => store.user.currentUser.user);
  const [inputs, setInputs] = useState({ name, email, password: "" });
  const [isEditMode, setIsEditMode] = useState({
    name: false,
    email: false,
    password: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  console.log(location);

  const handleClick = () => {
    dispatch(logoutThunk(cookies[REFRESH_TOKEN]));
    removeCookie(ACCESS_TOKEN);
    removeCookie(REFRESH_TOKEN);
  };

  return (
    <>
      <div className={css.root}>
        <ul className={css.list}>
          <li className={css.item}>
            <Link
              className={cn(
                "text text_type_main-medium text_color_inactive",
                css.link,
                { [css.activeLink]: location.pathname === "/profile" }
              )}
              to="/profile"
            >
              Профиль
            </Link>
          </li>
          <li className={cn(css.item)}>
            <NavLink
              className={cn(
                "text text_type_main-medium text_color_inactive",
                css.link
              )}
              activeClassName={css.activeLink}
              to={`${url}/orders`}
            >
              История заказов
            </NavLink>
          </li>
          <li
            onClick={handleClick}
            className={cn(
              "text text_type_main-medium text_color_inactive",
              css.item
            )}
          >
            Выход
          </li>
        </ul>
        {location.pathname === "/profile" && (
          <form>
            <div className={css.wrapper}>
              <Input
                value={inputs.name}
                name="name"
                onChange={handleChange}
                placeholder="Имя"
                icon={isEditMode.name ? "CheckMarkIcon" : "EditIcon"}
                onIconClick={() =>
                  setIsEditMode((prev) => ({ ...isEditMode, name: !prev.name }))
                }
                disabled={!isEditMode.name}
              />
              {isEditMode.name && (
                <Button type="primary" size="medium">
                  Нажми на меня
                </Button>
              )}
            </div>
            <Input
              value={inputs.email}
              name="email"
              onChange={handleChange}
              placeholder="Логин"
              icon={isEditMode.email ? "CheckMarkIcon" : "EditIcon"}
              onIconClick={() =>
                setIsEditMode((prev) => ({ ...isEditMode, email: !prev.email }))
              }
              disabled={!isEditMode.email}
            />
            <Input
              value={inputs.password}
              name="password"
              onChange={handleChange}
              placeholder="Пароль"
              icon={isEditMode.password ? "CheckMarkIcon" : "EditIcon"}
              onIconClick={() =>
                setIsEditMode((prev) => ({
                  ...isEditMode,
                  password: !prev.password,
                }))
              }
              disabled={!isEditMode.password}
            />
          </form>
        )}
        <Switch>
          <Route path={`${path}/orders`}>
            <Orders />
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default Profile;
