import {CardElement} from "react-stripe-elements";
import styled from "styled-components";

export const SCardElement = styled(CardElement)`
  font-family: "Roboto Mono";
  font-weight: 300;
  font-size: 16px;
  width: 100%;
  height: 34px;
  color: rgba(0, 0, 0, 0.5);
  background: #ededed;
  padding: 10px;
  border-radius: 3px;
  margin-top: 25px;

  ::placeholder: {
    fontfamily: "Roboto Mono";
    fontweight: 300;
    fontsize: 16px;
    color: #3d3d3d;
  }
`;
