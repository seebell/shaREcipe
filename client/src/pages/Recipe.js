import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../utils/API";
import Card from "../components/Card";
import { Grid } from '@material-ui/core';
import CommentBox from "../components/CommentBox";
function Recipe(props) {
  const [recipe, setRecipe] = useState()
  const { id } = useParams()

  useEffect(() => {
   getRecipe() 

  }, []);

  function getRecipe() {
    API.getOneRecipe(id)
    .then(res => {
      console.log("recipeObject")
      console.log(res.data)
      setRecipe(res.data)
    })
    .catch(err => console.log(err));
  }

  if (!recipe)
    return null;

  return (
    <React.Fragment>

      <Grid container justify="center" spacing={6}>
        <Grid item xs={12} m={8} ><h3>Recipe for : {recipe.title}</h3></Grid>

        <Card
          id={recipe._id}
          category={recipe.category}
          title={recipe.title}
          description={recipe.description}
          user={recipe.user}
          picture={recipe.picture}
          ingredients={recipe.ingredients}
          endTime={recipe.endTime}
          prepLength={recipe.prepLength}
        >
          <Link to="/home">
            <strong>
              Click here to go back Home
          </strong>
          </Link>
        </Card>
        <CommentBox
          id={recipe._id}
          getRecipe={getRecipe}
        />
      </Grid>
      {recipe.comments.map(comment => (
        <div>
          <p key={comment._id} >{`Comment: ${comment.comment} by ${comment.user.username}`}</p>
        </div>
      ))}
    </React.Fragment>
  )
};

export default Recipe;
