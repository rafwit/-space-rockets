import React, { useState } from "react";

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
import { CloseIcon } from "@chakra-ui/icons";
import ModifyFavouritesButton from "./modify-favourites-button";

export default function Favourites() {
  const [isOpen, setIsOpen] = useState(false);

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
          as="button"
          aria-label="favourites"
          color="white"
          backgroundColor="none"
          _hover={{ textDecoration: "underline" }}
          _active={{ outline: "none", transform: "scale(0.97)" }}
          _focus={{ outline: "none" }}
          onClick={() => {
            setIsOpen(true);
          }}
        >
          FAVOURITES
        </Button>
      </Text>

      <Box
        position="fixed"
        overflow="scroll"
        right={0}
        top={0}
        transform={isOpen ? "translateX(0)" : "translateX(100%)"}
        transition={["transform 0.5s ease-in"]}
        width="35%"
        height="100vh"
        backgroundColor="gray.100"
        zIndex={100}
      >
        <Box>
          <Flex
            position="relative"
            p={"0.2rem"}
            marginBottom={"1rem"}
            width="100%"
            direction="column"
            // backgroundColor="#1A202C"
          >
            <Button
              position="absolute"
              right={0}
              backgroundColor="transparent"
              _hover={{
                backgroundColor: "transparent",
                transform: "scale(1.1)",
              }}
              _active={{ transform: "scale(0.90)" }}
              _focus={{ outline: "none" }}
              onClick={() => setIsOpen(false)}
              alignSelf="flex-end"
              color="#1A202C"
            >
              <CloseIcon />
            </Button>
            <Text
              pt={"1rem"}
              fontFamily="mono"
              letterSpacing="0.5px"
              fontWeight="bold"
              fontSize="xl"
              alignSelf="center"
              color="#1A202C"
            >
              Favourites
            </Text>
          </Flex>
        </Box>
        <Box>
          <Flex direction="column" align="flex-end" mb={"2rem"}>
            <Text
              fontFamily="mono"
              letterSpacing="0.5px"
              fontWeight="bold"
              fontSize="md"
              pb={"0.5rem"}
              alignSelf="flex-end"
              textAlign="center"
              width="100%"
              color="#1A202C"
            >
              Launches ({favourites.launches.length})
            </Text>
            {favourites.launches.length ? (
              <Box
                width="100%"
                maxHeight="55vh"
                overflow="scroll"
                pt={"0.5rem"}
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
            ) : (
              <Text
                p={"1rem"}
                fontFamily="mono"
                letterSpacing="0.5px"
                fontWeight="bold"
                fontSize="md"
                alignSelf="center"
                color="#1A202C"
              >
                You have no favourite launches. Star some to see them here.
              </Text>
            )}
            <Text
              fontFamily="mono"
              letterSpacing="0.5px"
              fontWeight="bold"
              fontSize="md"
              p={"0.5rem"}
              textAlign="center"
              width="100%"
              color="#1A202C"
            >
              Launch Pads ({favourites.launch_pads.length})
            </Text>
            {favourites.launch_pads.length ? (
              <Box
                width="100%"
                maxHeight="70vh"
                overflow="scroll"
                pt={"0.5rem"}
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
            ) : (
              <Text
                p={"1rem"}
                fontFamily="mono"
                letterSpacing="0.5px"
                fontWeight="bold"
                fontSize="md"
                alignSelf="center"
                color="#1A202C"
              >
                You have no favourite launch pads. Star some to see them here.
              </Text>
            )}
          </Flex>
        </Box>
      </Box>
    </>
  );
}

export function FavouriteLaunchItem({ favourite }) {
  return (
    <>
      <Flex direction="column">
        <Box alignSelf="flex-end" pr="0.5rem">
          <ModifyFavouritesButton
            data={favourite}
            colorActive="#fc8181"
            canModify={true}
          />
        </Box>
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
          mb="1rem"
          width="90%"
          backgroundColor="#fff"
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
              pt="1rem"
              pb="0.5rem"
              color="#1A202C"
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
          <Box
            color="gray.500"
            fontWeight="semibold"
            fontSize="xs"
            pb={"0.5rem"}
          >
            {formatDateTime(
              favourite.launch_date_local,
              favourite.launch_site.site_id
            )}
          </Box>
        </Flex>
      </Flex>
    </>
  );
}

export function FavouriteLaunchPadItem({ favourite }) {
  return (
    <>
      <Flex direction="column">
        <Box alignSelf="flex-end" pr="0.5rem">
          <ModifyFavouritesButton
            data={favourite}
            colorActive="#fc8181"
            canModify={true}
          />
        </Box>
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
          mb="1rem"
          width="90%"
          backgroundColor="#fff"
        >
          <Box
            height="1rem"
            background={`linear-gradient(${randomColor()}, ${randomColor()})`}
            bgPos="center"
            bgSize="cover"
            bgRepeat="no-repeat"
            width="100%"
          ></Box>
          <Box
            fontSize="large"
            fontWeight="bold"
            pt="0.5rem"
            pb="0.5rem"
            color="#1A202C"
          >
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
      </Flex>
    </>
  );
}

const randomColor = (start = 200, end = 250) =>
  `hsl(${start + end * Math.random()}, 80%, 90%)`;
