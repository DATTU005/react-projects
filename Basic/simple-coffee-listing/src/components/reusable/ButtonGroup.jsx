import React from "react";
import { Button, Grid } from "@mui/material";

const CustomButtonGroup = ({
  buttons,
  handleButtonClick,
  selectedButton,
  justifyContent,
}) => {
  return (
    <Grid container justifyContent={justifyContent}>
      <Grid item>
        {buttons.map((button) => (
          <Button
            key={button}
            onClick={() => handleButtonClick(button)}
            sx={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "0.875rem",
              backgroundColor:
                selectedButton === button ? "#6F757C" : "initial",
              color: selectedButton === button ? "#fff" : "#ffffff",
              textTransform: "capitalize",
              "&:hover": {
                backgroundColor:
                  selectedButton === button ? "#6F757C" : "initial",
                color: selectedButton === button ? "#fff" : "#6F757C",
              },
            }}
          >
            {button}
          </Button>
        ))}
      </Grid>
    </Grid>
  );
};

export default CustomButtonGroup;
