import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import {
  Box,
  Button,
  Flex,
  Image,
  Stat,
  StatNumber,
  Text,
} from "@chakra-ui/core";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatDateTime } from "../utils/format-date";

export default function FavouritesDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const favourites = useSelector((store) => {
    return {
      launches: store.favourites.favourites_launches,
      launch_pads: store.favourites.favourites_launch_pads,
    };
  });

  return (
    <>
      <Text
        fontFamily="mono"
        letterSpacing="2px"
        fontWeight="bold"
        fontSize="small"
      >
        <Button
          ref={btnRef}
          as="button"
          aria-label="favourites"
          color="white"
          backgroundColor="none"
          _hover={{ backgroundColor: "#fff", color: "#1A202C" }}
          _active={{ outline: "none", transform: "scale(0.97)" }}
          _focus={{ outline: "none" }}
          onClick={onOpen}
        >
          FAVOURITES
        </Button>
      </Text>

      <Drawer
        placement="right"
        onClose={onClose}
        isOpen={isOpen}
        finalFocusRef={btnRef}
        size="md"
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader>
              <Box backgroundColor="#fff" width="35%" float="right">
                <Flex
                  direction="row-reverse"
                  justify="space-between"
                  p={"0.2rem"}
                  marginBottom={"1rem"}
                >
                  <DrawerCloseButton
                    color="#1A202C"
                    float="right"
                    p={1}
                    _hover={{ backgroundColor: "#1A202C", color: "#fff" }}
                    _active={{ transform: "scale(0.97)" }}
                  />
                  <Text
                    fontFamily="mono"
                    letterSpacing="0.5px"
                    fontWeight="bold"
                    fontSize="md"
                    paddingLeft="38%"
                  >
                    Favourites
                  </Text>
                </Flex>
              </Box>
            </DrawerHeader>
            <DrawerBody>
              <Flex direction="column" align="flex-end" mb={"2rem"}>
                <Text
                  fontFamily="mono"
                  letterSpacing="0.5px"
                  fontWeight="bold"
                  fontSize="md"
                  pb={2}
                  backgroundColor="#fff"
                  alignSelf="flex-end"
                  textAlign="center"
                  width="35%"
                >
                  Launches ({favourites.launches.length})
                </Text>
                <Box
                  backgroundColor="#fff"
                  width="35%"
                  height="50vh"
                  overflow="scroll"
                >
                  <Flex direction="column" alignContent="center">
                    {favourites.launches &&
                      favourites.launches.map((favourite) => (
                        <FavouriteLaunchItem
                          favourite={favourite}
                          key={favourite.flight_number}
                        />
                      ))}
                  </Flex>
                </Box>

                <Text
                  fontFamily="mono"
                  letterSpacing="0.5px"
                  fontWeight="bold"
                  fontSize="md"
                  p={2}
                  backgroundColor="#fff"
                  textAlign="center"
                  width="35%"
                >
                  Launch Pads ({favourites.launch_pads.length})
                </Text>
                <Box
                  backgroundColor="#fff"
                  width="35%"
                  height="50vh"
                  overflow="scroll"
                >
                  <Flex direction="column" alignContent="center" mb={"2rem"}>
                    {favourites.launch_pads &&
                      favourites.launch_pads.map((favourite) => (
                        <FavouriteLaunchPadItem
                          mb={"1rem"}
                          favourite={favourite}
                          key={favourite.site_id}
                        />
                      ))}
                  </Flex>
                </Box>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}

function FavouriteLaunchItem({ favourite }) {
  return (
    <>
      <Flex
        as={Link}
        to={`/launches/${favourite.flight_number.toString()}`}
        direction="column"
        alignItems="center"
        alignSelf="center"
        overflow="hidden"
        boxShadow="md"
        borderWidth="1px"
        rounded="lg"
        mb={"1rem"}
        width="90%"
      >
        <Image
          src={
            favourite.links.flickr_images[0]?.replace("_o.jpg", "_z.jpg") ??
            favourite.links.mission_patch_small
          }
          bgSize="cover"
          objectFit="cover"
          objectPosition="center"
          height="15vh"
          width="100%"
        />
        <Stat d="flex" flexDirection="column">
          <StatNumber
            fontSize="small"
            fontWeight="bold"
            pt={"1rem"}
            pb={"0.5rem"}
          >
            {favourite.mission_name}
          </StatNumber>
        </Stat>
        <Box
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          textTransform="uppercase"
        >
          {favourite.launch_site.site_name} &bull;{" "}
          {favourite.rocket.rocket_name}
        </Box>
        <Box color="gray.500" fontWeight="semibold" fontSize="xs" pb={"0.5rem"}>
          {formatDateTime(
            favourite.launch_date_local,
            favourite.launch_site.site_id
          )}
        </Box>
      </Flex>
    </>
  );
}

export function FavouriteLaunchPadItem({ favourite }) {
  return (
    <>
      <Flex
        as={Link}
        to={`/launch-pads/${favourite.site_id}`}
        direction="column"
        alignSelf="center"
        alignItems="center"
        overflow="hidden"
        boxShadow="md"
        borderWidth="1px"
        rounded="lg"
        mb={"1rem"}
        width={"90%"}
      >
        <Box
          height="1rem"
          background={`linear-gradient(${randomColor()}, ${randomColor()})`}
          bgPos="center"
          bgSize="cover"
          bgRepeat="no-repeat"
          width="100%"
        ></Box>
        <Box fontSize="large" fontWeight="bold" pt={"0.5rem"} pb={"0.5rem"}>
          {favourite.name}
        </Box>
        <Box
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          textTransform="uppercase"
        >
          {favourite.attempted_launches} attempted &bull;{" "}
          {favourite.successful_launches} succeeded
        </Box>
      </Flex>
    </>
  );
}

const randomColor = (start = 200, end = 250) =>
  `hsl(${start + end * Math.random()}, 80%, 90%)`;
