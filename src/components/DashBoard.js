import { Box, VStack, Image, Circle, HStack, Text } from "@chakra-ui/react";

import React from "react";
import SearchBar from "./SearchBar";

import LandingPage from "./LandingPage";
import Logo from "./Logo";

export default function DashBoard() {
  return (
    <Box>
      <Box w="100%" justifyItems="end" px={15} p={10}>
        <Logo />
      </Box>
      <SearchBar />
      <LandingPage />
    </Box>
  );
}
