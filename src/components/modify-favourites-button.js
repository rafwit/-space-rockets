import React, { useCallback, useEffect, useState } from "react";
import { Icon, IconButton } from "@chakra-ui/react";
import { BsFillStarFill } from "react-icons/bs";
import { Flex } from "@chakra-ui/core";
import { useSelector, useDispatch } from "react-redux";

import { addToFavourites, removeFromFavourites } from "../store/actions";

export default function ModifyFavouritesButton({ data }) {
  const [color, setColor] = useState("gray.300");
  const dispatch = useDispatch();
  const favourites = useSelector((store) => store);

  const checkIfIsFavourite = useCallback(
    (data) => {
      const checkForLaunches =
        data &&
        favourites.launch.filter(
          (launch) => data && launch.flight_number === data.flight_number
        );
      const checkForLaunchPads =
        data &&
        favourites.launch_pad.filter(
          (launch) => data && launch.flight_number === data.flight_number
        );
      if (
        data &&
        checkForLaunches.length === 1 &&
        checkForLaunches[0].flight_number === data.flight_number
      ) {
        setColor("gray.300");
        return true;
      }
      if (data && checkForLaunchPads.length === 1) {
        setColor("gray.300");
        return true;
      }

      setColor("yellow.300");
      return false;
    },
    [favourites.launch, favourites.launch_pad]
  );

  useEffect(() => {
    if (checkIfIsFavourite(data)) setColor("yellow.300");
    else setColor("gray.300");
  }, [data, checkIfIsFavourite]);

  return (
    <Flex>
      <IconButton
        onClick={(e) => {
          e.preventDefault();
          if (!checkIfIsFavourite(data)) dispatch(addToFavourites(data));
          else dispatch(removeFromFavourites(data));
        }}
        icon={<Icon as={BsFillStarFill} color={color} boxSize={6} />}
      />
    </Flex>
  );
}
