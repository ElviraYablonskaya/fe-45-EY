import { useState } from "react";
import FormPagesContainer from "../../components/FormPageContainer/FormPagesContainer";
import styles from "./SignIn.module.scss";
import Input from "../../components/Input/Input";
import classNames from "classnames";
import { useThemeContext } from "../../context/Theme";
import { Theme } from "../../@types";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { themeValue } = useThemeContext();
  return (
    <FormPagesContainer
      title={"Sign In"}
      btnTitle={"Sign In"}
      onSubmit={() => {
        ("");
      }}
      additionalInfo={
        <div
          className={classNames(styles.additionalInfo, {
            [styles.darkAdditionalInfo]: themeValue === Theme.Dark,
          })}
        >
          {"Don't have an account?"}
          <span
            className={classNames(styles.signIn, {
              [styles.darkSignUp]: themeValue === Theme.Dark,
            })}
          >
            Sign Up
          </span>
        </div>
      }
    >
      <Input
        title={"Email"}
        placeholder={"Your email"}
        onChange={setEmail}
        value={email}
      />
      <Input
        title={"Password"}
        placeholder={"Your password"}
        onChange={setPassword}
        value={password}
      />
      <div
        className={classNames(styles.forgotPassword, {
          [styles.darkForgotPassword]: themeValue === Theme.Dark,
        })}
      >
        <span>Forgot Password?</span>
      </div>
    </FormPagesContainer>
  );
};

export default SignIn;
