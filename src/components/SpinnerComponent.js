import React, { useState } from "react";
import { CircularProgress, Box } from "@mui/material";

const Spinner = ({ loading }) => {
  return (
    <Box
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        display: loading ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <CircularProgress color="secondary" />
    </Box>
  );
};

export default Spinner;
