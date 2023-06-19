import React from "react";
import Container from "@mui/material/Container";

import { Header } from "./views"
import { SignIn } from "./views/auth/SignIn"



function App() {
  return (
     <Container disableGutters maxWidth={false}>
      <Header />
      <SignIn />
    </Container>
  );
}

export default App;
