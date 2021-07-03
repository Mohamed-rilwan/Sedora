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
import React, { useState } from "react";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
} from "reactstrap";
import GlobalInformation from "./User Input/GlobalInformation";
import ImpactProtection from "./User Input/ImpactProtection";
import ImpactType from "./User Input/ImpactType";
import LiftManifest from "./User Input/LiftManifest";
import TargetLayout from "./User Input/TargetLayout";

const stepName = (step) => {
  if (step === 0) return "Global Information";
  if (step === 1) return "Lift Manifest";
  if (step === 2) return "Target Layout";
  if (step === 3) return "Impact Type";
  if (step === 4) return "Impact Protection";
};

function Example() {
  const [currentPage, setCurrentPage] = useState(0);
  const [validInfo, setValidInfo] = useState(false);

  const pagesCount = 5;

  const handlePageClick = (e, index) => {
    console.log(index);
    e.preventDefault();
    setCurrentPage(index);
  };
  return (
    <>
      <div className="content">
        <Pagination
          style={{ marginLeft: "25%" }}
          size="md"
          aria-label="Page navigation example"
        >
          <PaginationItem disabled={currentPage === 0}>
            <PaginationLink
              previous
              href="#"
              onClick={() =>
                setCurrentPage(currentPage < 1 ? currentPage - 1 : 0)
              }
            />
          </PaginationItem>
          {[...Array(pagesCount)].map((page, i) => (
            <PaginationItem active={i === currentPage} key={i}>
              <PaginationLink onClick={(e) => handlePageClick(e, i)} href="#">
                {stepName(i)}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem disabled={currentPage === 4}>
            <PaginationLink
              next
              href="#"
              onClick={() =>
                setCurrentPage(currentPage < 5 ? currentPage + 1 : 4)
              }
            />
          </PaginationItem>
        </Pagination>

        <Row>
          <Col md="12">
            {currentPage === 0 && <GlobalInformation />}
            {currentPage === 1 && <LiftManifest numberOfitem={10} />}
            {currentPage === 2 && (
              <TargetLayout
                maxWaterDepth={210.46}
                maxDistanceFomDropPoint={110.45}
              />
            )}
            {currentPage === 3 && (
              <ImpactType
                maxWaterDepth={210.46}
                maxDistanceFomDropPoint={110.45}
              />
            )}
            {currentPage === 4 && (
              <ImpactProtection
                maxWaterDepth={210.46}
                maxDistanceFomDropPoint={110.45}
              />
            )}
          </Col>
        </Row>

        <Button
          style={{ marginLeft: "45%" }}
          className="btn-round"
          color="primary"
          type="submit"
          disabled={!validInfo}
        >
          Generate Template
        </Button>
      </div>
    </>
  );
}

export default Example;
