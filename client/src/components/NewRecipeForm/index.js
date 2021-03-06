import 'date-fns';
import React, { Component } from "react";
import { Button, TextField, Container, NativeSelect, Grid, FormControl, Input, FormHelperText } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import API from "../../utils/API";
import "./style.css";
import UserContext from '../../context/UserContext';

class NewRecipeForm extends Component {
    static contextType = UserContext;

    state = {
        title: "",
        category: "Other",
        description: "",
        ingredients: [],
        startTime: new Date(),
        endTime: new Date(),
        days: 0,
        hours: 0,
        mins: 0,
        picture: "",
        ingredient: "",
        amount: 1,
        units: "tsp",
        loading: false,
        message: ""
    }

    handleInputChange = event => {
        const { name, value, type } = event.target;

        this.setState({
            [name]: type === 'number' ? parseInt(value) : value
        });

    };

    handleDateChange = date => {
        this.setState({
            startTime: date
        });
    };

    deleteIngredient = name => {
        let filteredArr = this.state.ingredients.filter(function (obj) {
            return obj.ingredient !== name;
        });

        this.setState({
            ingredients: filteredArr
        });
    };

    //Adds time from prep lenght to create end time
    calcEndDate = (days, hours, mins) => {
        let endTime = new Date();
        let startTime = this.state.startTime;
        endTime.setMinutes(startTime.getMinutes() + mins);
        endTime.setHours(endTime.getHours() + hours);
        endTime.setDate(endTime.getDate() + days);
        return endTime;
    }

    calcPrepLength = (days, hours, mins) => {
        let prepLength = `${days} days ${hours} hours ${mins} minutes 0 seconds`
        return prepLength;
    }

    addIngredient = event => {
        event.preventDefault();
        let ingredients = this.state.ingredients;
        let unique = true;

        for (let i = 0; i < ingredients.length; i++) {
            if (this.state.ingredient.toLowerCase() === ingredients[i].ingredient.toLowerCase()) {
                unique = false;
            }
        }

        if (this.state.ingredient && unique) {
            let newIng = {
                ingredient: this.state.ingredient,
                amount: this.state.amount,
                units: this.state.units
            }
            this.setState({
                ingredient: "",
                amount: 1,
                units: "tsp",
                ingredients: [...ingredients, newIng]
            });
        }
    }

    imageUpload = async event => {
        const files = event.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'upload_preset');
        this.setState({ loading: true });
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/seebell/image/upload',
            {
                method: 'POST',
                body: data
            }
        )
        const file = await res.json();

        this.setState({
            picture: file.secure_url,
            loading: false
        });



    }

    //Creates new recipe
    handleSubmit = event => {
        event.preventDefault();
        const data = {
            user: this.context.user.username,
            title: this.state.title,
            category: this.state.category,
            ingredients: this.state.ingredients,
            description: this.state.description,
            startTime: this.state.startTime,
            endTime: this.calcEndDate(this.state.days, this.state.hours, this.state.mins),
            prepLength: this.calcPrepLength(this.state.days, this.state.hours, this.state.mins),
            picture: this.state.picture
        }

        if (this.state.title !== "") {

            API.createRecipe(data)
                .then(result => {
                })
                .catch(err => console.log(err))

            this.setState({
                title: "",
                category: "Other",
                description: "",
                ingredients: [],
                startTime: new Date(),
                endTime: new Date(),
                days: 0,
                hours: 0,
                mins: 0,
                picture: "",
                ingredient: "",
                amount: 1,
                units: "tsp",
                message: "New Recipe Added!"
            });

            this.fileInput.value = "";

            setTimeout(
                function () {
                    this.setState({ message: "" });
                }
                    .bind(this),
                5000
            );

        } else {
            this.setState({ message: "A title is required!" })
            setTimeout(
                function () {
                    this.setState({ message: "" });
                }
                    .bind(this),
                5000
            );
        }

    };

    render() {
        return (
            <>
                <Container maxWidth="sm">
                <Grid item xs={12} m={8} ><h2>Let's shaRecipe!</h2></Grid>
                    <FormControl
                        fullWidth={true}>
                        <h6 >Title:</h6>
                        <Input
                            value={this.state.title}
                            name="title"
                            onChange={this.handleInputChange} />
                        <FormHelperText >Required</FormHelperText>
                    </FormControl>

                    <FormControl
                        fullWidth={true}>
                        <h6>Category:</h6>
                        <NativeSelect value={this.state.category} name="category" onChange={this.handleInputChange}>
                            <option value={"Other"}>Other</option>
                            <option value={"Beer"}>Beer</option>
                            <option value={"Cookie"}>Cookie</option>
                            <option value={"Bread"}>Bread</option>
                            <option value={"Savory"}>Savory</option>
                            <option value={"Cake"}>Cake</option>
                            <option value={"Soup"}>Soup</option>
                            <option value={"Brunch"}>Brunch</option>
                            <option value={"Cocktail"}>Cocktail</option>
                        </NativeSelect>
                    </FormControl>
                    <FormControl fullWidth={true}>
                        <h6>Ingredients:</h6>
                        <ul className="ingList">
                            {this.state.ingredients.map(item => (
                                <li className="ingListItem" key={item.ingredient}>
                                    {item.ingredient}: {item.amount}{item.units}
                                    <button id="ingBtn" onClick={() => this.deleteIngredient(item.ingredient)}>&times;</button>
                                </li>
                            ))}
                        </ul>
                        <div>
                            <h5 className="subLabel">Name:</h5>
                            <input
                                value={this.state.ingredient}
                                id="ingName"
                                className="subInput"
                                name="ingredient"
                                onChange={this.handleInputChange}></input>
                            <br></br>
                            <h5 className="subLabel">Amount:</h5>
                            <input
                                value={this.state.amount}
                                id="ingAmount"
                                className="subInput"
                                type="number"
                                min={0}
                                placeholder={1}
                                name="amount"
                                onChange={this.handleInputChange}></input>
                            <br></br>
                            <h5 className="subLabel">Unit:</h5>
                            <NativeSelect
                                value={this.state.units}
                                className="subInput"
                                id="ingUnit"
                                name="units"
                                onChange={this.handleInputChange}>
                                <option value={""}></option>
                                <option value={"tsp"}>tsp</option>
                                <option value={"cup"}>cup</option>
                                <option value={"tbsp"}>tbsp</option>
                                <option value={"oz"}>oz</option>
                                <option value={"lb"}>lb</option>
                            </NativeSelect>
                            <br></br>
                            <button id="ingBtn" onClick={this.addIngredient}>+</button>
                        </div>
                    </FormControl>

                    <FormControl
                        fullWidth={true}>
                        <h6>Description:</h6>
                        <TextField
                            multiline
                            value={this.state.description}
                            onChange={this.handleInputChange}
                            name="description"
                        />
                    </FormControl>

                    <FormControl>
                        <h6>Start Time:</h6>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                margin="normal"
                                variant="inline"
                                format="MM/dd/yyyy"
                                onChange={this.handleDateChange}
                                value={this.state.startTime}
                            />
                            <KeyboardTimePicker
                                margin="normal"
                                variant="inline"
                                onChange={this.handleDateChange}
                                value={this.state.startTime}
                            />
                        </MuiPickersUtilsProvider>
                    </FormControl>

                    <FormControl fullWidth={true}>
                        <h6>Prep Time:</h6>
                        <div>
                            <h5 className="subLabel">Days:</h5>
                            <input
                                className="subInput"
                                id="days"
                                type="number"
                                min={0}
                                name="days"
                                onChange={this.handleInputChange}
                                placeholder={0}
                                value={this.state.days}>
                            </input>

                            <br></br>
                            <h5 className="subLabel">Hours:</h5>
                            <input
                                className="subInput"
                                id="hours"
                                type="number"
                                min={0}
                                max={23}
                                name="hours"
                                value={this.state.hours}
                                onChange={this.handleInputChange}
                                placeholder={0}></input>
                            <br></br>
                            <h5 className="subLabel">Minutes:</h5>
                            <input
                                className="subInput"
                                id="hours"
                                type="number"
                                min={0}
                                max={59}
                                name="mins"
                                value={this.state.mins}
                                onChange={this.handleInputChange}
                                placeholder={0}></input>
                        </div>
                    </FormControl>

                    <FormControl>
                        <h6>Image:</h6>
                        <input type="file"
                            name="file"
                            onChange={this.imageUpload}
                            ref={ref => this.fileInput = ref}
                        ></input>
                        {this.state.picture ? (
                            <img src={this.state.picture} alt="Uploaded Recipe" style={{ width: '200px' }}></img>
                        ) : (
                                <p>No image uploaded.</p>
                            )}

                    </FormControl>
                    
                    {(this.state.message) ? <p style={{ borderRadius: '4px', padding: '1em', backgroundColor: 'white', textAlign: 'center', margin: '0 auto' }}><b>{this.state.message}</b></p> : <></>}
                    
                    <div id="wrapper">
                        <Button
                            size="large"
                            variant="contained"
                            color="secondary"
                            id="createBtn"
                            onClick={this.handleSubmit}>
                            Create New Recipe</Button>
                    </div>

                </Container>

            </>
        );
    }
}

export default NewRecipeForm;
