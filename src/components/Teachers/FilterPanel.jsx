import { priceOptions } from "@/defaults";
import {
  countriesSelector,
  languagesSelector,
  specializationsSelector,
} from "@/redux/admin/adminSelector";

import { Filter } from "../../components/Teachers/Filter";
import { Stack } from "@mui/material";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { selectCurrentLanguage } from "@/redux/marketplace/languages/languageSlice";

import countriesJSON from "../../defaults/countries/countries.json";
import countriesCase from "@/helpers/countriesCase";
import { useState } from "react";
import { PropTypes } from "prop-types";

export function FilterTeacherPanel({ onFiltersChange }) {
  const [selectedFilters, setSelectedFilters] = useState();

  const intl = useIntl();
  const languages = useSelector(languagesSelector);
  const countries = useSelector(countriesSelector);
  const specializations = useSelector(specializationsSelector);
  const en = useSelector(selectCurrentLanguage);
  const handleFilterChange = (filterType, selectedValue) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: selectedValue,
    }));
    // onFiltersChange(selectedFilters);
  };

  // useEffect(() => {
  //   console.log(selectedFilters);
  // }, [selectedFilters, onFiltersChange]);

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
        onFilterChange={(selectedValue) =>
          handleFilterChange("language", selectedValue)
        }
        // onFilterChange={(selectedValue) =>
        //   setSelectedFilters((prevFilters) => ({
        //     ...prevFilters,
        //     language: selectedValue,
        //   }))
        // }
      />
      <Filter
        options={[...countries].map((el) => ({
          id: el.id,
          alpha2: el.alpha2,
          nameEng: countriesCase(
            countriesJSON.find((elJSON) => elJSON.alpha2 == el.alpha2).nameEng
          ),
          nameShort: countriesCase(
            countriesJSON.find((elJSON) => elJSON.alpha2 == el.alpha2).nameShort
          ),
        }))}
        typeoption={en == "en" ? "nameEng" : "nameShort"}
        label={intl.formatMessage({ id: "country" })}
        onFilterChange={(selectedValue) =>
          handleFilterChange("country", selectedValue)
        }

        // onFilterChange={(selectedValue) =>
        //   setSelectedFilters((prevFilters) => ({
        //     ...prevFilters,
        //     country: selectedValue,
        //   }))
        // }
      />
      <Filter
        options={priceOptions}
        typeoption="title"
        label={intl.formatMessage({ id: "price" })}
        onFilterChange={(selectedValue) =>
          handleFilterChange("price", selectedValue)
        }

        // onFilterChange={(selectedValue) =>
        //   setSelectedFilters((prevFilters) => ({
        //     ...prevFilters,
        //     price: selectedValue,
        //   }))
        // }
      />
      <Filter
        options={specializations}
        typeoption={en == "en" ? "specializationEn" : "specializationUa"}
        label={intl.formatMessage({ id: "specialization" })}
        onFilterChange={(selectedValue) =>
          handleFilterChange("specialization", selectedValue)
        }

        // onFilterChange={(selectedValue) =>
        //   setSelectedFilters((prevFilters) => ({
        //     ...prevFilters,
        //     specialization: selectedValue,
        //   }))
        // }
      />
    </Stack>
  );
}

FilterTeacherPanel.propTypes = {
  onFiltersChange: PropTypes.func,
};
