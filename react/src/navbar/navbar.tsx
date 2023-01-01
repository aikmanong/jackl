import React, { useCallback } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { AvailableFeatures } from "../Types";
import "./navbar.css";

interface INavBarProps {
  currentSelectedFeature: AvailableFeatures;
  handleFeatureChange: (selectedFeature: AvailableFeatures) => void;
}

export const NavBar: React.FC<INavBarProps> = (props) => {
  const currentSelectedFeature = props.currentSelectedFeature;
  const handleFeatureChange = props.handleFeatureChange;

  const onClickFeatureChange = useCallback(
    (selectedFeature: AvailableFeatures) => () => {
      handleFeatureChange(selectedFeature);
    },
    [handleFeatureChange]
  );

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand onClick={onClickFeatureChange("home")}>
            JACKL
          </Navbar.Brand>
          <Nav className="me-auto">
            <Navbar.Text
              className={currentSelectedFeature === "analyze" ? "selected" : ""}
              onClick={onClickFeatureChange("analyze")}
            >
              Analyze
            </Navbar.Text>
            <Navbar.Text
              className={currentSelectedFeature === "verify" ? "selected" : ""}
              onClick={onClickFeatureChange("verify")}
            >
              Verify
            </Navbar.Text>
            <Navbar.Text
              className={currentSelectedFeature === "find" ? "selected" : ""}
              onClick={onClickFeatureChange("find")}
            >
              Find
            </Navbar.Text>
            <Navbar.Text
              className={
                currentSelectedFeature === "streaming" ? "selected" : ""
              }
              onClick={onClickFeatureChange("streaming")}
            >
              Stream
            </Navbar.Text>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
