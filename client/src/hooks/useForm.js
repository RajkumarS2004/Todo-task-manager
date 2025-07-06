import { useState, useCallback } from 'react';
import { VALIDATION_RULES, ERROR_MESSAGES } from '../utils/constants';

export const useForm = (initialValues = {}, validationSchema = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form values
  const handleChange = useCallback((name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [errors]);

  // Handle input change events
  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    handleChange(name, inputValue);
  }, [handleChange]);

  // Mark field as touched
  const handleBlur = useCallback((name) => {
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  }, []);

  // Validate a single field
  const validateField = useCallback((name, value) => {
    const fieldRules = validationSchema[name];
    if (!fieldRules) return '';

    // Required validation
    if (fieldRules.required && (!value || value.toString().trim() === '')) {
      return ERROR_MESSAGES.REQUIRED_FIELD;
    }

    // Skip other validations if field is empty and not required
    if (!value || value.toString().trim() === '') {
      return '';
    }

    // Min length validation
    if (fieldRules.minLength && value.toString().length < fieldRules.minLength) {
      return `${name} must be at least ${fieldRules.minLength} characters`;
    }

    // Max length validation
    if (fieldRules.maxLength && value.toString().length > fieldRules.maxLength) {
      return `${name} must be less than ${fieldRules.maxLength} characters`;
    }

    // Pattern validation
    if (fieldRules.pattern && !fieldRules.pattern.test(value)) {
      return fieldRules.message || `Invalid ${name} format`;
    }

    // Email validation
    if (fieldRules.type === 'email' && !VALIDATION_RULES.EMAIL.PATTERN.test(value)) {
      return ERROR_MESSAGES.INVALID_EMAIL;
    }

    // Password validation
    if (fieldRules.type === 'password' && !VALIDATION_RULES.PASSWORD.PATTERN.test(value)) {
      return ERROR_MESSAGES.INVALID_PASSWORD;
    }

    // Custom validation function
    if (fieldRules.validate) {
      const customError = fieldRules.validate(value, values);
      if (customError) return customError;
    }

    return '';
  }, [validationSchema, values]);

  // Validate all fields
  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationSchema).forEach(fieldName => {
      const error = validateField(fieldName, values[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [validationSchema, values, validateField]);

  // Reset form
  const resetForm = useCallback((newValues = initialValues) => {
    setValues(newValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Set form values
  const setFormValues = useCallback((newValues) => {
    setValues(prev => ({
      ...prev,
      ...newValues
    }));
  }, []);

  // Set field error
  const setFieldError = useCallback((name, error) => {
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  }, []);

  // Set field value
  const setFieldValue = useCallback((name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  // Get field value
  const getFieldValue = useCallback((name) => {
    return values[name];
  }, [values]);

  // Check if field has error
  const hasError = useCallback((name) => {
    return !!(errors[name] && touched[name]);
  }, [errors, touched]);

  // Get field error
  const getFieldError = useCallback((name) => {
    return errors[name] || '';
  }, [errors]);

  // Check if form is valid
  const isValid = useCallback(() => {
    return Object.keys(errors).length === 0;
  }, [errors]);

  // Check if form is dirty (has changes)
  const isDirty = useCallback(() => {
    return JSON.stringify(values) !== JSON.stringify(initialValues);
  }, [values, initialValues]);

  // Handle form submission
  const handleSubmit = useCallback(async (onSubmit) => {
    setIsSubmitting(true);
    
    try {
      if (validateForm()) {
        await onSubmit(values);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [validateForm, values]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleInputChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFormValues,
    setFieldError,
    setFieldValue,
    getFieldValue,
    hasError,
    getFieldError,
    isValid,
    isDirty,
    validateField,
    validateForm,
  };
}; 