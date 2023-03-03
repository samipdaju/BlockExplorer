import { useState, useEffect } from "react";
import { Box, Text, HStack, VStack, Link, Divider } from "@chakra-ui/react";
import Web3 from "web3";
import { Icon } from "@chakra-ui/react";
import { FaBook } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

export default function LatestTransactions() {
  const [transactions, setTransaction] = useState([]);
  const [latestTransaction, setLatestTransaction] = useState();

  const navigate = useNavigate();

  function handleSubmit(selectedOption, inputValue) {
    if (selectedOption === "Transaction Hash") {
      navigate("/transaction-details", { state: { someData: inputValue } });
    } else if (selectedOption === "Address") {
      navigate("/address-details", { state: { someData: inputValue } });
    } else if (selectedOption === "Block Number") {
      navigate("/block", { state: { blockNumber: inputValue } });
    }
  }

  useEffect(() => {
    const provider = new Web3.providers.HttpProvider("http://10.8.0.41:7545");

    const web3 = new Web3(provider);
    try {
      web3.eth.getBlockNumber().then((latestBlockNumber) => {
        for (let i = latestBlockNumber; i >= 2; i--) {
          web3.eth.getBlock(i).then((block) => {
            web3.eth.getTransaction(block.transactions[0]).then((txn) => {
              console.log(txn);
              setTransaction((prev) => [...prev, txn]);
            });
          });
        }
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const requiredTransaction = transactions.slice(0, 5);

  if (transactions.length === 0) {
    return <Box></Box>;
  }
  return (
    <Box w="50%">
      <Box w="100%" borderRadius={25} boxShadow="lg">
        <Box bg="#21325B" borderTopRadius={25} align="center">
          <Text fontSize="20px" fontWeight={500} color="white" p={5}>
            Latest Transactions
          </Text>
        </Box>

        {requiredTransaction.map((item, index) => (
          <Box key={index} border="1px" borderColor="gray.200" py={2} px={2}>
            <HStack w={"100%"} spacing={15} justifyContent="space-between">
              <HStack>
                <Box
                  bgColor="gray"
                  borderRadius={10}
                  px={5}
                  py={4}
                  opacity="50%"
                >
                  <Icon color="white" as={FaBook} />
                </Box>

                <VStack>
                  <Link
                    onClick={() => handleSubmit("Transaction Hash", item.hash)}
                    textDecoration="no-underline"
                    _hover={{
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                    color="blue"
                  >
                    {"  "}
                    {item.hash.slice(0, 5)}...
                  </Link>

                  <Text color="gray">time</Text>
                </VStack>
              </HStack>
              <VStack>
                <HStack>
                  <Text> From: </Text>
                  <Link
                    onClick={() => handleSubmit("Address", item.from)}
                    color="blue"
                  >
                    {" "}
                    {item.from.slice(0, 5)}...{" "}
                  </Link>
                </HStack>

                {item.to != null && (
                  <HStack>
                    <Text> To: </Text>

                    <Link
                      color="blue"
                      onClick={() => handleSubmit("Address", item.to)}
                    >
                      {" "}
                      {item.to.slice(0, 5)}...{" "}
                    </Link>
                  </HStack>
                )}
              </VStack>

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
          <Link fontSize="20px" textDecoration="underline">
            {" "}
            See all Transactions{" "}
          </Link>
        </VStack>
      </Box>
    </Box>
  );
}
