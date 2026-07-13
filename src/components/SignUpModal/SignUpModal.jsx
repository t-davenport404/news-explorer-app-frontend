import { useForm } from "../../hooks/useForm";
import { useEffect } from "react";
import Modal from "../Modal/Modal";

const defaultValues = {
  email: "",
  password: "",
  name: "",
};

const SignUpModal = ({ isOpen, handleRegister, handleLoginClick, onClose }) => {
  const { values, handleChange, errors, resetForm, isFormValid } =
    useForm(defaultValues);
  /* eslint-disable no-unused-vars */
  const { email, password, name } = values;
  /* eslint-enable no-unused-vars */
  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  function handleSubmit(evt) {
    evt.preventDefault();
    handleRegister(values);
  }

  return (
    <Modal
      title="Sign up"
      name="registration"
      buttonText="Sign up"
      secondButtonText="or Sign in"
      onSecondaryAction={handleLoginClick}
      onClose={onClose}
      isOpen={isOpen}
      hasForm={true}
      disabled={!isFormValid}
      onSubmit={handleSubmit}
      footerRedirect={
        <div className="modal__redirect-container">
          <span className="modal__redirect-text">or </span>
          <button
            type="button"
            className="modal__redirect-link"
            onClick={handleLoginClick}
          >
            Sign in
          </button>
        </div>
      }
    >
      <label htmlFor="register-email" className="modal__label">
        Email
        <input
          type="email"
          name="email"
          className="modal__input"
          id="register-email"
          placeholder="Enter email"
          required
          value={values.email}
          onChange={handleChange}
        />
        <span className="modal__error">{errors.email}</span>
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password
        <input
          type="password"
          name="password"
          className="modal__input"
          id="register-password"
          placeholder="Enter password"
          required
          minLength="8"
          value={values.password}
          onChange={handleChange}
          autoComplete="new-password"
        />
        <span className="modal__error">{errors.password}</span>
      </label>
      <label htmlFor="register-name" className="modal__label">
        Username
        <input
          type="text"
          name="name"
          className="modal__input"
          id="register-name"
          placeholder="Enter your username"
          required
          minLength="1"
          maxLength="30"
          value={values.name}
          onChange={handleChange}
        />
        <span className="modal__error">{errors.name}</span>
      </label>
    </Modal>
  );
};

export default SignUpModal;
