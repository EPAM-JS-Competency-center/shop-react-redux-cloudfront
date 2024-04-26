import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";

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
    try {
      if (!file) {
        return;
      }
      const response = await axios({
        method: "GET",
        headers: {
          Authorization: `${localStorage.getItem("authorization_token")}`,
        },
        url,
        params: {
          name: encodeURIComponent(file.name),
        },
      });

      if (response.status === 401) {
        alert("Unauthorized: Invalid or expired token");
        return;
      }

      if (response.status === 403) {
        alert("Forbidden: You do not have permission to perform this action");
        return;
      }

      console.log("File to upload: ", file.name);
      console.log("Uploading to: ", response.data);
      const result = await fetch(response.data, {
        method: "PUT",
        body: file,
      });

      console.log("Result: ", result);
      setFile(undefined);
    } catch (error) {
      console.log(error, "Ddsdsds");
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
