import { priceOptions } from "@/defaults";
import { languagesSelector, specializationsSelector } from "@/redux/admin/adminSelector";
// import {
//   getCountries,
//   getLanguages,
//   getSpecializations,
// } from "@/redux/admin/operations";
import { Filter } from "../../components/Teachers/Filter";

// import { Filter } from "@mui/icons-material";
import { Stack } from "@mui/material";
// import { useEffect } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { selectCurrentLanguage } from "@/redux/marketplace/languages/languageSlice";
// import { getCountries, getLanguages, getSpecializations } from "@/redux/admin/operations";
// import { useEffect } from "react";
import countries from "../../defaults/countries/countries.json";

export function FilterTeacherPanel() {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getAdverts());
  //   dispatch(getLanguages());
  //   dispatch(getSpecializations());
  //   dispatch(getCountries());
  // }, [dispatch]);
  const intl = useIntl();
  const languages = useSelector(languagesSelector);
  // const countries = useSelector(countriesSelector);
  const specializations = useSelector(specializationsSelector);
  const en = useSelector(selectCurrentLanguage);
  console.log(en);
  return (
    <Stack
      direction="row"
      sx={{
        mb: { lg: "43px", md: "58px", xs: "36px" },
        display: "flex",
        maxWidth: {
          xs: "100%",
          md: "100%",
          sm: "500px",
          lg: "1200px",
        },
        justifyContent: "center",
        flexWrap: { xs: "wrap", lg: "wrap" },
        columnGap: { xs: "16px", md: "30px", lg: "24px" },
        rowGap: { xs: "16px", md: "20px" },
      }}
    >
      <Filter
        options={languages}
        typeoption={en == "en" ? "languageEn" : "languageUa"}
        keyfield="id"
        label={intl.formatMessage({ id: "language" })}
      />
      <Filter
        options={countries}
        typeoption={en == "en" ? "nameEng" : "nameShort"}
        label={intl.formatMessage({ id: "country" })}
      />
      <Filter options={priceOptions} typeoption="title" label={intl.formatMessage({ id: "price" })} />
      <Filter
        options={specializations}
        typeoption={en == "en" ? "specializationEn" : "specializationUa"}
        label={intl.formatMessage({ id: "specialization" })}
      />
    </Stack>
  );
}
