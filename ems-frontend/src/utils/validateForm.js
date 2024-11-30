export const validateForm = (fields, rules, setErrors) => {
    let valid = true;
    const errorsCopy = {};

    Object.keys(rules).forEach((field) => {
        const value = String(fields[field] || '').trim(); // Ensure value is always a string
        const rule = rules[field];

        if (!value) {
            errorsCopy[field] = rule.errorMessage || `${field} is required`;
            valid = false;
        } else {
            errorsCopy[field] = '';
        }
    });

    setErrors(errorsCopy);
    return valid;
};
