import React from "react";

export default function formatDateForDisplay(){
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
}