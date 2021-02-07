import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    if (checkIfItemIsFavourite(data, favourites)) {
      setColor(colorActive);
    } else {
      setColor("gray.300");
    }
  }, [data, colorActive, favourites]);

  return (
    <Flex>
      <IconButton
        onClick={(e) => {
          e.preventDefault();
          if (!checkIfItemIsFavourite(data, favourites)) {
            dispatch(addToFavourites(data));
            setColor(colorActive);
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
                  aligndatas="center"
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
              setColor("gray.300");
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
                    aligndatas="center"
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
                    aligndatas="center"
                    flex-wrap="wrap"
                  >
                    <InfoOutlineIcon /> &nbsp; Navigate to details page or
                    favourites list to remove data
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

function checkIfItemIsFavourite(data, favourites) {
  const launches =
    data &&
    favourites.launches.filter(
      (launch) => launch.flight_number === data.flight_number
    );

  const launchPads =
    data &&
    favourites.launch_pads.filter(
      (launchPad) => launchPad.site_id === data.site_id
    );

  if (launches[0] && launches[0].flight_number === data.flight_number) {
    return true;
  }
  if (launchPads[0] && launchPads[0]?.site_id === data.site_id) {
    return true;
  }

  return false;
}
