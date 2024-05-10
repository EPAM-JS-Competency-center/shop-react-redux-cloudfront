import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios"

type CSVFileImportProps = {
  url: string;
  title: string;
};

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
  const [file, setFile] = React.useState<File>();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
    }
  };

  const removeFile = () => {
    setFile(undefined);
  };

  const uploadFile = async () => {
    console.log("uploadFile to", url);

    // Get the presigned URL
    try {
      const authToken = localStorage.getItem('authorization_token')
      const response = await axios({
        method: "GET",
        url,
        headers: {
          Authorization: `${authToken}`,
        },
        params: {
          name: encodeURIComponent(file?.name || ""),
        },
      });
      const result = await fetch(encodeURI(`${response.data}?name=${file?.name}`), {
        method: "GET"
      })
      console.log("Result: ", result);
    } catch (err) {
      console.log("err message", err.message)
    }
  };
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {!file ? (
        <input type="file" onChange={onFileChange} />
      ) : (
        <div>
          <button onClick={removeFile}>Remove file</button>
          <button onClick={uploadFile}>Upload file</button>
        </div>
      )}
    </Box>
  );
}
