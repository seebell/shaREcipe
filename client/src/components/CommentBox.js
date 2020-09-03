import React, { useContext, useState } from "react";
import { Button, TextField, Container, FormControl } from '@material-ui/core';
import API from "../utils/API";
import UserContext from "../context/UserContext";
import "./comstyle.css";
import {makeStyles} from '@material-ui/core/styles'

function CommentBox(props) {
    const { user } = useContext(UserContext);
    const [comment, setComment]= useState("")
    const [message, setMessage] = useState("")

    function handleInputChange(event) {
        setComment(event.target.value);

    };

    //Creates new comment
    function handleSubmit(event) {
        event.preventDefault();
        console.log(user._id)
        const data = {
            user: user._id,
            comment: comment,
            recipe: props.id
        }

        if (comment!== "") {
            
            API.createComment(data)
                .then(result => {
                    console.log(result)
                    setComment("")
                    setMessage("Comment is successfully posted!")
                    props.getRecipe()
                    //call a function from the recipe page to get the updated comments
            })
                .catch(err => console.log(err))

        } else {
            setMessage("A comment is required!")
        }

    };
 
    return (
        <>
            <Container maxWidth="sm">
                
                <FormControl
                    fullWidth={true}>
                    <h6>Comment:</h6>
                    <TextField
                        multiline
                        value={comment}
                        onChange={handleInputChange}
                        name="comment"
                    />
                </FormControl>

                {message ? <p style={{ borderRadius: '4px', padding: '1em', backgroundColor: 'white', textAlign: 'center', margin: '0 auto' }}><b>{message}</b></p> : <></>}

                <div id="wrapper">
                    <Button
                        size="large"
                        variant="contained"
                        color="secondary"
                        id="createCommentBtn"
                        onClick={handleSubmit}>
                        Submit Comment</Button>
                </div>

            </Container>

        </>
    );

}

export default CommentBox;
