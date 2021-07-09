import React, { useState } from "react";
// reactstrap components
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from "reactstrap";

const defaultGlobalInfo = {
  maxWaterDepth: "",
  dropFrequency: "",
  densityOfWater: "",
  probabilityOfDropOverWater: "",
  probabilityOfWindDirection: "",
  maxDistanceFomDropPoint: "",
  numberOfLiftManifest: "",
  typeOfPipeline: "",
  pipelineSize: "",
  innerPipeSize: "",
  odOfPipeline: "",
  odOfInnerPipeline: "",
  wallThickness: "",
  wallThicknessOfInnerPipe: "",
  materialOfConstruction: "",
  materialOfInnerPipeline: "",
  yieldStress: "",
  yieldStressOfInnerPipe: "",
  dragCoefficient: "",
  massCoefficient: "",
};

function GlobalInformation(props) {
  const [globalInfo, setGlobalInfo] = useState(props.data);
  var regexWithDecimal = /^-?\d+\.?\d*$/;
  var regexOnlyNumber = new RegExp("[^0-9]", "g");

  const handleData = (event) => {
    if (
      regexWithDecimal.test(event.target.value) ||
      event.target.value === "" ||
      event.target.name === "typeOfPipeline" ||
      event.target.name === "dragCoefficient" ||
      event.target.name === "massCoefficient" ||
      event.target.name === "materialOfConstruction" ||
      event.target.name === "materialOfInnerPipeline" ||
      (event.target.name === "probabilityOfDropOverWater" &&
        regexWithDecimal.test(event.target.value) &&
        parseInt(event.target.value) <= 1) ||
      (event.target.name === "probabilityOfWindDirection" &&
        regexWithDecimal.test(event.target.value) &&
        parseInt(event.target.value) <= 1)
    ) {
      const items = { ...globalInfo };
      ((event.target.name === "probabilityOfDropOverWater" ||
        event.target.name === "probabilityOfWindDirection") &&
        regexWithDecimal.test(event.target.value) &&
        parseFloat(event.target.value) > 1) ||
      (event.target.name === "numberOfLiftManifest" &&
        regexOnlyNumber.test(event.target.value))
        ? (items[event.target.name] = "")
        : (items[event.target.name] = event.target.value);
      setGlobalInfo(items);
      props.handleData(items, "globalInformation");
    }
  };
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle tag="h5">Global Information</CardTitle>
          <p className="card-category">
            Enter Input information to generate template
          </p>
          <p6 className="card-category">All Fields are necessary</p6>
        </CardHeader>
        <CardBody>
          <div>
            <Form>
              <FormGroup>
                <Row>
                  <Col>
                    <Label for="exampleEmail">
                      Max Water Depth<span style={{ color: "red" }}>*</span>{" "}
                    </Label>
                    <InputGroup>
                      <Input
                        value={globalInfo["maxWaterDepth"]}
                        required
                        pattern="[0-9]{0,5}"
                        name="maxWaterDepth"
                        onChange={handleData}
                      />

                      <InputGroupAddon addonType="append">
                        <InputGroupText>m</InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                  <Col>
                    <Label for="exampleEmail">
                      Drop Frequency per lift
                      <span style={{ color: "red" }}>*</span>{" "}
                    </Label>
                    <InputGroup>
                      <Input
                        value={globalInfo["dropFrequency"]}
                        name="dropFrequency"
                        onChange={handleData}
                      />
                      <InputGroupAddon addonType="append">
                        <InputGroupText>per lift</InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Label for="exampleEmail">
                      Density of Water<span style={{ color: "red" }}>*</span>{" "}
                    </Label>
                    <InputGroup>
                      <Input
                        value={globalInfo["densityOfWater"]}
                        name="densityOfWater"
                        onChange={handleData}
                      />
                      <InputGroupAddon addonType="append">
                        <InputGroupText>Kg/m3</InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                  <Col>
                    <Label for="exampleEmail">
                      Probability of drop over water
                      <span style={{ color: "red" }}>*</span>{" "}
                    </Label>
                    <Input
                      value={globalInfo["probabilityOfDropOverWater"]}
                      name="probabilityOfDropOverWater"
                      id="probability of drop over water"
                      onChange={handleData}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col></Col>
                  <Col>
                    <Label for="exampleEmail">
                      Probability of wind direction (FPSO)
                      <span style={{ color: "red" }}>*</span>{" "}
                    </Label>
                    <Input
                      value={globalInfo["probabilityOfWindDirection"]}
                      name="probabilityOfWindDirection"
                      id="exampleEmail"
                      onChange={handleData}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Label for="exampleEmail">
                      Max Distance of interest from Drop Point
                      <span style={{ color: "red" }}>*</span>{" "}
                    </Label>
                    <InputGroup>
                      <Input
                        value={globalInfo["maxDistanceFomDropPoint"]}
                        name="maxDistanceFomDropPoint"
                        onChange={handleData}
                      />
                      <InputGroupAddon addonType="append">
                        <InputGroupText>m</InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                  <Col>
                    <Label for="exampleEmail">
                      Number of Item in Lift Manifest
                      <span style={{ color: "red" }}>*</span>{" "}
                    </Label>
                    <Input
                      value={globalInfo["numberOfLiftManifest"]}
                      name="numberOfLiftManifest"
                      id="Number of Item in Lift Manifest "
                      onChange={handleData}
                    />
                  </Col>
                </Row>
                <Label for="exampleSelect">
                  Type of Pipeline / Riser
                  <span style={{ color: "red" }}>*</span>{" "}
                </Label>
                <Input
                  value={globalInfo["typeOfPipeline"]}
                  type="select"
                  name="typeOfPipeline"
                  id="typesOfPipe"
                  onChange={handleData}
                >
                  <option>Steel Pipeline / Riser</option>
                  <option>Flexible Pipeline / Riser</option>
                  <option>Umbilical</option>
                  <option>Steel Pipe-in-Pipe / Riser</option>
                </Input>
                <br />
                <Row>
                  <Col>
                    <Label for="exampleSelect">
                      Drag Coefficient of the object (Cd)
                      <span style={{ color: "red" }}>*</span>{" "}
                    </Label>
                    <Input
                      value={globalInfo["dragCoefficient"]}
                      type="select"
                      name="dragCoefficient"
                      id="dragCoefficient"
                      onChange={handleData}
                    >
                      <option></option>
                      <option>Lower End Value</option>
                      <option>Medium Value</option>
                      <option>Upper End Value</option>
                    </Input>
                  </Col>
                  <Col>
                    <Label for="exampleSelect">
                      Added Mass coefficient (Ca)
                      <span style={{ color: "red" }}>*</span>{" "}
                    </Label>
                    <Input
                      value={globalInfo["massCoefficient"]}
                      type="select"
                      name="massCoefficient"
                      id="massCoefficient"
                      onChange={handleData}
                    >
                      <option></option>
                      <option>Lower End Value</option>
                      <option>Medium Value</option>
                      <option>Upper End Value</option>
                    </Input>
                  </Col>
                </Row>
                <hr />
                <h6>Pipeline / Umbilical Input</h6>
                <Row>
                  <Col>
                    <Label for="exampleEmail">
                      Pipeline Size<span style={{ color: "red" }}>*</span>{" "}
                    </Label>
                    <InputGroup>
                      <Input
                        value={globalInfo["pipelineSize"]}
                        name="pipelineSize"
                        onChange={handleData}
                      />
                      <InputGroupAddon addonType="append">
                        <InputGroupText>inches</InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                  <Col>
                    {globalInfo["typeOfPipeline"] ===
                      "Steel Pipe-in-Pipe / Riser" && (
                      <>
                        <Label for="exampleEmail">
                          Inner Pipe size<span style={{ color: "red" }}>*</span>{" "}
                        </Label>
                        <InputGroup>
                          <Input
                            value={globalInfo["innerPipeSize"]}
                            name="innerPipeSize"
                            onChange={handleData}
                          />
                          <InputGroupAddon addonType="append">
                            <InputGroupText>inches</InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>{" "}
                      </>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Label for="exampleEmail">
                      OD of Pipeline / Umbilical
                      <span style={{ color: "red" }}>*</span>{" "}
                    </Label>
                    <InputGroup>
                      <Input
                        value={globalInfo["odOfPipeline"]}
                        name="odOfPipeline"
                        onChange={handleData}
                      />
                      <InputGroupAddon addonType="append">
                        <InputGroupText>m</InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                  <Col>
                    {globalInfo["typeOfPipeline"] ===
                      "Steel Pipe-in-Pipe / Riser" && (
                      <>
                        <Label for="exampleEmail">
                          OD of Innner Pipe
                          <span style={{ color: "red" }}>*</span>{" "}
                        </Label>
                        <InputGroup>
                          <Input
                            value={globalInfo["odOfInnerPipeline"]}
                            name="odOfInnerPipeline"
                            onChange={handleData}
                          />
                          <InputGroupAddon addonType="append">
                            <InputGroupText>m</InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                      </>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Label for="exampleEmail">
                      Wall Thickness<span style={{ color: "red" }}>*</span>{" "}
                    </Label>
                    <InputGroup>
                      <Input
                        value={globalInfo["wallThickness"]}
                        name="wallThickness"
                        onChange={handleData}
                      />
                      <InputGroupAddon addonType="append">
                        <InputGroupText>m</InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                  <Col>
                    {globalInfo["typeOfPipeline"] ===
                      "Steel Pipe-in-Pipe / Riser" && (
                      <>
                        <Label for="exampleEmail">
                          Wall thickness of Inner Pipe
                          <span style={{ color: "red" }}>*</span>{" "}
                        </Label>
                        <InputGroup>
                          <Input
                            value={globalInfo["wallThicknessOfInnerPipe"]}
                            name="wallThicknessOfInnerPipe"
                            onChange={handleData}
                          />
                          <InputGroupAddon addonType="append">
                            <InputGroupText>m</InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                      </>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Label for="exampleEmail">
                      Material of Construction
                      <span style={{ color: "red" }}>*</span>{" "}
                    </Label>
                    <Input
                      value={globalInfo["materialOfConstruction"]}
                      name="materialOfConstruction"
                      onChange={handleData}
                    />
                  </Col>
                  <Col>
                    {globalInfo["typeOfPipeline"] ===
                      "Steel Pipe-in-Pipe / Riser" && (
                      <>
                        <Label for="exampleEmail">
                          Material of Inner Pipeline
                          <span style={{ color: "red" }}>*</span>{" "}
                        </Label>
                        <Input
                          value={globalInfo["materialOfInnerPipeline"]}
                          name="materialOfInnerPipeline"
                          onChange={handleData}
                        />
                      </>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Label for="exampleEmail">
                      Yield Stress of material
                      {globalInfo.typeOfPipeline !== "Umbilical" && (
                        <span style={{ color: "red" }}>*</span>
                      )}
                    </Label>
                    <InputGroup>
                      <Input
                        disabled={globalInfo.typeOfPipeline === "Umbilical"}
                        value={globalInfo["yieldStress"]}
                        name="yieldStress"
                        onChange={handleData}
                      />
                      <InputGroupAddon addonType="append">
                        <InputGroupText
                          style={{
                            backgroundColor:
                              globalInfo.typeOfPipeline === "Umbilical"
                                ? "#E3E3E3"
                                : null,
                          }}
                        >
                          N/m2
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                  <Col>
                    {globalInfo["typeOfPipeline"] ===
                      "Steel Pipe-in-Pipe / Riser" && (
                      <>
                        <Label for="exampleEmail">
                          Yield Stress of inner pipe material
                          <span style={{ color: "red" }}>*</span>{" "}
                        </Label>
                        <InputGroup>
                          <Input
                            value={globalInfo["yieldStressOfInnerPipe"]}
                            name="yieldStressOfInnerPipe"
                            onChange={handleData}
                          />
                          <InputGroupAddon addonType="append">
                            <InputGroupText>N/m2</InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                      </>
                    )}
                  </Col>
                </Row>
              </FormGroup>
            </Form>
          </div>
        </CardBody>
        <CardFooter></CardFooter>
      </Card>
    </>
  );
}

export default GlobalInformation;
