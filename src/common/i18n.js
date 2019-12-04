import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
    resources: {
        en: {
            translations: {
                "hello": "Hello",
                "practice": "Practice",
                "exam": "Exam",
                "replay": "Re-Play",
                "flip-deck-side": "Flip deck side",
                "cards played": "cards played",
                "misses": "misses",
                "Score": "Score:",
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
