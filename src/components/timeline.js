import { Box, Flex, Text } from "@chakra-ui/core";
import React from "react";
import { getDayMonthYearString } from "../utils/format-date";
import { useSpaceX } from "../utils/use-space-x";
import Error from "./error";

export default function Timeline() {
  const { data: history, error } = useSpaceX(`/history`);

  if (error) return <Error />;
  const items = history;

  return (
    <>
      <button onClick={() => console.log(items)}>CONSOLE LOG</button>

      <Flex direction="column" alignItems="center" m={"2rem"}>
        {items
          ? items.map((item) => <TimelineElement item={item} key={item.id} />)
          : null}
      </Flex>
    </>
  );
}

function TimelineElement({ item }) {
  return (
    <Flex direction="column" alignItems="center" fontWeight="700">
      <Text
        color="gray.700"
        fontSize="md"
        alignSelf="center"
        transform="translateY(20vh)"
        zIndex={100}
        backgroundColor="#fff"
        p={"0.5rem"}
        m={0}
      >
        {getDayMonthYearString(item.event_date_utc)}
      </Text>
      <Box
        backgroundColor="#1A202C"
        borderRadius="0%"
        height="40vh"
        width="0.2rem"
        mb={"-38vh"}
        alignSelf="center"
      ></Box>
      <Flex>
        <Box
          backgroundColor="gray.300"
          boxShadow="md"
          borderWidth="1px"
          rounded="lg"
          height="40vh"
          width="40vw"
          transform={item.id % 2 === 0 ? "translateX(-70%)" : "translateX(70%)"}
          mt={"-1rem"}
        ></Box>
      </Flex>
    </Flex>
  );
}
