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
  Divider,
  FormHelperText,
  Grid,
  Input,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

const mediaTypeOptions = ["mixed media", "waterColor", "oil paint", "pencil"];

function Form() {
  const [step, setStep] = React.useState(1);
  const [isSubmit, setIsSubmit] = React.useState(false);
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
    if (e.target.type === "file") {
      const file = e.target.files[0];
      setFormValues((prev) => ({ ...prev, [name]: file.name }));
    } else {
      setFormValues((prevVal) => ({ ...prevVal, [name]: value }));
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
    console.log("submitted", formValues);
    setIsSubmit(true);
  };

  return (
    <Box>
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
          textShadow: "0 2px 4px rgba(0,0,0,0.3)",
        }}
      >
        Upload Your Artwork
      </Typography>

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
        <Box sx={{ mt: 2, mb: 4, textAlign: "center", maxWidth: "100%" }}>
          <Box
            sx={{
              mb: 3,
              p: 8,
              textAlign: "center",
              borderRadius: 2,
              bgcolor: "grey.50",
              border: "2px dashed",
              borderColor: "grey.300",
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
              <Input
                sx={{
                  display: "none",
                }}
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
                : `File Name: ${formValues.imageUrl}`}
            </FormHelperText>
          </Box>
        </Box>
        <Grid
          container
          spacing={{ xs: 1, md: 2 }}
          sx={{ my: { xs: 4, md: 6 } }}
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              error={!!errors.title}
              name="title"
              id="title"
              label="Title of Artwork"
              required
              fullWidth
              value={formValues.title}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={!formValues.title.trim() && "Required"}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl
              variant="standard"
              sx={{ textTransform: "capitalize", my: { xs: 3, md: 0 } }}
              fullWidth
              required
              error={!!errors.mediaType}
            >
              <InputLabel id="demo-simple-select-standard-label">
                Media Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={formValues.mediaType}
                onChange={handleChange}
                onBlur={handleBlur}
                name="mediaType"
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
              {!formValues.mediaType && (
                <FormHelperText error={!!errors.mediaType}>
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
          value={formValues.description}
          placeholder="Tell us about your artwork..."
          sx={{ mb: 6 }}
          helperText={!formValues.description.trim() && "Required"}
        />

        <TextField
          name="mediaLink"
          id="mediaLink"
          label="Social Media Link (optional)"
          fullWidth
          onChange={handleChange}
          value={formValues.mediaLink}
          sx={{ mb: 6 }}
        />
        <Box
          sx={{ display: "flex", justifyContent: "space-around", mt: 2, mb: 4 }}
        >
          <Button color="error" variant="outlined" sx={{ px: 4 }}>
            Cancel
          </Button>
          <Button
            disabled={
              (formValues.title &&
                formValues.imageUrl &&
                formValues.mediaType &&
                formValues.description) == "" || isSubmit
            }
            variant="contained"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              textTransform: "capitalize",
              fontSize: "1.1rem",
            }}
          >
            {isSubmit ? "Submitted" : "next"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Form;
