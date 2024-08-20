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
import { GET_CONFIGURATIONS_BY_CATEGORY } from "@/constants/api_endpoints";
import {
  CATEGORY_OF_ORG,
  SIZE_OF_ORG,
  TYPE_OF_ORG,
} from "@/constants/configuration_keys";
import ConfigurationSelect from "@/components/ConfigurationSelect";
import { Textarea, TextareaInput } from "@/components/ui/textarea";

const RegistrationScreen = () => {
  // options
  // configurations
  const [typesOfOrg, setTypesOfOrg] = useState<ConfigurationModel[]>([]);
  const [categoriesOfOrg, setCategoriesOfOrg] = useState<ConfigurationModel[]>(
    [],
  );
  const [sizesOfOrg, setSizesOfOrg] = useState<ConfigurationModel[]>([]);

  // selected options
  // configurations
  const [selectedTypeOfOrg, setSelectedTypeOfOrg] =
    useState<ConfigurationModel>({});
  const [selectedCategoryOfOrg, setSelectedCategoryOfOrg] =
    useState<ConfigurationModel>({});
  const [selectedSizeOfOrg, setSelectedSizeOfOrg] =
    useState<ConfigurationModel>({});
  // geolocations

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
          console.log("response -> ", response.data);
          setSizesOfOrg(response.data?.data ?? []);
        })
        .catch((e) => {
          console.error(e);
        });
    };
    loadTypesOfOrg();
    loadCategoriesOfOrg();
    loadSizesOfOrg();
  }, []);

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
                  <FormControlLabelText>Address Line 1</FormControlLabelText>
                </FormControlLabel>
                <Input variant="outline" size="md">
                  <InputField placeholder="Enter here" />
                </Input>
              </FormControl>
            </VStack>
          </VStack>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegistrationScreen;
