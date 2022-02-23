import React, { FC } from "react";
import { InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "../../services/hooks";
import AppHeader from "../app-header/app-header";
import Spinner from "../spinner/spinner";
import css from "./layout.module.css";

const Layout: FC = ({ children }) => {
  const error = useSelector((store) => store.ingredients.ingredientsFailed);
  const loading = useSelector((store) => store.ingredients.ingredientsRequest);

  return (
    <>
      <div className={css.app}>
        <AppHeader />
        {loading ? (
          <Spinner />
        ) : (
          <main className={css.content}>
            {!error ? (
              children
            ) : (
              <p className="text text_type_main-default mt-10">
                <InfoIcon type="error" />
                Произошла ошибка. Попробуйте зайти позже.
              </p>
            )}
          </main>
        )}
      </div>
    </>
  );
};

export default Layout;
