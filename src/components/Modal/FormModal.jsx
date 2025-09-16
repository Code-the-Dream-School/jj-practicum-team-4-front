import {
  Alert,
  AlertTitle,
  Box,
  IconButton,
  Modal,
  Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import React, { useState } from "react";
import SubmissionForm from "../Form/SubmissionForm";
import SubmissionPreview from "../Form/SubmissionPreview";

function FormModal({ shownModal, setShownModal }) {
  const [step, setStep] = useState(1);
  const [postArtworkData, setPostArtworkData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // console.log(
  //   "post Artwork data form parent component Form Modal:",
  //   postArtworkData
  // );
  // UI alert
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");

  const handleSubmission = (data) => {
    setPostArtworkData(data);
    setStep(2);
  };

  const handleClose = () => {
    setStep(1);
    setPostArtworkData(null);
    setShownModal(false);
    setIsDialogOpen(false);
  };
  return (
    <>
      <Modal open={shownModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: 800,
            width: "90%",
            bgcolor: "background.paper",
            boxShadow: 24,
            overflowY: "auto",
          }}
        >
          {step === 1 && (
            <SubmissionForm
              setShownModal={setShownModal}
              handleSubmission={handleSubmission}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              postArtworkData={postArtworkData}
              handleClose={handleClose}
              setIsDialogOpen={setIsDialogOpen}
              isDialogOpen={isDialogOpen}
            />
          )}
          {step === 2 && (
            <SubmissionPreview
              setShownModal={setShownModal}
              setStep={setStep}
              postArtworkData={postArtworkData}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              handleClose={handleClose}
              setIsDialogOpen={setIsDialogOpen}
              isDialogOpen={isDialogOpen}
              setAlertMessage={setAlertMessage}
              setAlertSeverity={setAlertSeverity}
              setAlertOpen={setAlertOpen}
              setAlertTitle={setAlertTitle}
            />
          )}
        </Box>
      </Modal>
      <Snackbar
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={alertSeverity}
          sx={{ width: "100%" }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlertOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>{alertTitle}</AlertTitle>
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default FormModal;
