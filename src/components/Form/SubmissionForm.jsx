import * as React from "react";
// file import
import { isEmpty } from "../../util";

// MUI import
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import {
  Button,
  Divider,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

const mediaTypeOptions = ["mixed media", "waterColor", "oil paint", "pencil"];

function SubmissionForm({
  handleClose,
  handleSubmission,
  isLoading,
  postData,
}) {
  const [errors, setErrors] = React.useState({});
  const [imageFile, setImageFile] = React.useState(postData?.image_url || "");
  const [formData, setFormData] = React.useState({
    image_url: imageFile,
    title: postData?.title || "",
    media_tag: postData?.media_tag || "",
    description: postData?.description || "",
    social_link: postData?.social_link || "",
    createdAt: postData?.createdAt || "",
  });

  const formRules = {
    image_url: { required: true },
    title: { required: true },
    media_tag: { required: true },
    description: { required: true },
    mediaLink: { required: false },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.type === "file") {
      const file = e.target.files[0];
      setImageFile(file);
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          [name]: "Please select an image file!",
        }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          [name]: "File too large! File must not exceed 5MB",
        }));
        return;
      }
      setFormData((prev) => ({
        ...prev,
        image_url: URL.createObjectURL(file),
      }));
    } else {
      setFormData((prevVal) => ({ ...prevVal, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prevErr) => ({ ...prevErr, [name]: "" }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const fieldRules = formRules[name];

    if (fieldRules && fieldRules.required && isEmpty(value)) {
      setErrors((prevErr) => ({
        ...prevErr,
        [name]: "This field is required",
      }));
    }
    if (isEmpty(value)) return;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      createdAt: new Date().toISOString(),
    }));
    handleSubmission(formData);
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
          Upload Your Artwork
        </Typography>
        <IconButton aria-label="close" onClick={() => handleClose(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
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

      <Box component="form" sx={{ p: 3 }}>
        <Box
          sx={{
            textAlign: "center",
            maxWidth: "100%",
          }}
        >
          <Box
            sx={{
              p: 8,
              textAlign: "center",
              borderRadius: 2,
              bgcolor: "grey.50",
              border: "2px dashed",
              borderColor: errors.image_url ? "red" : "grey.300",
              transition: "border-color 0.2s ease",
            }}
          >
            {imageFile && (
              <Box sx={{ mb: 2 }}>
                <Box
                  width="100%"
                  component="img"
                  src={`${formData.image_url}`}
                  alt={`Uploaded image`}
                />
                <Box
                  sx={{ display: "flex", justifyContent: "space-between" }}
                ></Box>
              </Box>
            )}

            <Button
              color={
                formData.image_url
                  ? errors.image_url
                    ? "primary"
                    : "success"
                  : "primary"
              }
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={
                !imageFile ? (
                  <CloudUploadIcon />
                ) : (
                  <DriveFileRenameOutlineIcon />
                )
              }
              onBlur={handleBlur}
            >
              {!formData.image_url ? "Upload files" : `Edit files`}
              <Input
                sx={{
                  display: "none",
                }}
                type="file"
                required
                name="image_url"
                onChange={handleChange}
              />
            </Button>
            <FormHelperText sx={{ mt: 2, textAlign: "center" }}>
              {!formData.image_url
                ? "Only accepted JPG/PNG. Max 5MB."
                : `File Name: ${imageFile.name}`}
            </FormHelperText>
            {errors.image_url && (
              <FormHelperText error sx={{ mt: 2, textAlign: "center" }}>
                {errors.image_url}
              </FormHelperText>
            )}
          </Box>
        </Box>
        <Grid container spacing={2} sx={{ my: 2 }}>
          <Grid size={6}>
            <TextField
              error={!!errors.title}
              name="title"
              id="title"
              label="Title of Artwork"
              required
              fullWidth
              size="small"
              value={formData.title}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={!formData.title.trim() && "Required"}
            />
          </Grid>

          <Grid size={6}>
            <FormControl
              size="small"
              sx={{
                textTransform: "capitalize",
              }}
              fullWidth
              required
              error={!!errors.media_tag}
            >
              <InputLabel id="demo-simple-select-standard-label">
                Media Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={formData.media_tag}
                onChange={handleChange}
                onBlur={handleBlur}
                name="media_tag"
                label="Media Type"
              >
                <MenuItem value="">
                  <em>Select Media Type</em>
                </MenuItem>
                {mediaTypeOptions.map((type) => (
                  <MenuItem
                    key={type}
                    value={type}
                    sx={{ textTransform: "capitalize" }}
                  >
                    {type}
                  </MenuItem>
                ))}
              </Select>
              {!formData.media_tag && (
                <FormHelperText error={!!errors.media_tag}>
                  Required
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>

        <TextField
          error={!!errors.description}
          name="description"
          id="description"
          label="Artwork Description"
          required
          fullWidth
          multiline
          rows={4}
          onChange={handleChange}
          onBlur={handleBlur}
          value={formData.description}
          placeholder="Tell us about your artwork..."
          sx={{ mb: 2 }}
          helperText={!formData.description.trim() && "Required"}
        />

        <TextField
          name="mediaLink"
          size="small"
          id="mediaLink"
          label="Social Media Link (optional)"
          fullWidth
          onChange={handleChange}
          value={formData.mediaLink}
          sx={{ mb: 2 }}
        />
        <Box
          sx={{ display: "flex", justifyContent: "space-around", mt: 2, mb: 1 }}
        >
          <Button
            color="error"
            variant="outlined"
            sx={{ px: 4 }}
            onClick={() => handleClose(false)}
          >
            Cancel
          </Button>
          <Button
            disabled={
              !formData.title ||
              !formData.image_url ||
              !formData.media_tag ||
              !formData.description ||
              errors.title ||
              errors.image_url ||
              errors.media_tag ||
              errors.description ||
              isLoading
            }
            variant="contained"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              textTransform: "capitalize",
              fontSize: "1.1rem",
            }}
            onClick={handleSubmit}
          >
            {isLoading ? "Loading..." : "next"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default SubmissionForm;
