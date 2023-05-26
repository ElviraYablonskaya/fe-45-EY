import classNames from "classnames";
import styles from "./SignIn.module.scss";

export enum TitleType {
  SignIn = "Sign In",
}

type TitleProps = {
  type: TitleType;
};

const SignIn: React.FC<TitleProps> = ({ type }) => {
  const signInStyle = [styles.signIn, styles.title];
  return (
    <>
      <div className={classNames(signInStyle)}>
        <h2>{type}</h2>
      </div>
    </>
  );
};

export default SignIn;
