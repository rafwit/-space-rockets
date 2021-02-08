import React, { useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/core";
import { Link, useMediaQuery } from "@chakra-ui/react";
import { CloseIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { useSpaceX } from "../utils/use-space-x";
import { getDayMonthYearString } from "../utils/format-date";
import Breadcrumbs from "./breadcrumbs";
import Error from "./error";
import { RocketUp, RocketDown } from "../styles/timeline-style";

export default function Timeline() {
  const { data: history, error } = useSpaceX(`/history`);
  if (error) return <Error />;
  const items = history;

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "History", to: ".." },
        ]}
      />
      <Flex
        overflow="hidden"
        position="relative"
        direction="column"
        top={0}
        bottom={0}
      >
        <Flex m={"2rem"} direction="column" alignItems="center">
          {items
            ? items.map((item) => <TimelineElement item={item} key={item.id} />)
            : null}
        </Flex>
        <Flex
          opacity={0.5}
          direction="row"
          justifyContent="space-around"
          width="100vw"
          position="absolute"
          overflow="hidden"
          top={0}
          bottom={0}
        >
          <RocketUp />
          <RocketDown />
        </Flex>
      </Flex>
    </>
  );
}

function TimelineElement({ item }) {
  const [showDetails, setShowDetails] = useState(false);
  const switchTimelineElementsDetailsSize = useMediaQuery("(max-width: 600px)");
  const switchTimelineTitlesSize = useMediaQuery("(max-width: 450px)");

  return (
    <Flex direction="column" alignItems="center">
      <Box
        backgroundColor="#1A202C"
        height="40vh"
        width="0.2rem"
        mb={"-38vh"}
        alignSelf="center"
      ></Box>
      <Flex height="30vh" direction="column">
        <Text
          pt={"1rem"}
          fontFamily="mono"
          letterSpacing="0.2px"
          fontWeight="md"
          fontSize="md"
          alignSelf="center"
          backgroundColor="#fff"
        >
          {getDayMonthYearString(item.event_date_utc)}
        </Text>
        <Button
          aria-label="timeline-element"
          backgroundColor="#fff"
          color="#1A202C"
          p={"0.5rem"}
          fontFamily="mono"
          letterSpacing="0.5px"
          fontWeight="bold"
          fontSize={switchTimelineTitlesSize[0] ? "xs" : "md"}
          _hover={{
            backgroundColor: "#1A202C",
            color: "#fff",
          }}
          _focus={{ outline: "none" }}
          _active={{ outline: "none", transform: "scale(0.98)" }}
          onClick={() => setShowDetails(true)}
          width="auto"
          zIndex={100}
        >
          {item.title}
        </Button>
      </Flex>
      {showDetails ? (
        <Flex
          p="1rem"
          overflow="scroll"
          direction="column"
          position="absolute"
          maxHeight="40vh"
          maxWidth={switchTimelineElementsDetailsSize[0] ? "45vw" : "35vw"}
          boxShadow="lg"
          rounded="lg"
          backgroundColor="#fff"
          color="#1A202C"
          transform={
            item.id % 2 === 0 ? "translate(-30vw, 0)" : "translate(30vw, 0)"
          }
          zIndex={150}
        >
          <Button
            position="absolute"
            right={0}
            top={0}
            p={"0.2rem"}
            backgroundColor="transparent"
            _hover={{
              backgroundColor: "transparent",
              transform: "scale(1.1)",
            }}
            _active={{ transform: "scale(0.90)" }}
            _focus={{ outline: "none" }}
            onClick={() => setShowDetails(false)}
            alignSelf="flex-end"
            color="#1A202C"
          >
            <CloseIcon />
          </Button>
          <Text
            fontFamily="mono"
            letterSpacing="0.2px"
            fontWeight="bold"
            fontSize="xs"
            backgroundColor="#fff"
            color="#1A202C"
            p={"0.5rem"}
          >
            {item.title}
          </Text>
          <Text
            fontFamily="mono"
            letterSpacing="0.2px"
            fontWeight="md"
            fontSize="xs"
          >
            {item.details}
          </Text>
          <Link target="_blank" href={item.links.article}>
            <Text
              p={"1rem"}
              fontFamily="mono"
              letterSpacing="0.2px"
              fontWeight="md"
              fontSize="xs"
            >
              Go to source <ExternalLinkIcon mx="2px" />
            </Text>
          </Link>
        </Flex>
      ) : null}
    </Flex>
  );
}
