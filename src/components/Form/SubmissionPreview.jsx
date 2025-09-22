// import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
// import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import {
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { postData } from "../../util";
import { useAuth } from "../../context/AuthContext";

const baseUrl = import.meta.env.VITE_API_URL;

function SubmissionPreview({
  handleClose,
  setStep,
  postArtworkData,
  isLoading,
  setIsLoading,
  setAlertMessage,
  setAlertSeverity,
  setAlertOpen,
  setAlertTitle,
}) {
  const { token } = useAuth();
  const handleSubmissionSuccess = async () => {
    const apiFormData = new FormData();

    apiFormData.append("prompt_id", postArtworkData.prompt_id);
    apiFormData.append("user_id", postArtworkData.user_id);

    apiFormData.append("file", postArtworkData.imageFile);

    apiFormData.append("title", postArtworkData.title);
    apiFormData.append("media_tag", postArtworkData.media_tag);
    apiFormData.append("description", postArtworkData.description);
    apiFormData.append("like_counter", postArtworkData.like_counter);

    setIsLoading(true);
    try {
      const response = await postData(`${baseUrl}/api/artwork`, apiFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      if (!response) {
        setIsLoading(false);
        throw new Error(response);
      }

      handleClose();
      setAlertOpen(true);
      setAlertTitle("Uploaded Successfully");
      setAlertMessage("Your artwork successfully uploaded. Great work!");
      setAlertSeverity("success");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
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
    <Box sx={{ p: 3 }}>
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
          {isLoading ? <CircularProgress /> : "submit"}
        </Button>
      </Box>
    </Box>
  );
}

export default SubmissionPreview;
