import React from 'react';
import ReactTooltip from 'react-tooltip';

const ToolTip = ({ ...props }) => {
  const { ToolTipId, bgColor, fontColor, isHtml } = props;
  return (
    <>
      <ReactTooltip
        place="bottom"
        effect="float"
        borderColor="none"
        className="font-semibold"
        border={false}
        id={ToolTipId}
        backgroundColor={bgColor}
        arrowColor={bgColor}
        textColor={fontColor}
        html={isHtml}
      />
    </>
  );
};
export default ToolTip;
