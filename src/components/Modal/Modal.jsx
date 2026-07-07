import "./Modal.css";
import closeModalBtn from "../../assets/close.svg";

function Modal({
  isOpen,
  onClose,
  title,
  children,
  name,
  hasForm = false,
  buttonText = "Save",
  onSubmit,
  disabled,
  footerRedirect,
}) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div
        className={`modal__content modal__content_type_${hasForm ? "form" : "popup"}`}
      >
        <button type="button" onClick={onClose} className="modal__close">
          <img src={closeModalBtn} alt="close" className="modal__close-icon" />
        </button>
        {title && <h2 className="modal__title">{title}</h2>}
        {hasForm ? (
          <form onSubmit={onSubmit} className="modal__form" name={name}>
            {children}
            <div className="modal__button-container">
              <button
                type="submit"
                className={`modal__submit ${disabled ? "modal__submit_disabled" : ""}`}
                disabled={disabled}
              >
                {buttonText}
              </button>
            </div>
            {footerRedirect}
          </form>
        ) : (
          <div className="modal__body">
            {children}
            {footerRedirect}
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
