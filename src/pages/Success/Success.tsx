import FormPagesContainer from "../../components/FormPageContainer";
import styles from "./Success.module.scss";

const Success = () => {
  return (
    <FormPagesContainer
      title={"Success"}
      btnTitle={"Go to home"}
      onSubmit={() => {
        ("");
      }}
    >
      <div className={styles.successMessage}>
        <span>{"Email confirmed."}</span>
        {"Your registration is now completed"}
      </div>
    </FormPagesContainer>
  );
};

export default Success;
