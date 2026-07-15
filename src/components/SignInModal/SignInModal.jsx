import { useForm } from "../../hooks/useForm";
import { useEffect } from "react";
import Modal from "../Modal/Modal";

const defaultValues = {
  email: "",
  password: "",
};

const SignInModal = ({ isOpen, handleLogin, handleSignUpClick, onClose }) => {
  const { values, handleChange, errors, resetForm, isFormValid } =
    useForm(defaultValues);

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  function handleSubmit(evt) {
    evt.preventDefault();
    handleLogin(values);
  }

  return (
    <Modal
      title="Sign in"
      name="login"
      buttonText="Sign in"
      onClose={onClose}
      isOpen={isOpen}
      hasForm={true}
      buttonText="Sign in"
      disabled={!isFormValid}
      onSubmit={handleSubmit}
      footerRedirect={
        <div className="modal__redirect-container">
          <span className="modal__redirect-text">or </span>
          <button
            type="button"
            className="modal__redirect-link"
            onClick={handleSignUpClick}
          >
            Sign up
          </button>
        </div>
      }
    >
      <label htmlFor="login-email" className="modal__label">
        Email
        <input
          type="email"
          name="email"
          className="modal__input"
          id="login-email"
          placeholder="Enter email"
          required
          value={values.email}
          onChange={handleChange}
        />
      </label>
      <span className="modal__error">{errors.email}</span>
      <label htmlFor="login-password" className="modal__label">
        Password
        <input
          type="password"
          name="password"
          className="modal__input"
          id="login-password"
          placeholder="Enter password"
          required
          minLength="8"
          value={values.password}
          onChange={handleChange}
        />
      </label>
      <span className="modal__error">{errors.password}</span>
    </Modal>
  );
};

export default SignInModal;
