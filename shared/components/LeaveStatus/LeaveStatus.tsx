import React from "react";
import { Card, Progress, CardBody, Box, Text } from "@chakra-ui/react";

import { LeaveTypes } from "../../models/leaves.model";
import { CASUAL_LEAVE, EARNED_LEAVE, SICK_LEAVE } from "../../constants/leaves";

const LeaveStatus = (props: LeaveStatusPropType) => {
  const { title, count, total, type } = props;

  const leaves = count < 0 ? 0 : count;

  const colorStyleByType = React.useMemo(() => {
    switch (type) {
      case SICK_LEAVE:
        return "red";

      case CASUAL_LEAVE:
        return "blue";

      case EARNED_LEAVE:
        return "green";

      default:
        return "blue";
    }
  }, [type]);

  return (
    <Card>
      <CardBody>
        <Text>{title}</Text>

        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
          <Box display={"flex"} alignItems={"baseline"} gap={1}>
            <Box as={"span"} fontSize={"3xl"} fontWeight={"bold"} color={`${colorStyleByType}.500`}>
              {leaves}
            </Box>
            out of
            <Box as={"span"} fontWeight={"bold"}>
              {total}
            </Box>
          </Box>
        </Box>

        <Progress colorScheme={colorStyleByType} height="1" min={0} value={leaves} max={total} />
      </CardBody>
    </Card>
  );
};

type LeaveStatusPropType = {
  title: string;
  total: number;
  count: number;
  type: LeaveTypes;
};

export default LeaveStatus;
