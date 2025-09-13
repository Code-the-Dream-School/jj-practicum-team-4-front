import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
import SubmissionForm from "../Form/SubmissionForm";
import SubmissionPreview from "../Form/SubmissionPreview";

function FormModal({ shownModal, setShownModal }) {
  const [step, setStep] = useState(1);
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
          <SubmissionForm setShownModal={setShownModal} setStep={setStep} />
        )}
        {step === 2 && (
          <SubmissionPreview setShownModal={setShownModal} setStep={setStep} />
        )}
      </Box>
    </Modal>
  );
}

export default FormModal;
