import { priceOptions } from "@/defaults";
import {
  countriesSelector,
  languagesSelector,
  specializationsSelector,
} from "@/redux/admin/adminSelector";
import { Filter } from "../../components/Teachers/Filter";
import { Button, Stack, Box } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { selectCurrentLanguage } from "@/redux/marketplace/languages/languageSlice";
import countriesJSON from "../../defaults/countries/countries.json";
import countriesCase from "@/helpers/countriesCase";
import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
const initialState = {
  language: "",
  country: "",
  price: "",
  specialization: "",
};
export function FilterTeacherPanel({ onFiltersChange }) {
  const [selectedFilters, setSelectedFilters] = useState(initialState);
  const intl = useIntl();
  const languages = useSelector(languagesSelector);
  const countries = useSelector(countriesSelector);
  const specializations = useSelector(specializationsSelector);
  const en = useSelector(selectCurrentLanguage);
  useEffect(() => {
    onFiltersChange(selectedFilters);
  }, [selectedFilters]);

  const handleFilterChange = (filterType, selectedValue) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: selectedValue,
    }));
  };

  const handleResetFilter = () => {
    setSelectedFilters(initialState);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: {xs: "column", lg:"row"},
        gap: { xs: "16px", md: "20px" },
        mb: { lg: "43px", md: "58px", xs: "36px" },
      }}
    >
      <Stack
        direction="row"
        sx={{
          display: "flex",
          maxWidth: {
            xs: "100%",
          },
          justifyContent: "center",
          flexWrap: { xs: "wrap", lg: "wrap" },
          columnGap: { md: "40px", xl: "39px" },
          rowGap: { xs: "16px", md: "20px" },
        }}
      >
        <Filter
          options={languages}
          typeoption={en == "en" ? "languageEn" : "languageUa"}
          keyfield="id"
          label={
            selectedFilters.language === ""
              ? intl.formatMessage({ id: "language" })
              : ""
          }
          onFilterChange={(selectedValue) =>
            handleFilterChange("language", selectedValue)
          }
          currentInputId={selectedFilters.language}
        />
        <Filter
          options={countries.map((el) => {
            const countryJSON =
              countriesJSON.find((elJSON) => elJSON.alpha2 === el.alpha2) || {};
            return {
              id: el.id,
              alpha2: el.alpha2,
              nameEng: countryJSON.nameEng || "",
              nameShort: countriesCase(countryJSON.nameShort || ""),
            };
          })}
          typeoption={en === "en" ? "nameEng" : "nameShort"}
          label={
            selectedFilters.country === ""
              ? intl.formatMessage({ id: "country" })
              : ""
          }
          onFilterChange={(selectedValue) =>
            handleFilterChange("country", selectedValue)
          }
          currentInputId={selectedFilters.country}
        />
        <Filter
          options={priceOptions}
          typeoption="title"
          label={
            selectedFilters.price === ""
              ? intl.formatMessage({ id: "price" })
              : ""
          }
          onFilterChange={(selectedValue) =>
            handleFilterChange("price", selectedValue)
          }
          currentInputId={selectedFilters.price}
        />
        <Filter
          options={specializations}
          typeoption={en == "en" ? "specializationEn" : "specializationUa"}
          label={
            selectedFilters.specialization === ""
              ? intl.formatMessage({ id: "specialization" })
              : ""
          }
          onFilterChange={(selectedValue) =>
            handleFilterChange("specialization", selectedValue)
          }
          currentInputId={selectedFilters.specialization}
        />
      </Stack>
      <Button onClick={handleResetFilter}>
        <RestartAltIcon
          fontSize="large"
          sx={{
            transition: "background-color 0.3s",
            color: (theme) => theme.palette.buttonColor.greenYellow,
            "&:hover": {
              color: (theme) => theme.palette.buttonColor.greenYellowHover,
            },
          }}
        />
      </Button>
    </Box>
  );
}

FilterTeacherPanel.propTypes = {
  onFiltersChange: PropTypes.func.isRequired,
};
