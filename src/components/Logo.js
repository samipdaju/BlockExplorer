import { Box, VStack, Image, Circle, HStack, Text } from "@chakra-ui/react";

import React from "react";

import { useNavigate } from "react-router-dom";

export default function Logo() {
  const navigate = useNavigate();
  function handleNavigate() {
    navigate("/");
  }
  return (
    <Box>
      <HStack cursor={"pointer"} onClick={handleNavigate}>
        <Circle
          size={"40px"}
          bgGradient="linear-gradient(to left, #0670A6,#21325B  )"
        ></Circle>
        <Text color={"#21325B"} fontWeight="bold" fontSize="24px">
          {" "}
          BlockExplorer
        </Text>
      </HStack>
    </Box>
  );
}
