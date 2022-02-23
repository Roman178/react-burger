import React, { ChangeEvent, useState, FC, useCallback } from "react";
import { useCookies } from "react-cookie";
import {
  ACCESS_TOKEN,
  JWT_EXPIRED,
  REFRESH_TOKEN,
} from "../../constants/constants";
import {
  authRefreshTokenThunk,
  logoutThunk,
  updateUserThunk,
} from "../../services/actions/user";
import { useDispatch, useSelector } from "../../services/hooks";
import css from "./profile.module.css";
import cn from "classnames";
import {
  Switch,
  Route,
  useRouteMatch,
  Link,
  NavLink,
  useLocation,
} from "react-router-dom";
import Orders from "./orders";
import {
  CloseIcon,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { connect } from "react-redux";
import { AppThunk } from "../../services/types";
import { toast } from "react-toastify";

interface IProfileProps {
  updateUser?: AppThunk<Promise<any>>;
  authRefreshToken?: AppThunk<Promise<any>>;
}

const Profile: FC<IProfileProps> = ({ updateUser, authRefreshToken }) => {
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies([
    ACCESS_TOKEN,
    REFRESH_TOKEN,
  ]);
  const { path, url } = useRouteMatch();
  const location = useLocation();
  const { name, email } = useSelector((store) => store.user.currentUser.user);

  const [inputs, setInputs] = useState({ name, email, password: "" });
  const [isEditMode, setIsEditMode] = useState({
    name: false,
    email: false,
    password: false,
  });

  const handleOutsideClick = useCallback(
    (e: any) => {
      if (
        e.target.name === "name" ||
        e.target.name === "password" ||
        e.target.name === "email"
      )
        return;

      setInputs({ name, email, password: "" });
      setIsEditMode({ name: false, email: false, password: false });
      window.removeEventListener("click", handleOutsideClick);
    },
    [email, name]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogoutClick = () => {
    dispatch(logoutThunk(cookies[REFRESH_TOKEN]));
    removeCookie(ACCESS_TOKEN);
    removeCookie(REFRESH_TOKEN);
  };

  const handleInputIconClick = async (
    e: any,
    inputName: "password" | "name" | "email",
    inputValue: string
  ) => {
    if (isEditMode[inputName]) {
      window.removeEventListener("click", handleOutsideClick);
      try {
        await updateUser!({ [inputName]: inputValue }, cookies[ACCESS_TOKEN]);

        setIsEditMode((prev) => ({
          ...isEditMode,
          [inputName]: !prev[inputName],
        }));

        if (inputName === "password") {
          setInputs({ ...inputs, password: "" });
          toast.success("Пароль изменен");
        }
      } catch (error: any) {
        if (error.message === JWT_EXPIRED) {
          try {
            const tokenData: any = await authRefreshToken!(
              cookies[REFRESH_TOKEN]
            );
            setCookie(ACCESS_TOKEN, tokenData.accessToken);
            setCookie(REFRESH_TOKEN, tokenData.refreshToken);

            setIsEditMode((prev) => ({
              ...isEditMode,
              [inputName]: !prev[inputName],
            }));
          } catch (error) {
            dispatch(logoutThunk(cookies[REFRESH_TOKEN]));
          }
        }
      }
    } else {
      window.addEventListener("click", handleOutsideClick);
      setIsEditMode((prev) => ({
        ...isEditMode,
        [inputName]: !prev[inputName],
      }));
    }
  };

  const handleCloseIconClick = (
    inputName: "password" | "name" | "email",
    oldValue: string
  ) => {
    setInputs({ ...inputs, [inputName]: oldValue });
    setIsEditMode((prev) => ({
      ...isEditMode,
      [inputName]: !prev[inputName],
    }));
    window.removeEventListener("click", handleOutsideClick);
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
            onClick={handleLogoutClick}
            className={cn(
              "text text_type_main-medium text_color_inactive",
              css.item
            )}
          >
            Выход
          </li>
        </ul>
        {location.pathname === "/profile" && (
          <form className={css.form}>
            <div className={css.wrapper}>
              <Input
                value={inputs.name}
                name="name"
                onChange={handleChange}
                placeholder="Имя"
                icon={isEditMode.name ? "CheckMarkIcon" : "EditIcon"}
                onIconClick={(e) =>
                  handleInputIconClick(e, "name", inputs.name)
                }
                disabled={!isEditMode.name}
              />
              {isEditMode.name && (
                <div className={css.closeIcon}>
                  <CloseIcon
                    onClick={() => handleCloseIconClick("name", name)}
                    type="primary"
                  />
                </div>
              )}
            </div>
            <div className={css.wrapper}>
              <Input
                type="email"
                value={inputs.email}
                name="email"
                onChange={handleChange}
                placeholder="Логин"
                icon={isEditMode.email ? "CheckMarkIcon" : "EditIcon"}
                onIconClick={(e) =>
                  handleInputIconClick(e, "email", inputs.email)
                }
                disabled={!isEditMode.email}
              />
              {isEditMode.email && (
                <div className={css.closeIcon}>
                  <CloseIcon
                    onClick={() => handleCloseIconClick("email", email)}
                    type="primary"
                  />
                </div>
              )}
            </div>

            <div className={css.wrapper}>
              <Input
                value={inputs.password}
                name="password"
                type="password"
                onChange={handleChange}
                placeholder="Пароль"
                icon={isEditMode.password ? "CheckMarkIcon" : "EditIcon"}
                onIconClick={(e) =>
                  handleInputIconClick(e, "password", inputs.password)
                }
                disabled={!isEditMode.password}
              />
              {isEditMode.password && (
                <div className={css.closeIcon}>
                  <CloseIcon
                    onClick={() => handleCloseIconClick("password", "")}
                    type="primary"
                  />
                </div>
              )}
            </div>
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

const mapDispatchToProps = {
  updateUser: updateUserThunk,
  authRefreshToken: authRefreshTokenThunk,
};

export default connect<AppThunk>(undefined, mapDispatchToProps)(Profile);
