import { VStack } from "@/components/ui/vstack";
import React, { useEffect, useState } from "react";
import api from "@/services/api";
import { GET_ASSETS_IN_USE } from "@/constants/api_endpoints";
import { AssetInUseListItemModel } from "@/models/assets";
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

const RaiseTicketScreen = () => {
  const [assetsInUse, setAssetsInUse] = useState<AssetInUseListItemModel[]>([]);
  const [errors, setErrors] = useState<ErrorModel[]>([]);

  const { customerId } = useLocalSearchParams();

  const [selectedAssetInUse, setSelectedAssetInUse] = useState<DropdownModel>();

  useEffect(() => {
    const loadAssetsInUse = () => {
      let params = `customerId=${customerId}`;
      api
        .get(GET_ASSETS_IN_USE + `${params}`, {})
        .then((response) => {
          setAssetsInUse(response.data?.data ?? []);
        })
        .catch((e) => {
          console.error(e);
        });
    };

    loadAssetsInUse();
  });

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
    }
  };

  return (
    <VStack>
      <FormControl
        isInvalid={isFormFieldInValid("countryId", errors).length > 0}
      >
        <FormControlLabel className="mb-1">
          <FormControlLabelText>Country</FormControlLabelText>
        </FormControlLabel>
        <CustomSelect
          options={assetsInUse.map((assetInUse) => ({
            label: assetInUse.serialNo?.toString(),
            value: assetInUse.id,
          }))}
          placeholder="Select asset in use"
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
    </VStack>
  );
};

export default RaiseTicketScreen;
