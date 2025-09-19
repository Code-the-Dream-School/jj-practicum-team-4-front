import { useState } from "react";
// file import
import { isFileValid } from "../../util";

// MUI import
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import {
  Button,
  CircularProgress,
  FormHelperText,
  Grid,
  Input,
  MenuItem,
  Select,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";

const mediaTypeOptions = [
  "Tag1",
  "Tag2",
  "Tag3",
  "Tag4",
  "Tag5",
  "Tag6",
  "Tag7",
  "Tag8",
  "Tag9",
  "Tag10",
];

function SubmissionForm({
  handleSubmission,
  isLoading,
  postArtworkData,
  setIsDialogOpen,
  prompt,
}) {
  const { token } = useAuth();
  const promptData = prompt;
  const decodeToken = jwtDecode(token);
  const userId = decodeToken.userId;

  const [errors, setErrors] = useState({});
  const [imageFile, setImageFile] = useState(postArtworkData?.imageFile || "");
  const [formData, setFormData] = useState({
    imageFile: postArtworkData?.imageFile || null,
    title: postArtworkData?.title || "",
    media_tag: postArtworkData?.media_tag || "",
    description: postArtworkData?.description || "",
    like_counter: 0,
    // social_link: postArtworkData?.social_link || "",
    // createdAt: postArtworkData?.createdAt || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.type === "file") {
      const file = e.target.files[0];
      const validation = isFileValid(file);

      if (validation.error) {
        setErrors((prev) => ({
          ...prev,
          [name]: validation.error,
        }));
        setImageFile("");
        setFormData((prev) => ({ ...prev, imageFile: "" }));
      } else {
        setErrors((prev) => ({ ...prev, [name]: "" }));
        setImageFile(file);
        setFormData((prev) => ({
          ...prev,
          imageFile: file,
        }));
      }
    } else {
      setFormData((prevVal) => ({ ...prevVal, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formData,
      prompt_id: promptData.id,
      userArtworks: userId,
    };

    handleSubmission(dataToSubmit);
  };

  return (
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
            borderColor: errors.imageFile ? "red" : "grey.300",
            transition: "border-color 0.2s ease",
          }}
        >
          {imageFile && (
            <Box sx={{ mb: 2 }}>
              <Box
                width="100%"
                component="img"
                src={URL.createObjectURL(formData.imageFile)}
                alt={`Uploaded image`}
              />
              <Box
                sx={{ display: "flex", justifyContent: "space-between" }}
              ></Box>
            </Box>
          )}

          <Button
            color={
              formData.imageFile
                ? errors.imageFile
                  ? "primary"
                  : "success"
                : "primary"
            }
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={
              !imageFile ? <CloudUploadIcon /> : <DriveFileRenameOutlineIcon />
            }
          >
            {!formData.imageFile ? "Upload files" : `Edit files`}
            <Input
              sx={{
                display: "none",
              }}
              type="file"
              required
              name="imageFile"
              onChange={handleChange}
            />
          </Button>
          <FormHelperText sx={{ mt: 2, textAlign: "center" }}>
            {!formData.imageFile
              ? "Only accepted JPG/PNG. Max 5MB."
              : `File Name: ${formData.imageFile.name}`}
          </FormHelperText>
          {errors.imageFile && (
            <FormHelperText error sx={{ mt: 2, textAlign: "center" }}>
              {errors.imageFile}
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
              defaultValue="tag1"
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
          onClick={() => setIsDialogOpen(true)}
        >
          Cancel
        </Button>
        <Button
          disabled={
            !formData.title.trim() ||
            !formData.imageFile ||
            !formData.media_tag ||
            !formData.description.trim() ||
            errors.title ||
            errors.imageFile ||
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
          {isLoading ? <CircularProgress /> : "next"}
        </Button>
      </Box>
    </Box>
  );
}

export default SubmissionForm;
