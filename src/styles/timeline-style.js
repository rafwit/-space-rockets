import styled, { keyframes } from "styled-components";
import rocket from "../img/rocket.png";

function randomNumber(min, max) {
  const r = Math.random() * (max - min) + min;
  return Math.floor(r);
}

const slideInUp = keyframes`
100% {
  transform: translateY(-1050%)
}
`;
const slideInDown = keyframes`
0% {
  transform: translateY(-1050%) rotate(180deg)
}

`;

export const RocketUp = styled.div`
  background-image: url(${rocket});
  background-repeat: no-repeat;
  height: 25rem;
  width: 10rem;
  animation: ${randomNumber(29, 36)}s ${slideInUp} linear infinite;
`;
export const RocketDown = styled.div`
  background-image: url(${rocket});
  background-repeat: no-repeat;
  transform: rotate(180deg);
  height: 25rem;
  width: 10rem;
  animation: ${randomNumber(29, 36)}s ${slideInDown} linear infinite;
`;
