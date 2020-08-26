import React from "react";
import IconButton from "@material-ui/core/IconButton";
import UpdateIcon from "@material-ui/icons/Update";
import API from "../utils/API";

export default function UpdateButton(props) {
  const handleUpdate = e => {
    e.preventDefault();
    API.updateRecipe(props.id).then (response => {
     props.loadRecipes();
    });
  };

  return (
    <IconButton aria-label="update" onClick={handleUpdate}>
      <UpdateIcon />
    </IconButton>
  );
}
