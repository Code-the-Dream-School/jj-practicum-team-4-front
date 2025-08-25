import * as React from "react";
// file import
import { isEmpty } from "../../util";

// MUI import
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Button,
  Container,
  Divider,
  FormHelperText,
  Grid,
  MenuItem,
  Paper,
  Select,
  styled,
  Typography,
} from "@mui/material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const mediaType = ["mixed media", "waterColor", "oil paint", "pencil"];

function Form() {
  const [errors, setErrors] = React.useState({});
  const [formValues, setFormValues] = React.useState({
    imageUrl: "",
    title: "",
    mediaType: "",
    description: "",
    mediaLink: "",
  });

  const formRules = {
    imageUrl: { required: true },
    title: { required: true },
    mediaType: { required: true },
    description: { required: true },
    mediaLink: { required: false },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevVal) => ({ ...prevVal, [name]: value }));

    if (errors[name]) {
      setErrors((prevErr) => ({ ...prevErr, [name]: "" }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const fieldRules = formRules[name];
    console.log(fieldRules.required);
    if (fieldRules.required && isEmpty(value)) {
      setErrors((prevErr) => ({
        ...prevErr,
        [name]: "This field is required",
      }));
    }
    if (isEmpty(value)) return;
  };

  console.log(errors);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted", formValues);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ overflow: "hidden" }}>
        {/* Header */}
        <Typography
          component="h1"
          variant="h4"
          sx={{
            p: 3,
            textTransform: "capitalize",
            fontWeight: "bold",
            bgcolor: "primary.main",
            color: "white",
            textAlign: "center",
          }}
        >
          Upload Your Artwork
        </Typography>

        {/* Challenge Info Section */}
        <Box sx={{ p: 3, textAlign: "center", bgcolor: "grey.50" }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              mb: 2,
              textTransform: "capitalize",
              color: "text.primary",
            }}
          >
            Weekly Challenge Topic
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ mb: 2, color: "text.secondary" }}
          >
            Duration: 00/00/0000 - 00/00/0000
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: "600px",
              mx: "auto",
              lineHeight: 1.6,
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
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mb: 3, width: "100%" }}
          >
            {/* File Upload Field */}
            <Box
              sx={{
                mb: 3,
                p: 3,
                textAlign: "center",
                borderRadius: 2,
                bgcolor: "grey.50",
                border: "2px dashed",
                borderColor: errors.imageUrl ? "error.main" : "grey.300",
                transition: "border-color 0.2s ease",
              }}
            >
              <Button
                color={!formValues.imageUrl ? "primary" : "success"}
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                aria-required
                onBlur={handleBlur}
              >
                {!formValues.imageUrl ? "Upload files" : "File Uploaded"}
                <VisuallyHiddenInput
                  type="file"
                  required
                  name="imageUrl"
                  onChange={handleChange}
                  multiple
                />
              </Button>
              <FormHelperText sx={{ mt: 2, textAlign: "center" }}>
                {!formValues.imageUrl
                  ? "File rules shows here e.g. JPG, JPEC, PNG and WEBP. Max 15MB."
                  : formValues.imageUrl}
              </FormHelperText>
            </Box>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {/* Title Field */}
              <Grid size={6}>
                <TextField
                  error={!!errors.title}
                  name="title"
                  id="title"
                  label="Title of Artwork"
                  variant="outlined"
                  required
                  fullWidth
                  value={formValues.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "56px",
                    },
                  }}
                  helperText={!formValues.title.trim() && "Required"}
                />
              </Grid>

              {/* Media Type Field */}
              <Grid size={6}>
                <FormControl
                  variant="standard"
                  sx={{ width: "90%", textTransform: "capitalize" }}
                  required
                >
                  <InputLabel id="demo-simple-select-standard-label">
                    Media Type
                  </InputLabel>
                  <Select
                    error={!!errors.mediaType}
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={formValues.mediaType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="mediaType"
                    label="Media Type"
                  >
                    <MenuItem value="">
                      <em>Media Type</em>
                    </MenuItem>
                    {mediaType.map((type) => (
                      <MenuItem
                        key={type}
                        value={type}
                        sx={{ textTransform: "capitalize" }}
                      >
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                  {!formValues.mediaType && (
                    <FormHelperText error={!!errors.mediaType}>
                      Required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>

            {/* Description Field */}
            <TextField
              error={!!errors.description}
              name="description"
              id="description"
              label="Artwork Description"
              variant="outlined"
              required
              fullWidth
              multiline
              rows={4}
              onChange={handleChange}
              onBlur={handleBlur}
              value={formValues.description}
              placeholder="Tell us about your artwork..."
              sx={{ mb: 3 }}
              helperText={!formValues.description.trim() && "Required"}
            />

            {/* Social Media Link Field */}
            <TextField
              name="mediaLink"
              id="mediaLink"
              label="Social Media Link (optional)"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              value={formValues.mediaLink}
              sx={{ mb: 2 }}
            />
            {/* Submit Button */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button
                disabled={
                  (formValues.title &&
                    formValues.imageUrl &&
                    formValues.mediaType &&
                    formValues.description) == ""
                }
                type="submit"
                variant="contained"
                size="large"
                onSubmit={handleSubmit}
                sx={{
                  px: 4,
                  py: 1.5,
                  textTransform: "capitalize",
                  fontSize: "1.1rem",
                }}
              >
                Upload Artwork
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default Form;
