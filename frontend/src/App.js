import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Divider, Container, Typography } from "@mui/material";
import Home from "./views/Home";
import Bin from "./views/Bin";
import Request from "./views/Request";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const linkStyle = {
  textDecoration: "none",
  color: "#3e87c4",
};

const App = () => {
  return (
    <div className="App">
      <Router>
        <Container>
          <Link to="/" style={linkStyle}>
            <Typography
              variant="h3"
              align="center"
              style={{
                marginLeft: "auto",
                marginBottom: "auto",
                marginTop: "2em",
              }}
            >
              PanicBin
            </Typography>
          </Link>
          <Typography
            variant="subtitle1"
            align="center"
            style={{ marginBottom: "2.5em", fontStyle: "italic" }}
          >
            Get a custom URL for inspecting HTTP requests...
          </Typography>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bins/:binId" element={<Bin />} />
            <Route path="/:binId/:requestId" element={<Request />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
