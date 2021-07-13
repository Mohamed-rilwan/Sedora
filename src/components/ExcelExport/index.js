import React from "react";
import axios from "axios";

import { ExportToExcel } from "./ExportToExcel";

function Export(props) {
  const { name, apiData } = props;
  const [data, setData] = React.useState([]);
  const fileName = name; // here enter filename for your excel file

  React.useEffect(() => {
    const fetchData = () => {
      axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((r) => setData(r.data));
    };
    fetchData();
  }, []);

  return (
    <div>
      <ExportToExcel apiData={apiData} fileName={fileName} />
    </div>
  );
}

export default Export;
