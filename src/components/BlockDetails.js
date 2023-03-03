import { Box, HStack, Text, VStack, Link } from "@chakra-ui/react";

import { useState, useEffect } from "react";
import Logo from "./Logo";
import Web3 from "web3";
export default function BlockDetails() {
  const [latestBlock, setLatestBlock] = useState();
  const [blocks, setBlock] = useState([]);
  useEffect(() => {
    const provider = new Web3.providers.HttpProvider("http://10.8.0.41:7545");
    const web3 = new Web3(provider);

    // Get the latest block number
    web3.eth.getBlockNumber().then(async (latestBlockNumber) => {
      for (let i = latestBlockNumber; i >= 0; i--) {
        web3.eth.getBlock(i).then((block) => {
          setLatestBlock(block);
          blocks.push(block);
        });
      }
    });
  }, []);

  if (blocks.length === 0) {
    return <Box w="100%" h="100px " bg="red"></Box>;
  }

  return (
    <Box p={10}>
      <Logo />
      <Box
        fontSize={"24px"}
        mt={10}
        fontWeight="bold"
        alignContent={"center"}
        justifySelf="center"
      >
        BLOCK DETAILS
      </Box>
      <Box
        fontSize={"14px"}
        fontWeight="bold"
        w="100%"
        boxShadow="lg"
        border="2px"
        borderColor="gray.300"
        borderRadius={25}
        p={10}
      >
        <HStack w="100%" justifyContent="space-between" fontSize="18px" p={5}>
          <Text>Block</Text>
          <Text>Gas Used</Text>
          <Text>Gas Limit</Text>
          <Text>Size</Text>

          <Text>Txn</Text>
        </HStack>

        {blocks.map((item, index) => (
          <Box key={index} border="1px" borderColor="gray.300" p={5}>
            <HStack w="100%" justifyContent="space-between">
              <Link color="blue">{item.number}</Link>
              <Text>{item.gasUsed}</Text>
              <Text>{item.gasLimit}</Text>
              <Text>{item.number}</Text>

              <Text>{item.transactions.length}</Text>
            </HStack>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
