import type { BaseTranslation } from "../i18n-types";

const login = {
    input: {
        id: {
            placeholder: "ID (27th_Name)",
        },
        password: {
            placeholder: "Password",
        },
        name: {
            placeholder: "Enter your name",
            empty: "The name is empty",
            tooLongError: "Name is too long",
            notValidError: "Incorrect name format",
        },
    },
    error: {
        invalid: "Invalid ID or Password",
    },
    genericError: "An error occurred",
    terms: "By continuing, you are agreeing our {links}.",
    termsOfUse: "terms of use",
    privacyPolicy: "privacy policy",
    cookiePolicy: "cookie policy",
    continue: "Continue",
};

export default login;
