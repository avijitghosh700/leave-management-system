import { NextPage } from "next";
import React from "react";

import { Box, Container, Divider, Grid, GridItem, Heading, Stack } from "@chakra-ui/react";

import withAuth from "../../shared/HOC/withAuth";

import dashboardStyle from "./Dashboard.module.scss";
import LeaveStatus from "../../shared/components/LeaveStatus/LeaveStatus";

const Dashboard: NextPage = () => {
  return (
    <Box as="section" className={`${dashboardStyle.Dashboard}`} py={4}>
      <Container maxW={"container.xl"}>
        <Stack mb={5}>
          <Heading size={'xl'}>Leaves</Heading>
          <Divider />
        </Stack>

        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
          gap={4}
        >
          <GridItem>
            <LeaveStatus title="Sick" type="sick" count={2} total={8} />
          </GridItem>
          <GridItem>
            <LeaveStatus title="Casual" type="casual" count={4} total={8} />
          </GridItem>
          <GridItem>
            <LeaveStatus title="Earned" type="earned" count={10} total={12} />
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default withAuth(Dashboard);
