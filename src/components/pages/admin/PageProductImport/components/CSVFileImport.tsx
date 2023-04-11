import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios, { AxiosError } from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type CSVFileImportProps = {
  url: string;
  title: string;
};

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
  const [file, setFile] = React.useState<File>();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [credentials, setCredentials] = React.useState("");

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

  useEffect(() => {
    const token = localStorage.getItem("authorization_token");
    console.log("your token is:", token);

    setIsLoggedIn(!!token);

    if (token) {
      setCredentials(token);
    }
  }, []);

  const signOut = () => {
    localStorage.removeItem("authorization_token");
    setIsLoggedIn(false);
    setCredentials("");
  };

  const uploadFile = async () => {
    console.log("uploadFile to", url);
    if (!file) {
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
          ...(credentials && { Authorization: `Basic ${credentials}` }),
        },
      });

      console.log(response.status, "statuuus");

      console.log("File to upload: ", file.name);
      console.log("Uploading to: ", response.data);
      const result = await fetch(response.data.url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": "text/csv",
        },
      });

      console.log("Result: ", result);

      setFile(undefined);
    } catch (error) {
      if (error instanceof AxiosError && error?.response?.status === 403) {
        toast.error("You are not authorized", {
          position: toast.POSITION.TOP_CENTER,
        });
      }

      if (error instanceof AxiosError && error?.response?.status === 401) {
        toast.error("Credentials missing", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      console.log(error);
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
          {isLoggedIn && <button onClick={signOut}>sign out</button>}
          <ToastContainer />
        </div>
      )}
    </Box>
  );
}
