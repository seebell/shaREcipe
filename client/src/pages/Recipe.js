import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../utils/API";
import Card from "../components/Card";
import { Grid, Typography, Paper } from '@material-ui/core';


function Recipe(props) {
  const [recipe, setRecipe] = useState()

  const {id} = useParams()
  useEffect(() => {
    API.getOneRecipe(id)
      .then(res => setRecipe(res.data))
      .catch(err => console.log(err));
  }, [])
   if (!recipe)
   return null;
  return (
     
   
    <Grid container justify="center" spacing={6}>
    <Grid item xs={12} m={8} ><h3>Recipe for : {recipe.title}</h3></Grid>
  
                                <Card key={recipe._id}
                                    id={recipe._id}
                                    category={recipe.category}
                                    title={recipe.title}
                                    description={recipe.description}
                                    user={recipe.user}
                                    picture={recipe.picture}
                                    ingredients={recipe.ingredients}
                                    endTime={recipe.endTime}
                                    prepLength={recipe.prepLength}
                                  ></Card>
                </Grid>

  )
    };
    


export default Recipe;
