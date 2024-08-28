import { VStack } from "@/components/ui/vstack";
import React, { useEffect, useRef, useState } from "react";
import api from "@/services/api";
import { GET_ASSETS_IN_USE, GET_ISSUE_TYPES } from "@/constants/api_endpoints";
import {
  AssetInUseListItemModel,
  IssueTypeListItemModel,
} from "@/models/assets";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import CustomSelect from "@/components/CustomSelect";
import { DropdownModel, ErrorModel } from "@/models/common";
import { isFormFieldInValid } from "@/utils/helper";
import { useLocalSearchParams } from "expo-router";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { Modalize } from "react-native-modalize";
import ImagePickerComponent from "@/components/ImagePickerComponent";
import { Image, View } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import Icon from "react-native-vector-icons/Feather";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const RaiseTicketScreen = () => {
  const [assetsInUse, setAssetsInUse] = useState<AssetInUseListItemModel[]>([]);
  const [issueTypes, setIssueTypes] = useState<IssueTypeListItemModel[]>([]);
  const [errors, setErrors] = useState<ErrorModel[]>([]);

  const { customerId } = useLocalSearchParams();

  const [selectedAssetInUse, setSelectedAssetInUse] = useState<DropdownModel>();
  const [selectedIssueType, setSelectedIssueType] = useState<DropdownModel>();

  const [image, setImage] = useState<string | null>(null);

  const modalizeRef = useRef<Modalize>(null);

  const refRBSheet = useRef(null);

  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const loadAssetsInUse = () => {
      let params = `customerId=${customerId}`;
      api
        .get(GET_ASSETS_IN_USE + `?${params}`, {})
        .then((response) => {
          setAssetsInUse(response.data?.data ?? []);
        })
        .catch((e) => {
          console.error(e);
        });
    };
    const loadIssueTypes = () => {
      api
        .get(GET_ISSUE_TYPES, {})
        .then((response) => {
          setIssueTypes(response.data?.data?.content ?? []);
        })
        .catch((e) => {
          console.error(e);
        });
    };

    loadAssetsInUse();
    loadIssueTypes();
  }, []);

  const setSelectedDropdown = (type: string, e: any) => {
    switch (type) {
      case "assetInUse":
        let selectedAssetInUse = assetsInUse.find(
          (assetInUse) => assetInUse.id === e,
        );
        setSelectedAssetInUse({
          label: selectedAssetInUse?.serialNo?.toString(),
          value: selectedAssetInUse?.id,
        });
        break;
      case "issueType":
        let selectedIssueType = issueTypes.find(
          (issueType) => issueType.id === e,
        );
        setSelectedIssueType({
          label: selectedIssueType?.name?.toString(),
          value: selectedIssueType?.id,
        });
        break;
    }
  };

  const toggleImagePicker = () => {
    setIsModalVisible(!isModalVisible);
    if (!isModalVisible) {
    } else {
    }
  };

  const raiseTicket = () => {};

  return (
    <GestureHandlerRootView>
      <VStack className="p-4 gap-4">
        <FormControl
          isInvalid={isFormFieldInValid("countryId", errors).length > 0}
        >
          <FormControlLabel className="mb-1">
            <FormControlLabelText>Asset</FormControlLabelText>
          </FormControlLabel>
          <CustomSelect
            options={assetsInUse.map((assetInUse) => ({
              label: assetInUse.serialNo?.toString(),
              value: assetInUse.id,
            }))}
            placeholder="Select asset"
            selectedValue={selectedAssetInUse}
            type="assetInUse"
            onChange={setSelectedDropdown}
          />
          <FormControlError>
            <FormControlErrorText>
              {isFormFieldInValid("assetInUse", errors)}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
        <FormControl
          isInvalid={isFormFieldInValid("issueType", errors).length > 0}
        >
          <FormControlLabel className="mb-1">
            <FormControlLabelText>Issue Type</FormControlLabelText>
          </FormControlLabel>
          <CustomSelect
            options={issueTypes.map((assetInUse) => ({
              label: assetInUse.name?.toString(),
              value: assetInUse.id,
            }))}
            selectedValue={selectedIssueType}
            type="issueType"
            placeholder="Select issue type"
            onChange={setSelectedDropdown}
          />
          <FormControlError>
            <FormControlErrorText>
              {isFormFieldInValid("issueType", errors)}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
        <FormControl
          isInvalid={isFormFieldInValid("description", errors).length > 0}
        >
          <FormControlLabel className="mb-1">
            <FormControlLabelText>Issue Description</FormControlLabelText>
          </FormControlLabel>
          <Textarea size="md" variant="default">
            <TextareaInput
              placeholder="Write a short description about your issue"
              // onChangeText={(e) => {
              //   if (customerLeadDetailsModel) {
              //     customerLeadDetailsModel.description = e;
              //   }
              // }}
            />
          </Textarea>
          <FormControlError>
            <FormControlErrorText>
              {isFormFieldInValid("description", errors)}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
        <FormControl>
          <FormControlLabel className="mb-1">
            <FormControlLabelText>Asset Images</FormControlLabelText>
          </FormControlLabel>
          {image ? (
            <Image source={{ uri: image }} className="w-full h-36 rounded-xl" />
          ) : (
            <View className="w-full flex justify-center items-center gap-4 h-36 bg-white rounded-xl">
              <Button
                className="bg-secondary-950 w-36"
                onPress={() => toggleImagePicker()}
              >
                <ButtonText>Choose</ButtonText>
                <Icon name="upload" className="ms-2" color="white" size={18} />
              </Button>
            </View>
          )}
        </FormControl>
        <Button className="bg-primary-950 mt-6 " onPress={raiseTicket}>
          <ButtonText>Raise</ButtonText>
        </Button>
      </VStack>
      <ImagePickerComponent
        onImagePicked={(e) => {
          setImage(e);
        }}
        modalizeRef={modalizeRef}
        setIsModalVisible={setIsModalVisible}
        refRBSheet={refRBSheet}
      />
    </GestureHandlerRootView>
  );
};

export default RaiseTicketScreen;
