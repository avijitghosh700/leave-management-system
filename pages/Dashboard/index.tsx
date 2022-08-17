import { NextPage } from "next";
import React from "react";

import { Button } from "@chakra-ui/react";

import withAuth from "../../shared/HOC/withAuth";
import { useAuth } from "../../shared/context/AuthContext";

const Dashboard: NextPage = () => {
  const { logout } = useAuth();

  return (
    <Button type="button" m={3} onClick={logout}>
      Logout
    </Button>
  );
};

export default withAuth(Dashboard);
