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
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from "reactstrap";

function GlobalInformation() {
  const [globalInfo, setGlobalInfo] = useState([]);

  const handleData = (event) => {
    const items = { ...globalInfo };
    items[event.target.name] = event.target.value;
    console.log(items);
    setGlobalInfo(items);
  };
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle tag="h5">Global Information</CardTitle>
          <p className="card-category">
            Enter Input information to generate template
          </p>
        </CardHeader>
        <CardBody>
          <div>
            <Form>
              <FormGroup>
                <Row>
                  <Col>
                    <Label for="exampleEmail">Max Water Depth</Label>
                    <InputGroup>
                      <Input name="maxWaterDept" onChange={handleData} />
                      <InputGroupAddon addonType="append">
                        <InputGroupText>m</InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                  <Col>
                    <Label for="exampleEmail">Drop Frequency per lift</Label>
                    <InputGroup>
                      <Input name="dropFrequency" onChange={handleData} />
                      <InputGroupAddon addonType="append">
                        <InputGroupText>per lift</InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Label for="exampleEmail">Density of Water</Label>
                    <InputGroup>
                      <Input name="densityOfWater" onChange={handleData} />
                      <InputGroupAddon addonType="append">
                        <InputGroupText>Kg/m3</InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                  <Col>
                    <Label for="exampleEmail">
                      Probability of drop over water
                    </Label>
                    <Input
                      name="ProbabilityOfDropOverWater"
                      id="Probability of drop over water"
                      onChange={handleData}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col></Col>
                  <Col>
                    <Label for="exampleEmail">
                      Probability of wind direction (FPSO)
                    </Label>
                    <Input
                      name="ProbabilityOfWindDirection"
                      id="exampleEmail"
                      onChange={handleData}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Label for="exampleEmail">
                      Max distance from drop point
                    </Label>
                    <InputGroup>
                      <Input
                        name="MaxDistanceFomDropPoint"
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
                    </Label>
                    <Input
                      name="NumberOfLiftManifest"
                      id="Number of Item in Lift Manifest "
                      onChange={handleData}
                    />
                  </Col>
                </Row>
                <Label for="exampleSelect">Type of Pipeline / Riser</Label>
                <Input
                  type="select"
                  name="TypeOfPipeline"
                  id="typesOfPipe"
                  onChange={handleData}
                >
                  <option>Steel Pipeline / Riser</option>
                  <option>Flexible Pipeline / Riser</option>
                  <option>Umbilical</option>
                  <option>Steel Pipe-in-Pipe / Riser</option>
                </Input>
                <br />
                <hr />
                <h6>Pipeline / Umbilical Input</h6>
                <Row>
                  <Col>
                    <Label for="exampleEmail">Pipeline Size</Label>
                    <InputGroup>
                      <Input name="pipelineSize" onChange={handleData} />
                      <InputGroupAddon addonType="append">
                        <InputGroupText>inches</InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                  <Col>
                    {globalInfo["TypeOfPipeline"] ===
                      "Steel Pipe-in-Pipe / Riser" && (
                      <>
                        <Label for="exampleEmail">Inner Pipe size</Label>
                        <InputGroup>
                          <Input name="innerPipeSize" onChange={handleData} />
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
                    <Label for="exampleEmail">OD of Pipeline / Umbilical</Label>
                    <InputGroup>
                      <Input name="odOfPipeline" onChange={handleData} />
                      <InputGroupAddon addonType="append">
                        <InputGroupText>m</InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                  <Col>
                    {globalInfo["TypeOfPipeline"] ===
                      "Steel Pipe-in-Pipe / Riser" && (
                      <>
                        <Label for="exampleEmail">OD of Innner Pipe</Label>
                        <InputGroup>
                          <Input
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
                    <Label for="exampleEmail">Wall Thickness</Label>
                    <InputGroup>
                      <Input name="wallThickness" onChange={handleData} />
                      <InputGroupAddon addonType="append">
                        <InputGroupText>m</InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                  <Col>
                    {globalInfo["TypeOfPipeline"] ===
                      "Steel Pipe-in-Pipe / Riser" && (
                      <>
                        <Label for="exampleEmail">
                          Wall thickness of Inner Pipe
                        </Label>
                        <InputGroup>
                          <Input
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
                    <Label for="exampleEmail">Material of Construction</Label>
                    <Input
                      name="materialOfConstruction"
                      onChange={handleData}
                    />
                  </Col>
                  <Col>
                    {globalInfo["TypeOfPipeline"] ===
                      "Steel Pipe-in-Pipe / Riser" && (
                      <>
                        <Label for="exampleEmail">
                          Material of Inner Pipeline
                        </Label>
                        <Input
                          name="materialOfInnerPipeline"
                          onChange={handleData}
                        />
                      </>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Label for="exampleEmail">Yield Stress of material</Label>
                    <InputGroup>
                      <Input name="yieldStress" onChange={handleData} />
                      <InputGroupAddon addonType="append">
                        <InputGroupText>N/m2</InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                  <Col>
                    {globalInfo["TypeOfPipeline"] ===
                      "Steel Pipe-in-Pipe / Riser" && (
                      <>
                        <Label for="exampleEmail">
                          Yield Stress of inner pipe material
                        </Label>
                        <InputGroup>
                          <Input
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
                <br />
                <br />
                <Row>
                  <Col>
                    <Label for="exampleSelect">
                      Drag Coefficient of the object (Cd)
                    </Label>
                    <Input
                      type="select"
                      name="dragCoeeficient"
                      id="dragCoefficient"
                      onChange={handleData}
                    >
                      <option>Lower End Value</option>
                      <option>Medium Value</option>
                      <option>Upper End Value</option>
                    </Input>
                  </Col>
                  <Col>
                    <Label for="exampleSelect">
                      Added Mass coefficient (Ca)
                    </Label>
                    <Input
                      type="select"
                      name="massCoeficient"
                      id="massCoeeficient"
                      onChange={handleData}
                    >
                      <option>Lower End Value</option>
                      <option>Medium Value</option>
                      <option>Upper End Value</option>
                    </Input>
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
