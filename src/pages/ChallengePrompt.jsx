import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

const initialPrompts = [
  {
    id: 1,
    title: "Self-Portrait Reimagined",
    description:
      "Create a self-portrait — but with a twist. Imagine yourself in another time, place, or even as a fantasy being.",
    rules:
      "Must be based on you." +
      "Can be realistic, abstract, or stylized." +
      "No offensive or disrespectful depictions.",
    startDate: "2025-08-10",
    endDate: "2025-08-17",
    status: "ACTIVE",
  },
  {
    id: 2,
    title: "Myth & Legends",
    description:
      "Depict a mythological creature, character, or story from any culture.",
    rules:
      "Must include a written note about which myth inspired the artwork." +
      "Respect cultural origins." +
      "No copyrighted characters.",

    startDate: "2025-08-02",
    endDate: "2025-08-09",
    status: "CLOSED",
  },
];

const statusOptions = ["ACTIVE", "CLOSED"];

export default function ChallengePrompts() {
  const [prompts, setPrompts] = useState(initialPrompts);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    rules: "",
    startDate: "",
    endDate: "",
    status: "ACTIVE",
  });
  const [isCreating, setIsCreating] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = () => {
    setIsCreating(true);
    setForm({
      title: "",
      description: "",
      rules: "",
      startDate: "",
      endDate: "",
      status: "ACTIVE",
    });
  };

  const handleSave = () => {
    if (editingId) {
      setPrompts((prev) =>
        prev.map((p) => (p.id === editingId ? { ...form, id: editingId } : p)),
      );
      setEditingId(null);
    } else {
      setPrompts((prev) => [...prev, { ...form, id: Date.now() }]);
      setIsCreating(false);
    }
    setForm({
      title: "",
      description: "",
      rules: "",
      startDate: "",
      endDate: "",
      status: "ACTIVE",
    });
  };

  const handleEdit = (prompt) => {
    setEditingId(prompt.id);
    setForm({ ...prompt });
    setIsCreating(false);
  };

  const handleDelete = (id) => {
    setPrompts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsCreating(false);
    setForm({
      title: "",
      description: "",
      rules: "",
      startDate: "",
      endDate: "",
      status: "ACTIVE",
    });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" align="center" fontWeight={700} mb={4}>
        CHALLENGE PROMPTS
      </Typography>
      <Button variant="contained" onClick={handleCreate} sx={{ mb: 2 }}>
        Create New Challenge
      </Button>
      {(isCreating || editingId) && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Stack spacing={2}>
            <TextField
              label="Challenge Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              multiline
              rows={2}
              fullWidth
            />
            <TextField
              label="Rules"
              name="rules"
              value={form.rules}
              onChange={handleChange}
              multiline
              rows={2}
              fullWidth
            />
            <Stack direction="row" spacing={2}>
              <TextField
                label="Start Date"
                name="startDate"
                type="date"
                value={form.startDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="End Date"
                name="endDate"
                type="date"
                value={form.endDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                select
                label="Status"
                name="status"
                value={form.status}
                onChange={handleChange}
                sx={{ minWidth: 120 }}
              >
                {statusOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
              >
                {editingId ? "Update" : "Save"}
              </Button>
              <Button
                variant="outlined"
                startIcon={<CancelIcon />}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Paper>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>DURATION</b>
              </TableCell>
              <TableCell>
                <b>TITLE</b>
              </TableCell>
              <TableCell>
                <b>DESCRIPTION</b>
              </TableCell>
              <TableCell>
                <b>RULES</b>
              </TableCell>
              <TableCell>
                <b>STATUS</b>
              </TableCell>
              <TableCell>
                <b>ACTION</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prompts.map((prompt) => (
              <TableRow key={prompt.id}>
                <TableCell>
                  {prompt.startDate.replace(/-/g, "/")} -{" "}
                  {prompt.endDate.replace(/-/g, "/")}
                </TableCell>
                <TableCell>{prompt.title}</TableCell>
                <TableCell>{prompt.description}</TableCell>
                <TableCell>{prompt.rules}</TableCell>
                <TableCell>{prompt.status}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <IconButton onClick={() => handleEdit(prompt)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(prompt.id)}
                      sx={{ bgcolor: "#E6B6B6" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
