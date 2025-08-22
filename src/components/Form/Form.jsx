import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Button,
  Container,
  Divider,
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

function Form() {
  const [values, setValues] = React.useState("");
  const mediaType = ["mixed media", "waterColor", "oil paint", "pencil"];

  const handleChange = (e) => {
    setValues(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted");
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
                p: 7,
                textAlign: "center",
                // border: 1,
                borderRadius: 6,
                bgcolor: "grey.50",
              }}
            >
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload files
                <VisuallyHiddenInput
                  type="file"
                  required
                  onChange={(event) => console.log(event.target.files)}
                  multiple
                />
              </Button>
              <Typography sx={{ mt: 2, fontSize: 14 }} color="textSecondary">
                File rules shows here e.g. JPG, JPEC, PNG and WEBP. Max 15MB.
              </Typography>
            </Box>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {/* Title Field */}
              <Grid size={6}>
                <TextField
                  name="title"
                  id="title"
                  label="Title of Artwork"
                  variant="outlined"
                  required
                  fullWidth
                  value={""}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "56px",
                    },
                  }}
                />
              </Grid>

              {/* Media Type Field */}
              <Grid size={6}>
                <FormControl variant="standard" sx={{ width: "90%" }} required>
                  <InputLabel id="demo-simple-select-standard-label">
                    Media Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={values}
                    onChange={handleChange}
                    label="Media Type"
                  >
                    <MenuItem value="">
                      <em>Media Type</em>
                    </MenuItem>
                    {mediaType.map((type) => (
                      <MenuItem value={type}>{type}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Description Field */}
            <TextField
              name="description"
              id="description"
              label="Artwork Description"
              variant="outlined"
              required
              fullWidth
              multiline
              rows={4}
              placeholder="Tell us about your artwork..."
              sx={{ mb: 3 }}
            />

            {/* Social Media Link Field */}
            <TextField
              name="mediaLink"
              id="mediaLink"
              label="Social Media Link (optional)"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />
            {/* Submit Button */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
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
