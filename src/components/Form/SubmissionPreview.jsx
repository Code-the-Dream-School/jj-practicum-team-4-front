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
import { postSubmissionData } from "../../services/test";

function SubmissionPreview({
  handleClose,
  setStep,
  postData,
  isLoading,
  setIsLoading,
}) {
  const handleSuccess = () => {
    // close the modal
    // display alert says your artwork submission submitted successfully
  };

  const handleFailure = () => {
    // leave modal open
    // display alert says submission failed. try again, or check network.
    // all values in input should be remain.
  };

  const handleSubmissionSuccess = async () => {
    setIsLoading(true);
    try {
      const apiFormData = new FormData();

      apiFormData.append("image_url", postData.image_url);
      apiFormData.append("title", postData.title);
      apiFormData.append("media_tag", postData.media_tag);
      apiFormData.append("description", postData.description);
      apiFormData.append(
        "social_link",
        postData.social_link ? postData.social_link : null
      );
      apiFormData.append("createdAt", postData.createdAt);

      const response = await postSubmissionData(apiFormData);
      if (!response) {
        throw new Error("Failed to post data", response.status);
      }
      console.log("submitted form", response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      handleClose();
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
        <IconButton aria-label="close" onClick={() => handleClose()}>
          <CloseIcon />
        </IconButton>
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
            src={`${postData.image_url}`}
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
              value={postData.title}
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
                value={postData.media_tag}
                name="media_tag"
                label="Media Type"
                disabled
              >
                <MenuItem value={postData.media_tag}>
                  <em>{postData.media_tag}</em>
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
          value={postData.description}
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
          value={postData.mediaLink ? postData.mediaLink : "None"}
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
