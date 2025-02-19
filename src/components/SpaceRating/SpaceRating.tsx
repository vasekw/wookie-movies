import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import RocketLaunchSharpIcon from "@mui/icons-material/RocketLaunchSharp";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#F85525",
  },
  "& .MuiRating-iconEmpty": {
    color: "#F6DCAC",
  },
});

interface SpaceRatingProps {
  name: string;
  defaultValue: number;
  precision: number;
  max: number;
  readOnly?: boolean;
}

const SpaceRating: React.FC<SpaceRatingProps> = ({
  name,
  defaultValue,
  precision,
  max,
  readOnly,
}) => {
  return (
    <Box sx={{ "& > legend": { mt: 2 } }}>
      <StyledRating
        name={name}
        defaultValue={defaultValue}
        precision={precision}
        max={max}
        icon={<RocketLaunchSharpIcon fontSize="inherit" />}
        emptyIcon={<RocketLaunchSharpIcon fontSize="inherit" />}
        readOnly={readOnly}
      />
    </Box>
  );
};

export default SpaceRating;
