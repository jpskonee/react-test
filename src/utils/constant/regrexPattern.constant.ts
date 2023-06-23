export const validationCases = {
    maxLength: (maxLength = 50) => {
        return {
            pattern: new RegExp(`^.{0,${maxLength}}$`),
            errorMessage: `Text can not be longer than ${maxLength} characters.`
        };
    },
    minLength: (minLength = 0) => {
        return {
            pattern: new RegExp(`^.{${minLength},}$`),
            errorMessage: `Please enter at least ${minLength} characters.`
        };
    },
    alphaNumeric: {
        pattern: /^([a-zA-Z0-9 ])+$/,
        errorMessage: 'Please enter Alphanumerics Only.'
    },
};