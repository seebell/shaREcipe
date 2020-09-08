import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../utils/API";
import "./style.css";
import Card from "../components/Card";
import "../components/comstyle.css";
import { Grid, Paper } from '@material-ui/core';
import CommentBox from "../components/CommentBox";
import DeleteCommentButton from "../components/DeleteCommentButton"
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
       
      <Paper variant="outlined" elevation={8} maxWidth="sm">
        
       <Grid container item xs={12} spacing={12}>
      <img
        className="mr-3 bg-light rounded"
        width="48"
        height="48"
        src={`https://api.adorable.io/avatars/48/${comment.user.username.toLowerCase()}@adorable.io.png`}
        alt={comment.user.username} />
        <p id="username"> {`Posted by  ${comment.user.username}`} </p> 
        
          <DeleteCommentButton id={comment._id} getRecipe={getRecipe} />
          </Grid>
          
          <Grid container item lg={12} justify="center" spacing={12}>
          <p key={comment._id }  >{`Comment: ${comment.comment}`}</p>
          </Grid>
        </Paper>
        
      ))}
    </React.Fragment>
  )
};

export default Recipe;
