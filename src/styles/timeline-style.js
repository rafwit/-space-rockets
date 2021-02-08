import styled, { keyframes } from "styled-components";
import rocket from "../img/rocket.png";

const slideInUp = keyframes`
0% {
  transform: translateY(678vh)
}
100% {
  transform: translateY(-40vh)
}
`;
const slideInDown = keyframes`
0% {
  transform: translateY(-40vh) rotate(180deg)
}
100% {
  transform: translateY(678vh) rotate(180deg)
}

`;

export const RocketUp = styled.div`
  background-image: url(${rocket});
  background-repeat: no-repeat;
  height: 25rem;
  width: 10rem;
  animation: 60s ${slideInUp} linear infinite;
`;
export const RocketDown = styled.div`
  background-image: url(${rocket});
  background-repeat: no-repeat;
  transform: rotate(180deg);
  height: 25rem;
  width: 10rem;
  animation: 60s ${slideInDown} linear infinite;
`;
