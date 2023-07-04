import classNames from "classnames";
import FormPagesContainer from "../../components/FormPageContainer";
import styles from "./RegistrationConfirmation.module.scss";
import { useThemeContext } from "../../context/Theme";
import { Theme } from "../../@types";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { activateUser } from "../../redux/reducers/authSlice";
import { RoutesList } from "../Router";

const RegistrationConfirmation = () => {
  const { themeValue } = useThemeContext();
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = () => {
    if (uid && token) {
      dispatch(
        activateUser({
          data: { uid, token },
          callback: () => navigate(RoutesList.SignIn),
        })
      );
    }
  };

  return (
    <FormPagesContainer
      title={"Registration Confirmation"}
      btnTitle={"Activate"}
      onSubmit={onSubmit}
    >
      <div
        className={classNames(styles.additionalInfo, {
          [styles.darkAdditionalInfo]: themeValue === Theme.Dark,
        })}
      >
        {"Please activate your account with clicking on button"}
      </div>
    </FormPagesContainer>
  );
};

export default RegistrationConfirmation;
