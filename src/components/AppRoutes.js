import { Route, Routes } from "react-router-dom";
import { pageRoutes } from "./pageRoutes";
import DashBoard from "./DashBoard";
import BlockDetails from "./BlockDetails";
import Transaction from "./Transaction";
import SingleBlock from "./SingleBlock";
import AddressDetails from "./AddressDetails";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={pageRoutes.dashboard} element={<DashBoard />}></Route>
      <Route path={pageRoutes.blockDetails} element={<BlockDetails />}></Route>
      <Route
        path={pageRoutes.transactionDetails}
        element={<Transaction />}
      ></Route>
      <Route path={pageRoutes.singleBlock} element={<SingleBlock />}></Route>
      <Route
        path={pageRoutes.addressDetails}
        element={<AddressDetails />}
      ></Route>
    </Routes>
  );
}
