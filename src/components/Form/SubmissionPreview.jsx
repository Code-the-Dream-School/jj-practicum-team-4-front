import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import {
  Button,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import ConfirmModal from "../Modal/ConfirmModal";
import { postData } from "../../util";
import { useAuth } from "../../context/AuthContext";

const baseUrl = import.meta.env.VITE_API_URL;

function SubmissionPreview({
  handleClose,
  setStep,
  postArtworkData,
  isLoading,
  setIsLoading,
  isDialogOpen,
  setIsDialogOpen,
  setAlertMessage,
  setAlertSeverity,
  setAlertOpen,
  setAlertTitle,
}) {
  const { token } = useAuth();

  const handleSubmissionSuccess = async () => {
    const apiFormData = new FormData();

    // Append each field individually
    apiFormData.append("prompt_id", postArtworkData.prompt_id);
    apiFormData.append("user_id", postArtworkData.user_id);
    apiFormData.append("image_url", postArtworkData.imageFile);
    apiFormData.append("title", postArtworkData.title);
    apiFormData.append("media_tag", postArtworkData.media_tag);
    apiFormData.append("description", postArtworkData.description);
    // apiFormData.append("social_link", postArtworkData.social_link || "");
    apiFormData.append("like_counter", postArtworkData.like_counter);
    // apiFormData.append("createdAt", postArtworkData.createdAt);

    for (let pair of apiFormData.entries()) {
      console.log(pair[0] + ":" + pair[1]);
    }
    setIsLoading(true);
    // console.log(postArtworkData.imageFile.file);

    try {
      const response = await postData(`${baseUrl}/api/artwork`, apiFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);

      if (!response.data) {
        setIsLoading(false);
        throw new Error(response);
      }

      handleClose();
      setAlertOpen(true);
      setAlertTitle("Uploaded Successfully");
      setAlertMessage("Your artwork successfully uploaded. Great work!");
      setAlertSeverity("success");
      setIsLoading(false);
    } catch (error) {
      // console.log(error.message);
      setAlertOpen(true);
      setAlertTitle(error.message);
      setAlertMessage(
        error.response?.data?.message || error.response?.statusText
      );
      setAlertSeverity("error");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Box sx={{ maxHeight: "100vh", boxSizing: "border-box" }}>
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
          Review Upload Your Artwork
        </Typography>
        <IconButton aria-label="close" onClick={() => setIsDialogOpen(true)}>
          <CloseIcon />
        </IconButton>
        <ConfirmModal
          handleClose={handleClose}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          message="Your form data will be lost if you close this window. Are you sure you want to continue?"
        />
      </Box>
      {/* Challenge Info Section */}
      <Box sx={{ p: 3, textAlign: "center", bgcolor: "grey.50" }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            textTransform: "capitalize",
            color: "text.primary",
          }}
        >
          Weekly Challenge Topic
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 2, color: "text.secondary" }}>
          Duration: 00/00/0000 - 00/00/0000
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            mx: "auto",
            color: "text.secondary",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores ut
          nisi, fuga obcaecati et tenetur corrupti facere eos nemo a natus,
          maxime aperiam delectus in? Quibusdam illum earum consequuntur?
          Officiis.
        </Typography>
      </Box>

      <Divider />

      {/* Form Section */}
      <Box sx={{ p: 3 }}>
        {/* image preview */}
        <Box sx={{ mt: 2, mb: 4 }}>
          <Typography color="text.secondary">Uploaded image</Typography>
          <Box
            width="100%"
            component="img"
            src={URL.createObjectURL(postArtworkData.imageFile)}
            alt={`Uploaded image`}
          />
        </Box>
        <Grid container spacing={2} sx={{ my: 2 }}>
          {/* Title Field */}
          <Grid size={6}>
            <TextField
              name="title"
              label="Title of Artwork"
              fullWidth
              size="small"
              value={postArtworkData.title}
              disabled
            />
          </Grid>

          {/* Media Type Field */}
          <Grid size={6}>
            <FormControl
              size="small"
              sx={{ width: "90%", textTransform: "capitalize" }}
            >
              <InputLabel id="demo-simple-select-standard-label">
                Media Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={postArtworkData.media_tag}
                name="media_tag"
                label="Media Type"
                disabled
              >
                <MenuItem value={postArtworkData.media_tag}>
                  <em>{postArtworkData.media_tag}</em>
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Description Field */}
        <TextField
          name="description"
          id="description"
          label="Artwork Description"
          fullWidth
          multiline
          rows={4}
          value={postArtworkData.description}
          sx={{ mb: 3 }}
          disabled
        />

        {/* Social Media Link Field */}
        <TextField
          size="small"
          name="mediaLink"
          id="mediaLink"
          label="Social Media Link (optional)"
          fullWidth
          value={postArtworkData.mediaLink ? postArtworkData.mediaLink : "None"}
          sx={{ mb: 2 }}
          disabled
        />

        {/* Action Button */}
        <Box sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ px: 4 }}
            onClick={() => setStep(1)}
          >
            Edit
          </Button>
          <Button
            disabled={isLoading}
            variant="contained"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
            }}
            onClick={() => handleSubmissionSuccess()}
          >
            {isLoading ? "Submitting..." : "submit"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default SubmissionPreview;
