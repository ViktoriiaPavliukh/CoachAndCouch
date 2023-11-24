// LanguageProvider.jsx
import { useDispatch, useSelector } from "react-redux";
import { IntlProvider } from "react-intl";
import {
  toggleLanguage,
  selectCurrentLanguage,
} from "@/redux/marketplace/languages/languageSlice.js";
import messages from "../defaults/translations/messages";

const LanguageProvider = ({ children }) => {
  const dispatch = useDispatch();
  const locale = useSelector(selectCurrentLanguage);

  console.log(locale);

  const switchLanguage = (newLocale) => {
    dispatch(toggleLanguage(newLocale));
  };

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      {children({ locale, switchLanguage })}
    </IntlProvider>
  );
};


export default LanguageProvider;

