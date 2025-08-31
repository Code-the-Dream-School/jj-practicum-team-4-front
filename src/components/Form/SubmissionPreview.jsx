import React from "react";
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
function SubmissionPreview() {
  const [errors, setErrors] = React.useState({});
  const [formValues, setFormValues] = React.useState({
    imageUrl: "images.jpeg",
    title: "Arthive",
    mediaType: "mixed media",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero exercitationem commodi, incidunt animi a veritatis error, non natus alias labore doloremque quos dolorem perferendis minus cum. Sequi expedita doloribus inventore.",
    mediaLink: "",
  });

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
        <Typography variant="subtitle1" sx={{ mb: 2, color: "text.secondary" }}>
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
          onSubmit={(e) => e.preventDefault()}
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
              borderColor: "grey.300",
              transition: "border-color 0.2s ease",
            }}
          >
            <Box>
              <Box component={Image} src></Box>
              <Input
                sx={{
                  display: "none",
                }}
                type="file"
                required
                name="imageUrl"
                // value={formValues.imageUrl}
                disabled
                multiple
              />
            </Box>
            {/* <FormHelperText sx={{ mt: 2, textAlign: "center" }}>
              {!formValues.imageUrl
                ? "File rules shows here e.g. JPG, JPEC, PNG and WEBP. Max 15MB."
                : `File Name: ${formValues.imageUrl}`}
            </FormHelperText> */}
          </Box>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {/* Title Field */}
            <Grid size={6}>
              <TextField
                // error={!!errors.title}
                name="title"
                id="title"
                label="Title of Artwork"
                variant="outlined"
                // required
                fullWidth
                disabled
                value={formValues.title}
                // onChange={handleChange}
                // onBlur={handleBlur}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "56px",
                  },
                }}
                // helperText={!formValues.title.trim() && "Required"}
              />
            </Grid>

            {/* Media Type Field */}
            <Grid size={6}>
              <FormControl
                variant="standard"
                sx={{ width: "90%", textTransform: "capitalize" }}
                // required
                disabled
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Media Type
                </InputLabel>
                <Select
                  //   error={!!errors.mediaType}
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={formValues.mediaType}
                  //   onChange={handleChange}
                  //   onBlur={handleBlur}
                  name="mediaType"
                  label="Media Type"
                >
                  <MenuItem value={formValues.mediaType}>
                    <em>{formValues.mediaType}</em>
                  </MenuItem>
                  {/* {mediaType.map((type) => (
                    <MenuItem
                      key={type}
                      value={type}
                      sx={{ textTransform: "capitalize" }}
                    >
                      {type}
                    </MenuItem>
                  ))} */}
                </Select>
                {/* {!formValues.mediaType && (
                  <FormHelperText error={!!errors.mediaType}>
                    Required
                  </FormHelperText>
                )} */}
              </FormControl>
            </Grid>
          </Grid>

          {/* Description Field */}
          <TextField
            // error={!!errors.description}
            disabled
            name="description"
            id="description"
            label="Artwork Description"
            variant="outlined"
            // required
            fullWidth
            multiline
            rows={4}
            // onChange={handleChange}
            // onBlur={handleBlur}
            value={formValues.description}
            // placeholder="Tell us about your artwork..."
            sx={{ mb: 3 }}
            // helperText={!formValues.description.trim() && "Required"}
          />

          {/* Social Media Link Field */}
          <TextField
            name="mediaLink"
            id="mediaLink"
            label="Social Media Link (optional)"
            variant="outlined"
            fullWidth
            disabled
            // onChange={handleChange}
            value={formValues.mediaLink}
            sx={{ mb: 2 }}
          />
          {/* Submit Button */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              //   disabled={
              //     (formValues.title &&
              //       formValues.imageUrl &&
              //       formValues.mediaType &&
              //       formValues.description) == "" || isSubmit
              //   }
              type="submit"
              variant="contained"
              size="large"
              // onSubmit={handleSubmit}
              sx={{
                px: 4,
                py: 1.5,
                textTransform: "capitalize",
                fontSize: "1.1rem",
              }}
            >
              Upload artwork
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SubmissionPreview;
