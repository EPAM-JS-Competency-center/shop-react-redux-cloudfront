import React, { useCallback, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";

type CSVFileImportProps = {
  url: string;
  title: string;
};

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
  const [file, setFile] = React.useState<File | undefined>(undefined);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("filehChange", e.target.files);
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

    if (!file) {
      console.log("No file to upload.");
      return;
    }

    const authorizationToken = localStorage.getItem("authorization_token");
    if (!authorizationToken) {
      console.error("Authorization token not found in local storage");
      return;
    }

    try {
      // Get the presigned URL
      const response = await axios({
        method: "GET",
        url,
        params: {
          name: encodeURIComponent(file.name),
        },
        headers: {
          Authorization: `Basic ${authorizationToken}`,
        },
      });

      const presignedUrl = response.data.url;
      console.log("File to upload: ", file.name);
      console.log("Uploading to: ", presignedUrl);

      const result = await fetch(presignedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": "text/csv",
        },
      });

      if (result.ok) {
        console.log("Upload successful");
      } else {
        console.error("Upload failed", result.statusText);
      }
    } catch (error) {
      console.error("Error during file upload", error);
    }

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
          <button onClick={removeFile}>Remove file</button>
          <button onClick={uploadFile}>Upload file</button>
        </div>
      )}
    </Box>
  );
}
