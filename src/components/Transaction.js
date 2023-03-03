import { Box, HStack, VStack, Text, Link } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

import { useState, useEffect } from "react";

import Web3 from "web3";
import NoResultFound from "./NoResultFound";
import Logo from "./Logo";
export default function Transaction() {
  const [transaction, setTransaction] = useState();

  const location = useLocation();
  const transactionHash = location.state?.someData;

  useEffect(() => {
    const provider = new Web3.providers.HttpProvider("http://10.8.0.41:7545");
    const web3 = new Web3(provider);
    web3.eth.getTransaction(transactionHash).then((latestTransaction) => {
      setTransaction(latestTransaction);
    });
  }, []);

  if (!transaction) {
    return <NoResultFound />;
  }

  return (
    <Box p={10}>
      <Logo></Logo>

      <Box my={10} borderColor="gray.200" borderRadius={20} boxShadow="lg">
        <Box bg="#21325B" borderTopRadius={20} align="start">
          <HStack px={10} py={5}>
            <Text fontSize="20px" fontWeight={500} color="white">
              Transaction
            </Text>
            <Text fontSize="20px" color="white" fontWeight={250}>
              #{transaction.hash}
            </Text>
          </HStack>
        </Box>
        <HStack p={10} spacing={0}>
          <VStack w="20%" alignItems={"start"} spacing={10}>
            <Text fontSize="20px" color="gray.500">
              {" "}
              Transaction:
            </Text>

            <Text fontSize="20px" color="gray.500">
              {" "}
              block:
            </Text>

            <Box height="2px" bg="gray.300" width="100%">
              {" "}
            </Box>

            <Text fontSize="20px" color="gray.500">
              {" "}
              from:
            </Text>

            <Text fontSize="20px" color="gray.500">
              {" "}
              to:
            </Text>

            <Box height="2px" bg="gray.300" width="100%">
              {" "}
            </Box>
            <Text fontSize="20px" color="gray.500">
              {" "}
              gas:
            </Text>
            <Text fontSize="20px" color="gray.500">
              {" "}
              Value:
            </Text>
          </VStack>

          <VStack alignItems={"start"} spacing={10}>
            <Link color="blue.400" fontSize="20px">
              {" "}
              {transaction.hash}{" "}
            </Link>

            <Text fontSize="20px"> {transaction.blockNumber} </Text>
            <Box height="2px" bg="gray.300" width="100%">
              {" "}
            </Box>

            <Link color="blue.400" fontSize="20px">
              {" "}
              {transaction.from}{" "}
            </Link>

            {transaction.to != null ? (
              <Link color="blue.400" fontSize="20px">
                {" "}
                {transaction.to}
              </Link>
            ) : (
              <Text fontSize="20px"> {"-"}</Text>
            )}

            <Box height="2px" bg="gray.300" width="100%">
              {" "}
            </Box>
            <Link color="blue.400" fontSize="20px">
              {" "}
              {transaction.gas}{" "}
            </Link>
            <Link color="blue.400" fontSize="20px">
              {" "}
              {transaction.value}{" "}
            </Link>
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
}
