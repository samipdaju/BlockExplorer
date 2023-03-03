import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Image, Box, VStack, Text, HStack, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function NoResultFound() {
  const navigate = useNavigate();
  function handleNavigate() {
    navigate("/");
  }
  return (
    <VStack
      spacing={20}
      p={20}
      alignContent="center"
      justifyContent={"center"}
      justifyItems="center"
    >
      <Image src="https://cdn.dribbble.com/userupload/2905383/file/original-4ea237e94e803ddd575a66eb32198899.png?compress=1&resize=400x300&vertical=top"></Image>

      <Box
        cursor="pointer"
        onClick={handleNavigate}
        p={5}
        borderRadius={20}
        border="2px"
        borderColor="gray.300"
        _hover={{ bg: "gray.300" }}
      >
        <HStack>
          <ChevronLeftIcon />
          <Text> Return Back to Home</Text>
        </HStack>
      </Box>
    </VStack>
  );
}
