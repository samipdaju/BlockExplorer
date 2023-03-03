import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {
  Box,
  Text,
  VStack,
  Image,
  ChakraBaseProvider,
  ChakraProvider,
} from "@chakra-ui/react";

import React from "react";
import SearchBar from "./components/SearchBar";
import Transaction from "./components/Transaction";
import LatestBlocks from "./components/LatestBlocks";
import AppRoutes from "./components/AppRoutes";

export default function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ChakraProvider>
  );
}
