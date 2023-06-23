import { useState } from 'react';

export interface RegrexPattern {
    pattern: RegExp;
    errorMessage: string;
}

interface Field {
    value: any;
    required?: boolean;
    patterns?: RegrexPattern[];
}

export interface FormDefaultObjecType {
    [key: string]: Field;
}

interface FormErrors {
    [key: string]: string;
}

interface FormState {
    [key: string]: any;
}

export interface HandleFieldChangeProps {
    field: string;
    value: any;
}

/**
 * This is hook would be used for all form operations on the website. It checks required fields, regrex patterns and returns error messages accordingly.
 * It handles: Form validations; onChange and submit events.
 * Pass the FormDefaultObject, with each key having an object of: value, required and pattern.
 * @returns { formData, formErrors, handleFieldChange, validateForm};
 */
export const useFormValidator = (initialFormState: FormDefaultObjecType) => {
    const [formDataObject, setFormDataObject] = useState(initialFormState);
    const [formErrors, setFormErrors] = useState<FormErrors>({});

    const handleFieldChange = (newFields: HandleFieldChangeProps | HandleFieldChangeProps[]) => {
        const newFormErrors: FormErrors = {};
        const newFieldsObj: { [key: string]: Field } = {};
        const handleChange = ({ field, value }: HandleFieldChangeProps) => {
            newFieldsObj[field] = {
                ...formDataObject[field],
                value
            };
            const fieldCase = formDataObject[field];
            fieldCase?.patterns &&
                fieldCase?.patterns?.length > 0 &&
                value &&
                fieldCase?.patterns.forEach((pattern) => {
                    if (!pattern?.pattern.test(value)) newFormErrors[field] = pattern?.errorMessage;
                });
            setFormErrors({ ...formErrors, [field]: newFormErrors[field] || '' });
        };

        if (Array.isArray(newFields)) {
            newFields.forEach((each) => {
                handleChange(each);
            });
        } else {
            handleChange(newFields);
        }
        setFormDataObject({ ...formDataObject, ...newFieldsObj });
    };

    const validateForm = (fieldsToCheck: string[] = []) => {
        const newFormErrors: FormErrors = {};

        const validatePatterns = (field: Field, fieldName: string) => {
            field?.patterns &&
                field?.patterns.forEach((pattern) => {
                    if (!pattern?.pattern.test(field.value)) newFormErrors[fieldName] = pattern.errorMessage;
                });
        };

        const checkRequiredFields = (field: Field, fieldName: string) => {
            if (field.required && !field.value) newFormErrors[fieldName] = 'This field is required.';
        };

        for (const fieldName in formDataObject) {
            const field = formDataObject[fieldName];
            if (fieldsToCheck.length > 0) {
                if (fieldsToCheck.includes(fieldName)) {
                    checkRequiredFields(field, fieldName);
                    if (field?.patterns && field?.value) validatePatterns(field, fieldName);
                }
            } else {
                checkRequiredFields(field, fieldName);
                if (field?.patterns && field?.value) validatePatterns(field, fieldName);
            }
        }

        setFormErrors(newFormErrors);
        const passed = Object.keys(newFormErrors).length === 0;
        return passed;
    };

    const getFormState = (initialFormState: FormDefaultObjecType): FormState => {
        const newFormObject: FormState = {};
        for (const fieldName in initialFormState) {
            const field = initialFormState[fieldName];
            newFormObject[fieldName] = field.value;
        }
        return newFormObject;
    };

    const clearFormData = () => {
        setFormDataObject({ ...initialFormState });
    };

    const formData = getFormState(formDataObject);

    return { formData, formErrors, handleFieldChange, validateForm, clearFormData };
};