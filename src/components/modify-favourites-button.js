import React, { useCallback, useEffect, useState } from "react";
import { Icon, IconButton, useToast } from "@chakra-ui/react";
import { CheckIcon, InfoOutlineIcon, DeleteIcon } from "@chakra-ui/icons";
import { BsFillStarFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";

import { addToFavourites, removeFromFavourites } from "../store/actions";
import { Box, Flex } from "@chakra-ui/core";

export default function ModifyFavouritesButton({
  data,
  colorActive = "#FFC8D0",
  canModify = false,
}) {
  const [color, setColor] = useState("gray.300");
  const dispatch = useDispatch();

  const toast = useToast();

  const favourites = useSelector((store) => {
    return {
      launches: store.favourites.favourites_launches,
      launch_pads: store.favourites.favourites_launch_pads,
    };
  });

  const checkIfIsFavourite = useCallback(
    (data) => {
      const checkForLaunches =
        data &&
        favourites.launches.filter(
          (launch) => launch.flight_number === data.flight_number
        );

      const checkForLaunchPads =
        data &&
        favourites.launch_pads.filter(
          (launchPad) => launchPad.site_id === data.site_id
        );

      if (
        data &&
        checkForLaunches.length === 1 &&
        checkForLaunches[0].flight_number === data.flight_number
      ) {
        if (canModify) setColor("gray.300");

        return true;
      }
      if (
        data &&
        checkForLaunchPads.length === 1 &&
        checkForLaunchPads[0].site_id === data.site_id
      ) {
        if (canModify) setColor("gray.300");
        return true;
      }

      setColor(colorActive);
      return false;
    },
    [favourites.launches, favourites.launch_pads, canModify, colorActive]
  );

  useEffect(() => {
    if (checkIfIsFavourite(data)) setColor(colorActive);
    else setColor("gray.300");
  }, [data, checkIfIsFavourite, colorActive]);

  return (
    <Flex>
      <IconButton
        onClick={(e) => {
          e.preventDefault();
          if (!checkIfIsFavourite(data)) {
            dispatch(addToFavourites(data));
            toast({
              position: "bottom-left",
              duration: 3000,
              // eslint-disable-next-line react/display-name
              render: () => (
                <Box
                  color="#1A202C"
                  fontWeight="700"
                  p={3}
                  bg="#FFC8D0"
                  d="flex"
                  alignItems="center"
                >
                  <CheckIcon /> &nbsp;
                  {data.mission_name
                    ? `${data.mission_name} added to
                  favourites`
                    : `${data.name} added to
                  favourites`}
                </Box>
              ),
            });
          } else {
            if (canModify) {
              dispatch(removeFromFavourites(data));
              toast({
                position: "bottom-left",
                duration: 3000,

                // eslint-disable-next-line react/display-name
                render: () => (
                  <Box
                    color="#fff"
                    fontWeight="700"
                    p={3}
                    bg="#fc8181"
                    d="flex"
                    alignItems="center"
                  >
                    <DeleteIcon /> &nbsp;
                    {data.mission_name
                      ? `${data.mission_name} removed from
                    favourites`
                      : `${data.name} removed from
                    favourites`}
                  </Box>
                ),
              });
            } else
              toast({
                position: "bottom-left",
                duration: 3000,
                // eslint-disable-next-line react/display-name
                render: () => (
                  <Box
                    color="#fff"
                    fontWeight="700"
                    p={3}
                    bg="#6699ff"
                    d="flex"
                    alignItems="center"
                    flex-wrap="wrap"
                  >
                    <InfoOutlineIcon /> &nbsp; Navigate to details page or
                    favourites list to remove item
                  </Box>
                ),
              });
          }
        }}
        icon={<Icon as={BsFillStarFill} color={color} boxSize={6} />}
      />
    </Flex>
  );
}
