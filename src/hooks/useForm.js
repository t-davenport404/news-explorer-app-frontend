import { useState, useCallback } from "react";

export function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (event) => {
    const { target } = event;
    const { name, value, validationMessage } = target;

    setValues((prevValues) => ({ ...prevValues, [name]: value }));

    let errorMessage = validationMessage;
    if (name === "email" && !target.validity.valid) {
      errorMessage = "Invalid email address";
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  };

  const resetForm = useCallback(
    (newValues = initialValues, newErrors = {}, newIsFormValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsFormValid(newIsFormValid);
    },
    [initialValues],
  );

  return { values, handleChange, errors, isFormValid, setValues, resetForm };
}
