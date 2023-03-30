import React from "react";
import axios, { AxiosRequestConfig } from "axios";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

type CSVFileImportProps = {
  url: string;
  title: string;
};

const getAuthHeader = (): string => {
  const authToken = localStorage.getItem('authorization_token');
  const authValue = `Basic ${authToken}` as string;
  return authValue;
}


export default function CSVFileImport({ url, title }: CSVFileImportProps) {
  const [file, setFile] =  React.useState<File>();

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
    const requestConfig: AxiosRequestConfig = {
      method: "GET",
      url,
      params: {
        name: encodeURIComponent((file as File).name ),
      },
      headers: {
        Authorization: getAuthHeader()
      }
    }
    
    try {
      const response = await axios(requestConfig);

      console.log("File to upload: ", (file as File).name);
      console.log("Uploading to: ", response.data);

      const result = await fetch(response.data, {
        method: "PUT",
        body: file,
      });

      console.log("Result: ", result);
      setFile("" as unknown as File);
    } catch (error: any) {
      console.log(`Something went wrong: ${error.message}`)
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
