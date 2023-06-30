import classNames from "classnames";
import FormPagesContainer from "../../components/FormPageContainer";
import styles from "./Success.module.scss";
import { useThemeContext } from "../../context/Theme";
import { Theme } from "../../@types";

const Success = () => {
  const { themeValue } = useThemeContext();

  return (
    <FormPagesContainer
      title={"Success"}
      btnTitle={"Go to home"}
      onSubmit={() => {
        ("");
      }}
    >
      <div
        className={classNames(styles.successMessage, {
          [styles.darkSuccessMessage]: themeValue === Theme.Dark,
        })}
      >
        <span>{"Email confirmed."}</span>
        {"Your registration is now completed"}
      </div>
    </FormPagesContainer>
  );
};

export default Success;
