import { FlatList, Image, ListView, ScrollView, Text } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import React from "react";
import { Button, ButtonText } from "@/components/ui/button";
import Icon from "react-native-vector-icons/AntDesign";

const ContentPage = () => {
  return (
    <ScrollView>
      <VStack className="mt-2">
        <Text className="text-2xl font-bold">
          Hello <Text className="color-primary-950">Customer 👋</Text>
        </Text>
        <Text className="color-gray-500 mt-1 text-sm">
          How can we assist you today?
        </Text>
        <Card
          size="md"
          variant="elevated"
          className="mt-6 pb-0 ps-4 rounded-2xl "
        >
          <HStack>
            <VStack className="w-44 justify-evenly">
              <VStack>
                <Text className="text-2xl font-medium">
                  Having trouble with your
                  <Text className="text-primary-950"> Device?</Text>
                </Text>
              </VStack>
              <Button className="mb-4 mt-4 bg-gray-900">
                <ButtonText>Let us know</ButtonText>
                <Icon
                  name="arrowright"
                  className="ms-3"
                  color="white"
                  size={20}
                />
              </Button>
            </VStack>
            <Image
              source={require("../../assets/images/card_man.png")}
              className="w-[200px] h-[200px] me-4"
            />
          </HStack>
        </Card>
        <HStack className="justify-between mt-8">
          <Text className="text-[14px] font-bold">Latest Tickets</Text>
          <Text className="text-sm underline color-primary-950">View All</Text>
        </HStack>
        <FlatList data={} renderItem={} />
      </VStack>
    </ScrollView>
  );
};

export default ContentPage;
