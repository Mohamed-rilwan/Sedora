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
import * as XLSX from "xlsx";

function ExistingTemplate(props) {
  const hiddenFileInput = React.useRef(null);
  const [items, setItems] = React.useState([]);

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    // props.handleFile(fileUploaded);
  };

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });

        //Global Information
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setItems(d);
    });
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  return (
    <>
      <div className="content">
        <Card>
          <CardHeader>
            <CardTitle tag="h5">
              Choose an existing file for Frequency Calculation
            </CardTitle>
            <FormText color="muted">
              Validate the file for all the input values before uploading
            </FormText>
          </CardHeader>
          <CardBody style={{ height: "266px" }}>
            <FormGroup>
              <div>
                <Button
                  style={{
                    width: "50%",
                    height: "100px",
                    backgroundColor: "#70D4D6",
                    margin: "5% 0 0 30%",
                  }}
                  onClick={handleClick}
                >
                  Upload a file
                </Button>
                <input
                  type="file"
                  ref={hiddenFileInput}
                  onChange={handleChange}
                  style={{ display: "none" }}
                />
              </div>
            </FormGroup>
          </CardBody>
          <CardFooter>
            <div className="legend">
              <i className="fa fa-circle text-primary" /> Opened{" "}
              <i className="fa fa-circle text-warning" /> Read{" "}
              <i className="fa fa-circle text-danger" /> Deleted{" "}
              <i className="fa fa-circle text-gray" /> Unopened
            </div>

            <div>
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  readExcel(file);
                }}
              />

              <table class="table container">
                <thead>
                  <tr>
                    <th scope="col">Item</th>
                    <th scope="col">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((d) => (
                    <tr key={d.Item}>
                      <th>{d.Item}</th>
                      <td>{d.Description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default ExistingTemplate;
