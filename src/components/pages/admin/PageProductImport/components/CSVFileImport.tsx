import React from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

type CSVFileImportProps = {
  url: string;
  title: string;
};

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
  const [file, setFile] = React.useState<File | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const uploadFile = async () => {
    console.log("uploadFile to", url);

    try {
      if (file) {
        const token = localStorage.getItem("authorization_token");
        const response = await axios({
          method: "GET",
          url,
          headers: token
            ? {
                Authorization: `Basic ${token}`,
              }
            : {},
          params: {
            name: encodeURIComponent(file.name),
          },
        });

        await fetch(response.data, {
          method: "PUT",
          body: file,
        });

        setFile(null);
        return alert("Success");
      }
    } catch (error) {
      return alert("Error: " + error);
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
