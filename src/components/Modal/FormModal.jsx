import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
import SubmissionForm from "../Form/SubmissionForm";
import SubmissionPreview from "../Form/SubmissionPreview";

function FormModal({ shownModal, setShownModal }) {
  const [step, setStep] = useState(1);
  const [postData, setPostData] = useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const handleSubmission = (data) => {
    setPostData(data);
    setStep(2);
  };

  const handleClose = () => {
    setStep(1);
    setPostData(null);
    setShownModal(false);
  };
  return (
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
            postData={postData}
            handleClose={handleClose}
          />
        )}
        {step === 2 && (
          <SubmissionPreview
            setShownModal={setShownModal}
            setStep={setStep}
            postData={postData}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            handleClose={handleClose}
          />
        )}
      </Box>
    </Modal>
  );
}

export default FormModal;
