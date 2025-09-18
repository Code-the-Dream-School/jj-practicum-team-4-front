import React, { useState, useEffect } from "react";
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
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { getData, postData, patchData, deleteData } from "../util";

const statusOptions = ["ACTIVE", "CLOSED"];

export default function ChallengePrompts() {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [success, setSuccess] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [promptToDelete, setPromptToDelete] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    rules: "",
    startDate: "",
    endDate: "",
    status: "ACTIVE",
  });
  const [isCreating, setIsCreating] = useState(false);
  // const URL = `${import.meta.env.VITE_API_URL}prompts/active`;
  const BASE_URL = import.meta.env.VITE_API_URL;
  const ACTIVE_URL = `${BASE_URL}/api/prompts/active`;
  const ALL_URL = `${BASE_URL}/api/prompts/all`;
  const PROMPTS_URL = `${BASE_URL}/api/prompts`;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // Format date from ISO string to YYYY-MM-DD
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().slice(0, 10);
  };

  // Format date for display (MM/DD/YYYY)
  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US");
  };
  const showSuccess = (message) => {
    setSuccess(message);
    setTimeout(() => setSuccess(null), 5000);
  };

  // Show error message temporarily
  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(null), 8000);
  };

  const formatFormForAPI = (formData) => {
    return {
      title: formData.title,
      description: formData.description,
      rules: formData.rules,
      challenge: {
        start_date: formData.startDate
          ? new Date(formData.startDate).toISOString()
          : null,
        end_date: formData.endDate
          ? new Date(formData.endDate).toISOString()
          : null,
      },
      is_active: formData.status === "ACTIVE",
    };
  };

  const formatPromptFromAPI = (p) => {
    return {
      id: p._id,
      title: p.title,
      description: p.description,
      rules: p.rule || p.rules || "",
      startDate: formatDate(p.start_date || p.challenge?.start_date),
      endDate: formatDate(p.end_date || p.challenge?.end_date),
      status: p.is_active ? "ACTIVE" : "CLOSED",
    };
  };

  // Fetch active prompt from backend
  const fetchActivePrompt = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getData(ACTIVE_URL);
      console.log("API response:", response);

      if (response?.success && response?.prompt) {
        const formatted = formatPromptFromAPI(response.prompt);
        setPrompts([formatted]);
      } else {
        setPrompts([]); // No active prompt
      }
    } catch (error) {
      console.error("Error fetching prompt:", error);
      setError("Failed to load challenge prompts. Please try again.");
      setPrompts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllPrompts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getData(ALL_URL);
      console.log("All prompts response:", response);

      if (response?.success && response?.items) {
        const formatted = response.items.map(formatPromptFromAPI);
        setPrompts(formatted);
      } else {
        setPrompts([]);
      }
    } catch (error) {
      console.error("Error fetching all prompts:", error);
      setError("Failed to load all challenge prompts. Please try again.");
      setPrompts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivePrompt();
  }, []);

  const handleCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setForm({
      title: "",
      description: "",
      rules: "",
      startDate: "",
      endDate: "",
      status: "ACTIVE",
    });
    setError(null);
    setSuccess(null);
  };

  const handleSave = async () => {
    if (
      !form.title ||
      !form.description ||
      !form.rules ||
      !form.startDate ||
      !form.endDate
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    setSaving(true);
    setError(null);

    try {
      const apiData = formatFormForAPI(form);
      console.log("Sending data:", apiData);

      if (editingId) {
        const response = await patchData(
          `${PROMPTS_URL}/${editingId}`,
          apiData
        );
        console.log("Update response:", response);

        if (response?.success && response?.prompt) {
          const formatted = formatPromptFromAPI(response.prompt);
          setPrompts((prev) =>
            prev.map((p) => (p.id === editingId ? formatted : p))
          );
          setEditingId(null);
        } else {
          showError(response?.message || "Failed to update challenge prompt");
        }
        // setEditingId(null);
      } else {
        const response = await postData(PROMPTS_URL, apiData);
        console.log("Create response:", response);

        if (response?.success && response?.prompt) {
          showSuccess("Challenge prompt created successfully!");
          const formatted = formatPromptFromAPI(response.prompt);
          setPrompts((prev) => [...prev, formatted]);
          setIsCreating(false);

          // setPrompts((prev) => [...prev, { ...form, id: Date.now() }]);
        } else {
          showError(response?.message || "Failed to create challenge prompt");
        }
      }

      // Reset form on success
      if (response?.success) {
        setForm({
          title: "",
          description: "",
          rules: "",
          startDate: "",
          endDate: "",
          status: "ACTIVE",
        });
      }
    } catch (error) {
      console.error("Error saving prompt:", error);
      const errorMessage =
        error?.response?.data?.message ||
        (editingId
          ? "Failed to update challenge prompt"
          : "Failed to create challenge prompt");
      showError(errorMessage);
      // setError("Failed to save prompt. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (prompt) => {
    setEditingId(prompt.id);
    setForm({ ...prompt });
    setIsCreating(false);
    setError(null);
    setSuccess(null);
  };
  const handleDeleteClick = (prompt) => {
    setPromptToDelete(prompt);
    setDeleteConfirmOpen(true);
  };
  const handleDeleteConfirm = async (id) => {
    // if (!window.confirm("Are you sure you want to delete this challenge prompt?")) {
    //   return;
    // }
    if (!promptToDelete) return;
    setSaving(true);
    setError(null);
    try {
      // setError(null);
      const response = await deleteData(`${PROMPTS_URL}/${promptToDelete.id}`);
      console.log("Delete response:", response);

      if (response?.success) {
        showSuccess("Challenge prompt deleted successfully!");
        setPrompts((prev) => prev.filter((p) => p.id !== promptToDelete.id));
      } else {
        showError(response?.message || "Failed to delete challenge prompt");
      }
    } catch (error) {
      console.error("Error deleting prompt:", error);
      // setError("Failed to delete prompt. Please try again.");
      const errorMessage =
        error?.response?.data?.message || "Failed to delete challenge prompt";
      showError(errorMessage);
    } finally {
      setSaving(false);
      setDeleteConfirmOpen(false);
      setPromptToDelete(null);
    }
  };
  const handleDeleteCancel = () => {
    setDeleteConfirmOpen(false);
    setPromptToDelete(null);
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
    setError(null);
    setSuccess(null);
  };

  const handleRefresh = () => {
    fetchActivePrompt();
  };

  const handleShowAll = () => {
    fetchAllPrompts();
  };

  if (loading) {
    return (
      <Box
        sx={{
          p: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 400,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" align="center" fontWeight={700} mb={4}>
        CHALLENGE PROMPTS
      </Typography>
      {/* <Button variant="contained" onClick={handleCreate} sx={{ mb: 2 }}>
        Create New Challenge
      </Button> */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert
          severity="success"
          sx={{ mb: 2 }}
          onClose={() => setSuccess(null)}
        >
          {success}
        </Alert>
      )}

      <Stack direction="row" spacing={2} mb={2}>
        <Button variant="contained" onClick={handleCreate} disabled={saving}>
          Create New Challenge
        </Button>
        <Button variant="contained" onClick={handleShowAll} disabled={saving}>
          Show All Prompts
        </Button>
        <Button variant="outlined" onClick={handleRefresh} disabled={saving}>
          Refresh
        </Button>
      </Stack>
      {(isCreating || editingId) && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" mb={2}>
            {editingId ? "Edit Challenge" : "Create New Challenge"}
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Challenge Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              fullWidth
              required
              disabled={saving}
              error={!form.title.trim() && (isCreating || editingId)}
              helperText={
                !form.title.trim() && (isCreating || editingId)
                  ? "Title is required"
                  : ""
              }
            />
            <TextField
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
              required
              disabled={saving}
              error={!form.description.trim() && (isCreating || editingId)}
              helperText={
                !form.description.trim() && (isCreating || editingId)
                  ? "Description is required"
                  : ""
              }
            />

            <TextField
              label="Rules"
              name="rules"
              value={form.rules}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
              required
              disabled={saving}
              error={!form.rules.trim() && (isCreating || editingId)}
              helperText={
                !form.rules.trim() && (isCreating || editingId)
                  ? "Rules are required"
                  : ""
              }
            />
            <Stack direction="row" spacing={2}>
              <TextField
                label="Start Date"
                name="startDate"
                type="date"
                value={form.startDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
                disabled={saving}
                error={!form.startDate && (isCreating || editingId)}
                helperText={
                  !form.startDate && (isCreating || editingId)
                    ? "Start date is required"
                    : ""
                }
              />

              <TextField
                label="End Date"
                name="endDate"
                type="date"
                value={form.endDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
                disabled={saving}
                error={!form.endDate && (isCreating || editingId)}
                helperText={
                  !form.endDate && (isCreating || editingId)
                    ? "End date is required"
                    : ""
                }
              />

              <TextField
                select
                label="Status"
                name="status"
                value={form.status}
                onChange={handleChange}
                sx={{ minWidth: 120 }}
                required
                disabled={saving}
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
                startIcon={
                  saving ? <CircularProgress size={16} /> : <SaveIcon />
                }
                onClick={handleSave}
                disabled={
                  !form.title ||
                  !form.description ||
                  !form.rules ||
                  !form.startDate ||
                  !form.endDate ||
                  saving
                }
              >
                {saving ? "Saving..." : editingId ? "Update" : "Save"}
              </Button>
              <Button
                variant="outlined"
                startIcon={<CancelIcon />}
                onClick={handleCancel}
                disabled={saving}
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
            {Array.isArray(prompts) && prompts.length > 0 ? (
              prompts.map((prompt) => (
                <TableRow key={prompt.id}>
                  {/* <TableCell>
                    {prompt.startDate.replace(/-/g, "/")} -{" "}
                    {prompt.endDate.replace(/-/g, "/")}
                  </TableCell> */}
                  <TableCell>
                    {formatDateForDisplay(prompt.startDate)} -{" "}
                    {formatDateForDisplay(prompt.endDate)}
                  </TableCell>
                  <TableCell>{prompt.title}</TableCell>
                  <TableCell>{prompt.description}</TableCell>
                  <TableCell>{prompt.rules}</TableCell>
                  {/* <TableCell>{prompt.status}</TableCell> */}
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        color:
                          prompt.status === "ACTIVE"
                            ? "success.main"
                            : "text.secondary",
                        fontWeight:
                          prompt.status === "ACTIVE" ? "bold" : "normal",
                      }}
                    >
                      {prompt.status}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        onClick={() => handleEdit(prompt)}
                        disabled={saving}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteClick(prompt.id)}
                        sx={{ bgcolor: "#E6B6B6" }}
                        disabled={saving}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body1" color="text.secondary" py={4}>
                    No challenge prompts found.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={deleteConfirmOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the challenge prompt{" "}
            {promptToDelete?.title}? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} disabled={saving}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            disabled={saving}
            startIcon={saving ? <CircularProgress size={16} /> : null}
          >
            {saving ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
