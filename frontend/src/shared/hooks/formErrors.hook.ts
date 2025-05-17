import { useState } from "react";

export type FieldError<T extends string> = Record<T, string | null>;

export const useFieldErrors = <T extends string>(initialFields: T[]) => {
  const initialState = Object.fromEntries(
    initialFields.map((f) => [f, null])
  ) as FieldError<T>;
  const [errors, setErrors] = useState<FieldError<T>>(initialState);

  const setFieldError = (field: T, message: string) => {
    setErrors((prev) => ({
      ...prev,
      [field]: message,
    }));
  };

  const clearFieldError = (field: T) => {
    setErrors((prev) => ({
      ...prev,
      [field]: null,
    }));
  };

  const clearAllErrors = () => {
    setErrors(initialState);
  };

  return {
    errors,
    setFieldError,
    clearFieldError,
    clearAllErrors,
  };
};
