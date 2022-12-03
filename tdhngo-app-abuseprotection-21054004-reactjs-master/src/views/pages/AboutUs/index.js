import React from "react";
import { Box } from "@material-ui/core";
import Page from "src/component/Page";
import Privacy from "./Privacy";

function WhitePaper(props) {
  return (
    <Page title="White Paper">
      <Box>
        <Privacy />
      </Box>
    </Page>
  );
}

export default WhitePaper;
