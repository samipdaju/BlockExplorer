import {
  Button,
  Input,
  Box,
  HStack,
  IconButton,
  Text,
  Link,
  ButtonGroup,
  MenuButton,
  Menu,
  MenuItem,
  MenuOptionGroup,
  MenuList,
  MenuItemOption,
} from "@chakra-ui/react";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { color } from "framer-motion";

export default function SearchBar() {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState("");

  const [selectedOption, setSelectedOption] = useState("Transaction Hash");

  const handleSelect = (value) => {
    setSelectedOption(value);
  };

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleSubmit() {
    if (selectedOption === "Transaction Hash") {
      navigate("/transaction-details", { state: { someData: inputValue } });
    } else if (selectedOption === "Address") {
      navigate("/address-details", { state: { someData: inputValue } });
    } else if (selectedOption === "Block Number") {
      navigate("/block", { state: { blockNumber: inputValue } });
    }
  }

  return (
    <Box p={50} alignItems="center" w="100%" bg={"#111B36"} mb={10}>
      <Text color="white" fontWeight="bold" fontSize="20px" mb={5}>
        {" "}
        My Block Chain Explorer{" "}
      </Text>

      <Box borderRadius={10} bg="white" w="60%">
        <HStack
          justifyContent={"space-between"}
          display="flex"
          w="100%"
          px={2}
          py={1}
        >
          <Box
            flex="0.2"
            display={"flex"}
            borderRadius={10}
            border="2px"
            borderColor="transparent"
            _hover={{ borderColor: "gray.300" }}
            px={2}
            py={2}
          >
            <Menu>
              <MenuButton fontSize="14px" flex="1">
                <HStack justifyContent={"space-between"} w="100%">
                  <Box
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                  >
                    {" "}
                    {selectedOption}{" "}
                  </Box>
                  <ChevronDownIcon color={"black"} />
                </HStack>
              </MenuButton>
              <MenuList>
                <MenuOptionGroup value={selectedOption} onChange={handleSelect}>
                  <MenuItemOption value="Transaction Hash">
                    Transaction Hash
                  </MenuItemOption>
                  <MenuItemOption value="Address">Address</MenuItemOption>
                  <MenuItemOption value="Block Number">
                    Block number
                  </MenuItemOption>
                </MenuOptionGroup>
              </MenuList>
            </Menu>
          </Box>

          <Input
            w={"100%"}
            value={inputValue}
            onChange={handleInputChange}
            flex="1"
            borderRadius={10}
            border="none"
            placeholder={`Seach By ${selectedOption} `}
          />
          <Box
            bg="#0670A6"
            borderRadius={5}
            px={2}
            py={1}
            onClick={handleSubmit}
          >
            <Box as="span">
              <SearchIcon color={"white"} />
            </Box>
          </Box>
        </HStack>
      </Box>
    </Box>
  );
}
