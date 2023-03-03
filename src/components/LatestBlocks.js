import { useState, useEffect } from "react";
import { Box, Text, HStack, VStack, Link, Divider } from "@chakra-ui/react";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import LatestTransactions from "./LatestTransactions";
import { Icon } from "@chakra-ui/react";
import { FaLink } from "react-icons/fa";
import React from "react";

export default function LatestBlocks() {
  const [blocks, setBlock] = useState([]);

  const navigate = useNavigate();

  function handleSubmit(selectedOption, inputValue) {
    if (selectedOption === "Transaction Hash") {
      navigate("/transaction-details", { state: { someData: inputValue } });
    } else if (selectedOption === "Address") {
      navigate("/address-details", { state: { someData: inputValue } });
    } else if (selectedOption === "Block Number") {
      navigate("/block", { state: { blockNumber: inputValue } });
    } else if (selectedOption === "Block Details") {
      navigate("/block-details");
    }
  }

  const requiredBlocks = blocks.slice(0, 5);

  useEffect(() => {
    const provider = new Web3.providers.HttpProvider("http://10.8.0.41:7545");
    const web3 = new Web3(provider);

    // Get the latest block number
    try {
      web3.eth.getBlockNumber().then((latestBlockNumber) => {
        console.log(latestBlockNumber);
        for (let i = latestBlockNumber; i >= 2; i++) {
          web3.eth.getBlock(i).then((block) => {
            setBlock((prevBlocks) => [...prevBlocks, block]);
          });
        }
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  if (blocks.length === 0) {
    return <Box w="100%" h="100px " bg="red"></Box>;
  }

  return (
    <Box w="50%" mb={10}>
      <Box w="100%" borderColor={"gray.300"} borderRadius={25} boxShadow="md">
        <Box bg="#21325B" borderTopRadius={25} align="center">
          <Text fontSize="20px" fontWeight={500} color="white" p={5}>
            Latest Blocks
          </Text>
        </Box>

        {requiredBlocks.map((item, index) => (
          <Box border="1px" borderColor="gray.200" py={2} px={2}>
            <HStack
              key={index}
              w={"100%"}
              spacing={15}
              justifyContent="space-between"
            >
              <HStack>
                <Box
                  bgColor="gray"
                  borderRadius={10}
                  py={4}
                  px={5}
                  opacity="30%"
                >
                  <Icon color="white" as={FaLink} />
                </Box>

                <VStack>
                  <Link
                    onClick={() => handleSubmit("Block Number", item.number)}
                    textDecoration="no-underline"
                    _hover={{
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                    color="blue"
                  >
                    {"  "}
                    {item.number}
                  </Link>

                  <Text color="gray">
                    {new Date(item.timestamp * 1000).toTimeString().slice(0, 8)}
                  </Text>
                </VStack>
              </HStack>

              <Link
                color="blue"
                onClick={() =>
                  handleSubmit("Transaction Hash", item.transactions[0])
                }
              >
                {" "}
                {item.transactions.length} Txns{" "}
              </Link>

              <Box
                borderRadius={5}
                px={5}
                fontWeight="bold"
                border="1px solid"
                borderColor="gray.300"
                fontSize="12px"
              >
                {" "}
                ETH{" "}
              </Box>
            </HStack>
          </Box>
        ))}

        <VStack p={5}>
          <Link
            onClick={() => handleSubmit("Block Details")}
            fontSize="20px"
            textDecoration="underline"
          >
            {" "}
            See all Blocks{" "}
          </Link>
        </VStack>
      </Box>
    </Box>
  );
}
