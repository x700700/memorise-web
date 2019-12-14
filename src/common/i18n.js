import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
    resources: {
        en: {
            translations: {
                "signin-title": "Sign In:",
                "signup-title": "Sign Up for Making Your Own Trainings:",
                "email": "Email",
                "nickname": "Nick Name",
                "password": "Password",
                "password2": "Re-Type Password",
                "signin-btn": "Sign In",
                "signup-btn": "Sign Up",
                "signup?": "Like Your Own Trainings?",
                "signin?": "Already on memoBool?",
                "signin-done": "Welcome",
                "err-requied-field": "Requied Field",
                "err-name-required": "Name is required",
                "err-name-valid": "Incorrect nick name",
                "err-email-required": "Email is required",
                "err-email-valid": "Incorrect email",
                "err-pass-required": "Password is required",
                "err-pass-valid": "Incorrect pssword",
                "err-pass2-required": "Re-Type Password",
                "err-pass2-valid": "Does not match Password",
                "err-signup-email-taken": "The Email is already taken",
                "err-signup-nick-taken": "The Nick Name is already taken",
                "err-signup-pass-match": "The passwords are not match",
                "err-auth": "Press the user icon to sign in!",
                "err-signin": "Incorrect nick name or password",
                "err-signup": "Email or Nick name are already in use",
                "err-signup-short": "Email/Name are taken",
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
                "delete this training": "Delete the entire Training",
                "err-game-too-small": "Add exercises to practice it",
                "err-exam-too-small": "Add exercises to be examined",
                "delete approval": "Delete Approval",
                "delete-training-approval": "Delete this Training Including all its Exercises?"
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
