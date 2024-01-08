import { useMemo, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import Button, { ButtonTypes } from "../Button";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import styles from "./Header.module.scss";
import ThemeSwitcher from "../../components/ThemeSwitcher";
import { RoutesList } from "../../pages/Router";
import Username from "../Username";
import { useThemeContext } from "../../context/Theme";
import classNames from "classnames";
import { Theme } from "../../@types";
import Input from "../Input/Input";
import { BiSearch, BiUser } from "react-icons/bi";
import { useSelector } from "react-redux";
import { AuthSelectors } from "../../redux/reducers/authSlice";

const Header = () => {
  const { themeValue } = useThemeContext();

  const isLoggedIn = useSelector(AuthSelectors.getLoggedIn);

  const [isOpened, setOpened] = useState(false);
  const [isSearch, setSearch] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();

  const navLinks = useMemo(
    () => [
      { path: RoutesList.Home, title: "Home" },
      ...(isLoggedIn ? [{ path: RoutesList.SignUp, title: "Add Post" }] : []),
    ],
    [isLoggedIn]
  );

  const handleMenuOpened = () => {
    setOpened(!isOpened);
  };

  const handleSearchOpened = () => {
    setSearch(!isSearch);
  };

  const onLoginButtonClick = () => {
    navigate(RoutesList.SignIn);
  };

  return (
    <div
      className={classNames(styles.container, {
        [styles.darkContainer]: themeValue === Theme.Dark,
      })}
    >
      <div className={styles.header}>
        <Button
          type={ButtonTypes.Primary}
          title={isOpened ? <IoMdClose /> : <GiHamburgerMenu />}
          onClick={handleMenuOpened}
          className={styles.burgerMenuButton}
        />
        {isSearch && (
          <div className={styles.inputSearchContainer}>
            <Input
              placeholder="Search..."
              onChange={setInputValue}
              value={inputValue}
              className={styles.inputSearching}
            />
            <div>
              <Button
                type={ButtonTypes.Primary}
                title={<IoMdClose />}
                onClick={handleSearchOpened}
                className={styles.closedSearching}
              />
            </div>
          </div>
        )}
        <div className={styles.buttonSearch}>
          <Button
            type={ButtonTypes.Primary}
            title={<BiSearch />}
            onClick={handleSearchOpened}
            className={styles.searching}
          />
          {isLoggedIn ? (
            <Username username={"ELvira"} />
          ) : (
            <Button
              type={ButtonTypes.Primary}
              title={<BiUser />}
              onClick={onLoginButtonClick}
              className={styles.login}
            />
          )}
        </div>
      </div>
      <div className={styles.infoContainer}>
        <Outlet />

        <div className={styles.footer}>
          <div>©2022 Blogfolio</div>
          <div>All rights reserved</div>
        </div>
      </div>
      {isOpened && (
        <div className={styles.menuContainer}>
          <div>
            {isLoggedIn && <Username username={"Elvira"} />}
            {navLinks.map((link) => (
              <NavLink
                to={link.path}
                key={link.path}
                className={styles.navLinkButton}
              >
                {link.title}
              </NavLink>
            ))}
          </div>
          <div>
            <ThemeSwitcher />
            <Button
              type={ButtonTypes.Secondary}
              title={isLoggedIn ? "Log Out" : "Sign In"}
              onClick={onLoginButtonClick}
              className={styles.authButton}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
