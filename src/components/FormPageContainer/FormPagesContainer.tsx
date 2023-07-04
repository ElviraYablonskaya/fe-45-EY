import { FC, ReactElement } from "react";

import Title from "../Title";
import styles from "./FormPagesContainer.module.scss";
import Button, { ButtonTypes } from "../Button";
import classNames from "classnames";
import { useThemeContext } from "../../context/Theme";
import { Theme } from "../../@types";

type FormPagesContainerProps = {
  title: string;
  children: ReactElement | ReactElement[];
  btnTitle: string;
  onSubmit: () => void;
  additionalInfo?: ReactElement;
};

const FormPagesContainer: FC<FormPagesContainerProps> = ({
  title,
  children,
  btnTitle,
  onSubmit,
  additionalInfo,
}) => {
  const { themeValue } = useThemeContext();

  return (
    <div
      className={classNames(styles.container, {
        [styles.darkContainer]: themeValue === Theme.Dark,
      })}
    >
      <div
        className={classNames(styles.breadcrumbs, {
          [styles.darkBackToHome]: themeValue === Theme.Dark,
        })}
      >
        Back to home
      </div>
      <Title title={title} />
      <div className={styles.formContainer}>
        <div className={styles.fieldsContainer}>{children}</div>
        <Button
          type={ButtonTypes.Primary}
          title={btnTitle}
          onClick={onSubmit}
          className={styles.button}
        />
        <div>{additionalInfo}</div>
      </div>
    </div>
  );
};

export default FormPagesContainer;