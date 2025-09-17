import {
  Alert,
  AlertTitle,
  Box,
  IconButton,
  Modal,
  Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import React, { useEffect, useState } from "react";
import SubmissionForm from "../Form/SubmissionForm";
import SubmissionPreview from "../Form/SubmissionPreview";
import { getData } from "../../util";

const baseUrl = import.meta.env.VITE_API_URL;

function FormModal({ shownModal, setShownModal }) {
  const [step, setStep] = useState(1);
  const [postArtworkData, setPostArtworkData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [prompt, setPrompt] = useState(null);
  // UI alert
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");

  useEffect(() => {
    getWeeklyPrompt();
  }, []);

  const getWeeklyPrompt = async () => {
    setIsLoading(true);
    try {
      const response = await getData(`${baseUrl}/api/prompts/active`);
      if (!response.success) {
        throw new Error(response.message || "failed to get data");
      }
      setPrompt(response);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };
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
              prompt={prompt}
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
              prompt={prompt}
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
