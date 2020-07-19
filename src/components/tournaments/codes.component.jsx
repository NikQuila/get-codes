// Por cada sku
import React from "react";
import "firebase/database";
import "firebase/firestore";
import "firebase/database";
import "./codes.styles.scss";
import Button from "react-bootstrap/Button";
const LinkentreSkuYFirebase = ({ sku, click }) => (
  <div className="sku">
    <h2> {sku}</h2>
    <Button
      variant="success"
      onClick={() => {
        click(sku);
      }}
    >
      Get Code
    </Button>
  </div>
);
export default LinkentreSkuYFirebase;
