import SignIn, { TitleType } from "./Components/SignIn";

const App: React.FC = () => {
  return (
    <>
      <div>
        <SignIn type={TitleType.SignIn} />
      </div>
    </>
  );
};

export default App;
