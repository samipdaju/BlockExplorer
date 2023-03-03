import { useState, useEffect } from "react";
import {
  Box,
  Text,
  HStack,
  VStack,
  Link,
  Divider,
  Image,
} from "@chakra-ui/react";
import Web3 from "web3";
import { useLocation, useNavigate } from "react-router-dom";
import NoResultFound from "./NoResultFound";
import Logo from "./Logo";

export default function SingleBlock() {
  const [block, setBlock] = useState();

  const location = useLocation();
  const blockNumber = location.state?.blockNumber;

  useEffect(() => {
    const provider = new Web3.providers.HttpProvider("http://10.8.0.41:7545");
    const web3 = new Web3(provider);
    web3.eth.getBlock(blockNumber).then((a_block) => {
      setBlock(a_block);
    });
  }, []);

  if (!block) {
    return <NoResultFound />;
  }

  return (
    <Box p={10} w="100%">
      <Logo />

      <Box my={10} borderRadius={20} boxShadow="lg">
        <Box bg="#21325B" borderTopRadius={20} align="start">
          <Text fontSize="20px" fontWeight={500} color="white" px={10} py={5}>
            BLOCK #{block.number}
          </Text>
        </Box>
        <HStack p={10} fontSize="20px" color="gray.500">
          <VStack w="20%" alignItems={"start"} spacing={10}>
            <Text fontSize="20px" color="gray.500">
              {" "}
              Number:
            </Text>

            <Text> Hash:</Text>

            <Text> TimeStamp:</Text>

            <Text> Size:</Text>
            <Text> Gas Limit:</Text>
            <Text> Transaction:</Text>
          </VStack>

          <VStack alignItems={"start"} spacing={10}>
            <Link color="blue" fontSize="20px">
              {" "}
              {block.number}{" "}
            </Link>

            <Link color="blue" fontSize="20px">
              {" "}
              {block.hash}{" "}
            </Link>

            <Text color="gray" fontSize="20px">
              {" "}
              {new Date(block.timestamp * 1000).toString()}{" "}
            </Text>

            <Text color="blue.400" fontSize="20px">
              {" "}
              {block.size}{" "}
            </Text>
            <Text color="blue.400" fontSize="20px">
              {" "}
              {block.gasUsed}{" "}
            </Text>
            <Link color="blue.400" fontSize="20px">
              {" "}
              {block.transactions[0]}{" "}
            </Link>
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
}
