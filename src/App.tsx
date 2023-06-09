import { useState } from "react";
import "./App.css";
import ThemeSwitcher from "./components/ThemeSwitcher/ThemeSwitcher";
import ThemeProvider from "./context/Theme/Provider";
//import SignUp from "./pages/SignUp/SignUp";
import { Theme } from "./@types";
//import Home from "./pages/Home";
//import SignIn from "./pages/SignIn/SignIn";
//import RegistrationConfirmation from "./pages/RegistrationConfirmation";
import SelectedPost from "./pages/SelectedPost/SelectedPost";
//import Success from "./pages/Success";

function App() {
  const [themeValue, setThemeValue] = useState<Theme>(Theme.Light);

  const onChangeTheme = (value: Theme) => () => {
    setThemeValue(value);
  };
  return (
    <>
      <ThemeProvider themeValue={themeValue} onChangeTheme={onChangeTheme}>
        {/* <Home /> */}
        {/* <Success /> */}
        {/* <SignIn /> */}
        {/* <SignUp /> */}
        {/* <RegistrationConfirmation /> */}
        <SelectedPost
          title="Astronauts prep for new solar arrays on nearly seven-hour spacewalk"
          image="https://images.unsplash.com/photo-1494022299300-899b96e49893?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          description="Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.
      During the final days of Alice Neel’s blockbuster solo show at the Metropolitan Museum of Art this summer, the line into the exhibition spanned the length of the museum’s European paintings corridor, and the wait was over half an hour. Titled “People Come First,” the show featured more than 100 gritty cityscapes, domestic interiors, and stripped-down portraits of Neel’s neighbors, friends, and fellow artists in the largest-ever showing of her work in her hometown of New York City.
      The stories tracked Hambling’s trailblazing career while focusing on her current and upcoming projects. The artist’s installation Relic (2021), produced alongside sound recordist Chris Watson, was recently on view at Snape Maltings in London. Meanwhile, this October, portraits by Hambling will be presented at the Italian gallery Thomas Brambilla. The artist’s “Wave Series” is also currently being exhibited in the group show “Summer Exhibition” at Marlborough London, which runs through September 10th.
      The excitement surrounding this exhibition delighted longtime fans of the expressive painter while inspiring a legion of new devotees—a trend matched by Neel’s strengthening position in the art market, especially in the past year. In May, Neel’s 1966 canvas Dr. Finger’s Waiting Room roused a flurry of bids from the United States, Asia, and Europe at Christie’s New York, where it ultimately sold for just over $3 million, breaking both its high estimate and the artist’s auction record. Just hours earlier at Sotheby’s New York, Neel’s double portrait Henry and Sally Hope (1977), depicting an art historian and his wife, sold for just under $1.6 million, notching her third-highest auction result.
      The demand for Maggi Hambling’s evocative portraits and exuberant depictions of seascapes and landscapes surged this past week, when the number of collectors inquiring on her work increased more than tenfold from the week before. The British artist, esteemed for her whirling, gestural paintings and bold public sculptures, has seen a consistent wave of interest in her work that has accelerated in the past few years. This recent uptick in interest  is consistent with Hambling’s career trajectory, which has been punctuated by a flurry of public commissions, institutional recognition, and secondary-market demand."
        />
        <ThemeSwitcher />
      </ThemeProvider>
    </>
  );
}

export default App;
