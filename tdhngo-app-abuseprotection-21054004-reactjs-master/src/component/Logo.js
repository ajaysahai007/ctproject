import { Box } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";

const Logo = (props) => {
  const history = useHistory();

  return (
    <Box>
      <img
        onClick={() => history.push("/dashboard")}
        src="/images/logo.png"
        alt="Logo"
        {...props}
        width="auto"
      />
    </Box>
  );
};

export default Logo;
