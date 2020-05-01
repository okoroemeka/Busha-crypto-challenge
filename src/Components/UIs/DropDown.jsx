import React from 'react';
import Styled from 'styled-components';
import { convertFromPixelsToRem } from '../../Utils/misc';

const StyledSelect = Styled.select`
    width: ${convertFromPixelsToRem(348)};
  height: ${convertFromPixelsToRem(40)};

  backdrop-filter: blur(${convertFromPixelsToRem(5)});
  background-color: #67c462;
  border-radius: 5px;
  margin-right: ${convertFromPixelsToRem(16)};
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, white 50%),
    linear-gradient(135deg, white 50%, transparent 50%),
    linear-gradient(#fff 0%, transparent 0%);
  background-position: calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px);
  background-size: 5px 5px, 5px 5px;
  background-repeat: no-repeat;
  padding: 0.5em 3.5em 0.5em 1em;
  color: white;
  font-weight: 600;
  font-size: ${convertFromPixelsToRem(14)};
`;
const StyledOption = Styled.option`
    color:gray;
    width: 100%;
`;

const DropDown = ({ children, handleChanege }) => {
  return (
    <StyledSelect onChange={e => handleChanege(e.target.value)}>
      <StyledOption>select pair</StyledOption>
      {children}
    </StyledSelect>
  );
};

export default DropDown;
