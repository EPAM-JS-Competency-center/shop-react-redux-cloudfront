import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";

type CSVFileImportProps = {
  url: string;
  title: string;
};

export default function CSVFileImport({
  url,
  title,
}: Readonly<CSVFileImportProps>) {
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
    if (!file) {
      console.error("File is not defined!");
      return;
    }

    console.log("...getting signed URL from:", url);

    // Get the presigned URL
    const response = await axios({
      method: "GET",
      url,
      params: {
        name: encodeURIComponent(file.name),
      },
    });

    const { signedUrl } = response.data;

    console.log("File to upload: ", file.name);
    console.log("Uploading to: ", signedUrl);
    const result = await fetch(signedUrl, {
      method: "PUT",
      body: file,
    });
    console.log("Result: ", result);
    setFile(undefined);
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
          <span>{file.name} </span>
          <button onClick={removeFile}>Remove file</button>
          <span> </span>
          <button onClick={uploadFile}>Upload file</button>
        </div>
      )}
    </Box>
  );
}
