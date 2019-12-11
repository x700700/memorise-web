import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
    resources: {
        en: {
            translations: {
                "signin-title": "Sign In:",
                "signup-title": "Sign Up for More Trainings:",
                "email": "Email",
                "nickname": "Nick Name",
                "password": "Password",
                "repassword": "Re-Type Password",
                "signin-btn": "Sign In",
                "signup-btn": "Sign Up",
                "signup?": "Like Your Own Trainings?",
                "signin?": "Already on memoBool?",
                "signin-done": "Welcome",
                "err-requied-field": "Requied Field",
                "err-name-required": "Name is required",
                "err-name-valid": "Name mustn't include spaces",
                "err-email": "Wrong email",
                "err-pass": "Password min length is 6",
                "err-signin-failed": "Wrong nick name or password",
                "err-signup-email-taken": "The Email is already taken",
                "err-signup-nick-taken": "The Nick Name is already taken",
                "err-signup-pass-match": "The passwords are not match",
                "hello": "Hello",
                "practice": "Practice",
                "exam": "Exam",
                "replay": "Re-Play",
                "cards num to practice": "Number Of Cards to Practice",
                "questions num for exam": "Number Of Questions for The Exam",
                "flip-deck-side": "Flip Deck Side",
                "flip-exam-side": "Flip Exam's Q/A",
                "cards played": "cards played",
                "misses": "misses",
                "questions answered right": "questions were answered right",
                "Score": "Score",
                "Local storage was cleaned": "Local storage was cleaned",
                "edit exercise": "Edit Exercise Q/A",
                "save": "Save",
                "cancel": "Cancel",
                "delete": "Delete",
                "delete training": "Delete Training",
                "are u sure": "Deleting the Training will delete ALL the Exercises included!",
            }
        },
        jap: {
            translations: {
                "hello": "利点",
            }
        },
    },
    fallbackLng: "en",
    debug: true,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
        escapeValue: false, // not needed for react!!
        formatSeparator: ","
    },

    react: {
        wait: true
    }
});

export default i18n;
