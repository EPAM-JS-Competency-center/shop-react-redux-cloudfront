import React, { useCallback, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import API_PATHS from "~/constants/apiPaths";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

type CSVFileImportProps = {
  url: string;
  title: string;
};
const UPLOADED_MESSAGE = " uploaded successfully";
const ERR_ON_UPLOAD = "file upload failure";

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
  const [file, setFile] = useState<File>();
  const [isOpenToaster, setToasterState] = useState(false);
  const [toasterSeverity, setToasterSeverity] = useState<null | boolean>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
    }
  };

  const handleToaster = useCallback(() => {
    setToasterState((state) => !state);
  }, [isOpenToaster]);

  const removeFile = () => {
    setFile(undefined);
  };

  const uploadFile = async () => {
    console.log("uploadFile to", url);
    if (file) {
      const formData = new FormData();
      formData.append(file.name, file);

      await axios
        .post(`${API_PATHS.fileImport}/import?name=data`, formData, {
          headers: {
            Authorization: `Basic ${btoa(
              localStorage.getItem("authorization_token") || ""
            )}`,
          },
        })
        .then((response) => {
          if (response.data) {
            setToasterState(true);
            setToasterSeverity(true);
            setFile(undefined);
          }
        })
        .catch(() => {
          setToasterSeverity(false);
          setToasterState(true);
        });
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
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={isOpenToaster}
        onClose={handleToaster}
        resumeHideDuration={2000}
      >
        <Alert
          onClose={handleToaster}
          severity={toasterSeverity ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {`${file?.name} ${
            toasterSeverity ? UPLOADED_MESSAGE : ERR_ON_UPLOAD
          }`}
        </Alert>
      </Snackbar>
    </Box>
  );
}
