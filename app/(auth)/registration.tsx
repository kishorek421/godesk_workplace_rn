import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text } from "react-native";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { ConfigurationModel } from "@/models/configurations";
import api from "@/services/api";
import {
  GET_AREAS,
  GET_CITIES,
  GET_CONFIGURATIONS_BY_CATEGORY,
  GET_COUNTRIES,
  GET_PINCODES,
  GET_STATES,
} from "@/constants/api_endpoints";
import {
  CATEGORY_OF_ORG,
  SIZE_OF_ORG,
  TYPE_OF_ORG,
} from "@/constants/configuration_keys";
import ConfigurationSelect from "@/components/ConfigurationSelect";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import {
  AreaListItemModel,
  CityListItemModel,
  CountryListItemModel,
  PincodeListItemModel,
  StateListItemModel,
} from "@/models/geolocations";
import CustomSelect from "@/components/CustomSelect";
import { DropdownModel } from "@/models/common";
import { Button, ButtonText } from "@/components/ui/button";

const RegistrationScreen = () => {
  // options
  // configurations
  const [typesOfOrg, setTypesOfOrg] = useState<ConfigurationModel[]>([]);
  const [categoriesOfOrg, setCategoriesOfOrg] = useState<ConfigurationModel[]>(
    [],
  );
  const [sizesOfOrg, setSizesOfOrg] = useState<ConfigurationModel[]>([]);
  // geolocations
  const [pincodes, setPincodes] = useState<PincodeListItemModel[]>([]);
  const [areas, setAreas] = useState<AreaListItemModel[]>([]);
  const [cities, setCities] = useState<CityListItemModel[]>([]);
  const [states, setStates] = useState<StateListItemModel[]>([]);
  const [countries, setCountries] = useState<CountryListItemModel[]>([]);

  // selected options
  // configurations
  const [selectedTypeOfOrg, setSelectedTypeOfOrg] =
    useState<ConfigurationModel>({});
  const [selectedCategoryOfOrg, setSelectedCategoryOfOrg] =
    useState<ConfigurationModel>({});
  const [selectedSizeOfOrg, setSelectedSizeOfOrg] =
    useState<ConfigurationModel>({});
  // geolocations
  const [selectedPincode, setSelectedPincode] = useState<DropdownModel>();
  const [selectedArea, setSelectedArea] = useState<DropdownModel>();
  const [selectedCity, setSelectedCity] = useState<DropdownModel>();
  const [selectedState, setSelectedState] = useState<DropdownModel>();
  const [selectedCountry, setSelectedCountry] = useState<DropdownModel>();

  useEffect(() => {
    const loadTypesOfOrg = () => {
      api
        .get(GET_CONFIGURATIONS_BY_CATEGORY, {
          params: {
            category: TYPE_OF_ORG,
          },
        })
        .then((response) => {
          setTypesOfOrg(response.data?.data ?? []);
        })
        .catch((e) => {
          console.error(e);
        });
    };
    const loadCategoriesOfOrg = () => {
      api
        .get(GET_CONFIGURATIONS_BY_CATEGORY, {
          params: {
            category: CATEGORY_OF_ORG,
          },
        })
        .then((response) => {
          setCategoriesOfOrg(response.data?.data ?? []);
        })
        .catch((e) => {
          console.error(e);
        });
    };
    const loadSizesOfOrg = () => {
      api
        .get(GET_CONFIGURATIONS_BY_CATEGORY, {
          params: {
            category: SIZE_OF_ORG,
          },
        })
        .then((response) => {
          setSizesOfOrg(response.data?.data ?? []);
        })
        .catch((e) => {
          console.error(e);
        });
    };
    // geolocations
    const loadPincodes = () => {
      api
        .get(GET_PINCODES)
        .then((response) => {
          setPincodes(response.data?.data ?? []);
        })
        .catch((e) => {
          console.error(e);
        });
    };
    const loadAreas = () => {
      api
        .get(GET_AREAS)
        .then((response) => {
          setAreas(response.data?.data ?? []);
        })
        .catch((e) => {
          console.error(e);
        });
    };
    const loadCities = () => {
      api
        .get(GET_CITIES)
        .then((response) => {
          setCities(response.data?.data ?? []);
        })
        .catch((e) => {
          console.error(e);
        });
    };
    const loadStates = () => {
      api
        .get(GET_STATES)
        .then((response) => {
          setStates(response.data?.data ?? []);
        })
        .catch((e) => {
          console.error(e);
        });
    };
    const loadCountries = () => {
      api
        .get(GET_COUNTRIES)
        .then((response) => {
          setCountries(response.data?.data ?? []);
        })
        .catch((e) => {
          console.error(e);
        });
    };
    loadTypesOfOrg();
    loadCategoriesOfOrg();
    loadSizesOfOrg();
    // geolocations
    loadPincodes();
    loadAreas();
    loadCities();
    loadStates();
    loadCountries();
  }, []);

  const setSelectedGeolocations = (type: string, e: any) => {
    console.log("e", e);
    switch (type) {
      case "pincode":
        let selectedPincode = pincodes.find((pincode) => pincode.id === e);
        setSelectedPincode({
          label: selectedPincode?.pincode?.toString(),
          value: selectedPincode?.id,
        });
        break;
      case "area":
        let selectedArea = areas.find((area) => area.id === e);
        setSelectedArea({
          label: selectedArea?.areaName,
          value: selectedArea?.id,
        });
        break;
      case "city":
        let selectedCity = cities.find((city) => city.id === e);
        setSelectedCity({
          label: selectedCity?.cityName,
          value: selectedCity?.id,
        });
        break;
      case "state":
        let selectedState = states.find((state) => state.id === e);
        setSelectedState({
          label: selectedState?.stateName,
          value: selectedState?.id,
        });
        break;
      case "country":
        let selectedCountry = countries.find((country) => country.id === e);
        setSelectedCountry({
          label: selectedCountry?.countryName,
          value: selectedCountry?.id,
        });
        break;
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Box className="p-4 mt-3">
          <VStack>
            <Text className="text-2xl font-bold">Launch your experience</Text>
            <Text className="color-gray-400 text-sm mt-1">
              Let's explore more about you
            </Text>
            <Text className="font-bold text-lg mt-8">Profile Details</Text>
            <VStack className="gap-4 mt-3">
              <FormControl>
                <FormControlLabel className="mb-1">
                  <FormControlLabelText>First Name</FormControlLabelText>
                </FormControlLabel>
                <Input variant="outline" size="md">
                  <InputField placeholder="Enter here" />
                </Input>
              </FormControl>
              <FormControl>
                <FormControlLabel className="mb-1">
                  <FormControlLabelText>Last Name</FormControlLabelText>
                </FormControlLabel>
                <Input variant="outline" size="md">
                  <InputField placeholder="Enter here" />
                </Input>
              </FormControl>
              <FormControl>
                <FormControlLabel className="mb-1">
                  <FormControlLabelText>Email</FormControlLabelText>
                </FormControlLabel>
                <Input variant="outline" size="md">
                  <InputField placeholder="customer@business.com" />
                </Input>
              </FormControl>
              <FormControl>
                <FormControlLabel className="mb-1">
                  <FormControlLabelText>Mobile No.</FormControlLabelText>
                </FormControlLabel>
                <Input variant="outline" size="md">
                  <InputField placeholder="Enter here" />
                </Input>
              </FormControl>
              <FormControl>
                <FormControlLabel className="mb-1">
                  <FormControlLabelText>
                    Alternate Mobile No.
                  </FormControlLabelText>
                </FormControlLabel>
                <Input variant="outline" size="md">
                  <InputField placeholder="Enter here" />
                </Input>
              </FormControl>
            </VStack>
            <Text className="font-bold text-lg mt-8">Organization Details</Text>
            <VStack className="gap-4 mt-3">
              <FormControl>
                <FormControlLabel className="mb-1">
                  <FormControlLabelText>Organization Name</FormControlLabelText>
                </FormControlLabel>
                <Input variant="outline" size="md">
                  <InputField placeholder="Enter here" />
                </Input>
              </FormControl>
              <FormControl>
                <FormControlLabel className="mb-1">
                  <FormControlLabelText>
                    Organization Mobile No.
                  </FormControlLabelText>
                </FormControlLabel>
                <Input variant="outline" size="md">
                  <InputField placeholder="Enter here" />
                </Input>
              </FormControl>
              <FormControl>
                <FormControlLabel className="mb-1">
                  <FormControlLabelText>
                    Type of organization
                  </FormControlLabelText>
                </FormControlLabel>
                <ConfigurationSelect
                  options={typesOfOrg}
                  selectedConfig={selectedTypeOfOrg}
                  setSelectedConfig={setSelectedTypeOfOrg}
                  placeholder="Select type"
                />
              </FormControl>
              <FormControl>
                <FormControlLabel className="mb-1">
                  <FormControlLabelText>
                    Category of organization
                  </FormControlLabelText>
                </FormControlLabel>
                <ConfigurationSelect
                  options={categoriesOfOrg}
                  selectedConfig={selectedCategoryOfOrg}
                  setSelectedConfig={setSelectedCategoryOfOrg}
                  placeholder="Select category"
                />
              </FormControl>
              <FormControl>
                <FormControlLabel className="mb-1">
                  <FormControlLabelText>
                    Size of organization
                  </FormControlLabelText>
                </FormControlLabel>
                <ConfigurationSelect
                  options={sizesOfOrg}
                  selectedConfig={selectedSizeOfOrg}
                  setSelectedConfig={setSelectedSizeOfOrg}
                  placeholder="Select size"
                />
              </FormControl>
              <FormControl>
                <FormControlLabel className="mb-1">
                  <FormControlLabelText>GST No</FormControlLabelText>
                </FormControlLabel>
                <Input variant="outline" size="md">
                  <InputField placeholder="ESHD123AJDUID123" />
                </Input>
              </FormControl>
              <FormControl>
                <FormControlLabel className="mb-1">
                  <FormControlLabelText>MSME No.</FormControlLabelText>
                </FormControlLabel>
                <Input variant="outline" size="md">
                  <InputField placeholder="ASDF1234QWER" />
                </Input>
              </FormControl>
              <FormControl>
                <FormControlLabel className="mb-1">
                  <FormControlLabelText>Description</FormControlLabelText>
                </FormControlLabel>
                <Textarea size="md" variant="default">
                  <TextareaInput placeholder="Write a short description about your organization" />
                </Textarea>
              </FormControl>
            </VStack>
            <Text className="font-bold text-lg mt-8">Organization Address</Text>
            <VStack className="gap-4 mt-3">
              <FormControl>
                <FormControlLabel className="mb-1">
                  <FormControlLabelText>Address Line 1</FormControlLabelText>
                </FormControlLabel>
                <Input variant="outline" size="md">
                  <InputField placeholder="Enter here" />
                </Input>
              </FormControl>
              <FormControl>
                <FormControlLabel className="mb-1">
                  <FormControlLabelText>Pincode</FormControlLabelText>
                </FormControlLabel>
                <CustomSelect
                  options={pincodes.map((pincode) => ({
                    label: pincode.pincode?.toString(),
                    value: pincode.id,
                  }))}
                  placeholder="Select pincode"
                  selectedValue={selectedPincode}
                  type="pincode"
                  onChange={setSelectedGeolocations}
                />
              </FormControl>
              <FormControl>
                <FormControlLabel className="mb-1">
                  <FormControlLabelText>Area</FormControlLabelText>
                </FormControlLabel>
                <CustomSelect
                  options={areas.map((area) => ({
                    label: area.areaName?.toString(),
                    value: area.id,
                  }))}
                  placeholder="Select area"
                  selectedValue={selectedArea}
                  type="area"
                  onChange={setSelectedGeolocations}
                />
              </FormControl>
              <FormControl>
                <FormControlLabel className="mb-1">
                  <FormControlLabelText>City</FormControlLabelText>
                </FormControlLabel>
                <CustomSelect
                  options={cities.map((city) => ({
                    label: city.cityName?.toString(),
                    value: city.id,
                  }))}
                  placeholder="Select city"
                  selectedValue={selectedCity}
                  type="city"
                  onChange={setSelectedGeolocations}
                />
              </FormControl>
              <FormControl>
                <FormControlLabel className="mb-1">
                  <FormControlLabelText>States</FormControlLabelText>
                </FormControlLabel>
                <CustomSelect
                  options={states.map((state) => ({
                    label: state.stateName?.toString(),
                    value: state.id,
                  }))}
                  placeholder="Select state"
                  selectedValue={selectedState}
                  type="state"
                  onChange={setSelectedGeolocations}
                />
              </FormControl>
              <FormControl>
                <FormControlLabel className="mb-1">
                  <FormControlLabelText>Country</FormControlLabelText>
                </FormControlLabel>
                <CustomSelect
                  options={countries.map((country) => ({
                    label: country.countryName?.toString(),
                    value: country.id,
                  }))}
                  placeholder="Select country"
                  selectedValue={selectedCountry}
                  type="country"
                  onChange={setSelectedGeolocations}
                />
              </FormControl>
            </VStack>
            <Button className="mt-6 bg-primary-950">
              <ButtonText>Save</ButtonText>
            </Button>
          </VStack>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegistrationScreen;
