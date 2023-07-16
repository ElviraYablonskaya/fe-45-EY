import "./App.css";
import ThemeSwitcher from "./components/ThemeSwitcher/ThemeSwitcher";
import ThemeProvider from "./context/Theme/Provider";
import { Theme } from "./@types";
import Router from "./pages/Router";
import { useDispatch, useSelector } from "react-redux";
import { ThemeSelectors, setThemeValue } from "./redux/reducers/themeSlice";

function App() {
  const dispatch = useDispatch();
  const themeValue = useSelector(ThemeSelectors.getThemeValue);
  const onChangeTheme = (value: Theme) => () => {
    dispatch(setThemeValue(value));
  };
  return (
    <>
      <ThemeProvider themeValue={themeValue} onChangeTheme={onChangeTheme}>
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
