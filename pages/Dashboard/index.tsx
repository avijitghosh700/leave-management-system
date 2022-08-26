import { NextPage } from "next";
import React from "react";

import { Box, Button, CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

import withAuth from "../../shared/HOC/withAuth";
import { useAuth } from "../../shared/context/AuthContext";

import dashboardStyle from "./Dashboard.module.scss";

const Dashboard: NextPage = () => {
  return <Box as="section" className={`${dashboardStyle.Dashboard}`}></Box>;
};

export default withAuth(Dashboard);
