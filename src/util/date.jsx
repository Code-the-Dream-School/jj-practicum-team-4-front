import React from "react";

export default function formatDateForDisplay(dateString) {
  if (!dateString) return "Invalid Date";
  const date = new Date(dateString + "T00:00:00");
  if (isNaN(date)) return "Invalid Date";
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}