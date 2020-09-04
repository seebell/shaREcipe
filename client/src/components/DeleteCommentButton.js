import React from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import API from "../utils/API";

export default function DeleteCommentButton(props) {
  const handleDelete = e => {
    e.preventDefault();
    API.deleteComment(props.id).then(response => {
      props.getRecipe();
    });
  };

  return (
    <IconButton aria-label="delete" onClick={handleDelete}>
      <DeleteIcon />
    </IconButton>
  );
}