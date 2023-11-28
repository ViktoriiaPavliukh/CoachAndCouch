import React from "react";
import { IntlProvider } from "react-intl";
// import { useSelector } from "react-redux";
// import { selectCurrentLanguage } from "@/redux/marketplace/languages/languageSlice.js";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/redux/store.js";
import LanguageProvider from "./components/LanguageProvider.jsx";
import messages from "./defaults/translations/messages";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <LanguageProvider>
            {({ locale }) => (
              <IntlProvider locale={locale} messages={messages[locale]}>
                <App />
              </IntlProvider>
            )}
          </LanguageProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
