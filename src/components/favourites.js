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

import { Box, Button, Flex, Text } from "@chakra-ui/core";

export default function FavouritesDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

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
              <Box
                backgroundColor="#fff"
                width="35%"
                float="right"
                height="10vh"
              >
                <Flex direction="column">
                  <DrawerCloseButton
                    color="#1A202C"
                    float="right"
                    p={2}
                    m={[2, 0, 0, 0]}
                    _hover={{ backgroundColor: "#1A202C", color: "#fff" }}
                    _active={{ transform: "scale(0.97)" }}
                    alignSelf="flex-end"
                  />
                  <Text
                    fontFamily="mono"
                    letterSpacing="2px"
                    fontWeight="bold"
                    fontSize="md"
                    alignSelf="center"
                  >
                    Favourites
                  </Text>
                </Flex>
              </Box>
            </DrawerHeader>
            <DrawerBody>
              <Flex direction="column" align="flex-end">
                <Box backgroundColor="#fff" width="35%" height="45vh">
                  <Flex direction="column" alignItems="center">
                    <Text
                      fontFamily="mono"
                      letterSpacing="2px"
                      fontWeight="bold"
                      fontSize="md"
                      p={2}
                    >
                      Launches
                    </Text>
                    <h1>FAV</h1>
                    <h1>FAV</h1>
                    <h1>FAV</h1>
                  </Flex>
                </Box>
                <Box backgroundColor="#fff" width="35%" height="45vh">
                  <Flex direction="column" alignItems="center">
                    <Text
                      fontFamily="mono"
                      letterSpacing="2px"
                      fontWeight="bold"
                      fontSize="md"
                      p={2}
                    >
                      Launch Pads
                    </Text>
                    <h1>FAV</h1>
                    <h1>FAV</h1>
                    <h1>FAV</h1>
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
