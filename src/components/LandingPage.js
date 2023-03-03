import LatestBlocks from "./LatestBlocks";
import LatestTransactions from "./LatestTransactions";
import { HStack } from "@chakra-ui/react";

export default function LandingPage() {
  return (
    <HStack w="100%" px={20} alignItems="start" spacing={10}>
      <LatestBlocks />
      <LatestTransactions />
    </HStack>
  );
}
