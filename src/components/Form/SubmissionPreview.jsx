import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import {
  Button,
  Divider,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
function SubmissionPreview() {
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
          textShadow: "0 2px 4px rgba(0,0,0,0.3)",
        }}
      >
        Upload Your Artwork
      </Typography>

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
        <Box sx={{ mt: 2, mb: 4, textAlign: "center", maxWidth: "100%" }}>
          <Box
            component="img"
            src="src/assets/images/placeholder.png"
            alt={`Preview image of ${formValues.title}`}
          />
          <Typography color="text.secondary">
            File Name: {formValues.imageUrl}
          </Typography>
        </Box>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {/* Title Field */}
          <Grid size={6}>
            <TextField
              name="title"
              label="Title of Artwork"
              aria-readonly
              fullWidth
              value={formValues.title}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />
          </Grid>

          {/* Media Type Field */}
          <Grid size={6}>
            <FormControl sx={{ width: "90%", textTransform: "capitalize" }}>
              <InputLabel id="demo-simple-select-standard-label">
                Media Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={formValues.mediaType}
                name="mediaType"
                label="Media Type"
                inputProps={{ readOnly: true }}
              >
                <MenuItem value={formValues.mediaType}>
                  <em>{formValues.mediaType}</em>
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
          value={formValues.description}
          sx={{ mb: 3 }}
          slotProps={{ input: { readOnly: true } }}
        />

        {/* Social Media Link Field */}
        <TextField
          name="mediaLink"
          id="mediaLink"
          label="Social Media Link (optional)"
          fullWidth
          value={formValues.mediaLink ? formValues.mediaLink : "None"}
          sx={{ mb: 2 }}
          slotProps={{ input: { readOnly: true } }}
        />

        {/* Action Button */}
        <Box sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}>
          <Button variant="outlined" color="secondary" sx={{ px: 4 }}>
            Edit
          </Button>
          <Button
            variant="contained"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
            }}
          >
            submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default SubmissionPreview;
