// import FormPagesContainer from "src/components/FormPageContainer";

import classNames from "classnames";
import FormPagesContainer from "../../components/FormPageContainer";
import styles from "./RegistrationConfirmation.module.scss";
import { useThemeContext } from "../../context/Theme";
import { Theme } from "../../@types";

const RegistrationConfirmation = () => {
  const { themeValue } = useThemeContext();

  return (
    <FormPagesContainer
      title={"Registration Confirmation"}
      btnTitle={"Go to home"}
      onSubmit={() => {}}
    >
      <div className={classNames(styles.additionalInfo, {
        [styles.darkAdditionalInfo]:themeValue === Theme.Dark
      })}>
        {
          "Please activate your account with the activation link in the email example@gmail.com.\n Please, check your email"
        }
      </div>
    </FormPagesContainer>
  );
};

export default RegistrationConfirmation;