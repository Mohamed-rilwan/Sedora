/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  FormGroup,
  FormText,
} from "reactstrap";

function ExistingTemplate(props) {
  const hiddenFileInput = React.useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    props.handleFile(fileUploaded);
  };
  return (
    <>
      <div className="content">
        <Card>
          <CardHeader>
            <CardTitle tag="h5">
              Choose an existing file for Frequency Calculation
            </CardTitle>
          </CardHeader>
          <CardBody style={{ height: "266px" }}>
            <FormGroup>
              <>
                <Button onClick={handleClick}>Upload a file</Button>
                <input
                  type="file"
                  ref={hiddenFileInput}
                  onChange={handleChange}
                  style={{ display: "none" }}
                />
              </>
              <FormText color="muted">
                Validate the file for all the input values before uploading
              </FormText>
            </FormGroup>
          </CardBody>
          <CardFooter>
            <div className="legend">
              <i className="fa fa-circle text-primary" /> Opened{" "}
              <i className="fa fa-circle text-warning" /> Read{" "}
              <i className="fa fa-circle text-danger" /> Deleted{" "}
              <i className="fa fa-circle text-gray" /> Unopened
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default ExistingTemplate;
