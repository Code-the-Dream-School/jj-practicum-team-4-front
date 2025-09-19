import {
  Alert,
  AlertTitle,
  Box,
  CircularProgress,
  Divider,
  IconButton,
  Modal,
  Snackbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useEffect, useState } from "react";
import SubmissionForm from "../Form/SubmissionForm";
import SubmissionPreview from "../Form/SubmissionPreview";
import { getData } from "../../util";
import ConfirmModal from "./ConfirmModal";

const baseUrl = import.meta.env.VITE_API_URL;

function FormModal({ shownModal, setShownModal }) {
  // console.log(isLoading);
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

  const formatted = (date) => {
    const formatDate = new Date(date);
    return formatDate
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      .replace(",", "");
  };
  const getWeeklyPrompt = async () => {
    setIsLoading(true);
    try {
      const response = await getData(`${baseUrl}/api/prompts/active`);
      if (!response.success) {
        throw new Error(response.message || "failed to get data");
      }
      console.log(response);
      setPrompt(response.prompt);
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
          <Box sx={{ maxHeight: "100vh", boxSizing: "border-box" }}>
            {!prompt ? (
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    bgcolor: "primary.main",
                    p: { xs: 1, md: 3 },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      textTransform: "capitalize",
                      fontWeight: "bold",
                      color: "white",
                      textAlign: "center",
                      textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                    }}
                  >
                    {step === 1 ? "Upload Your Artwork" : "Review Your upload"}
                  </Typography>
                  <IconButton
                    aria-label="close"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    <CloseIcon />
                  </IconButton>

                  <ConfirmModal
                    setIsDialogOpen={setIsDialogOpen}
                    isDialogOpen={isDialogOpen}
                    handleClose={handleClose}
                    message="Your form data will be lost if you close this window. Are you sure you want to continue?"
                  />
                </Box>
                <Box sx={{ p: 3, textAlign: "center", bgcolor: "grey.50" }}>
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{
                      mb: 1,
                      textTransform: "uppercase",
                      color: "text.primary",
                    }}
                  >
                    {prompt.title}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ mb: 2, color: "text.secondary" }}
                  >
                    {`${formatted(prompt.start_date)} - ${formatted(prompt.end_date)}`}
                  </Typography>
                  <Divider />
                  <Typography
                    variant="body1"
                    sx={{
                      mt: 2,
                      mx: "auto",
                    }}
                  >
                    {prompt.description}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {prompt.rule}
                  </Typography>
                </Box>
              </>
            )}

            <Divider />

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
                formatted={formatted}
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
                formatted={formatted}
              />
            )}
          </Box>
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
