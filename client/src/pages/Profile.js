import React, { Component } from "react";
import API from "../utils/API";
import ProfileCard from "../components/ProfileCard";
import {
    Grid,
    InputLabel,
    NativeSelect,
    FormControl,
    Input,
    FormHelperText
} from "@material-ui/core";
import UserContext from "../context/UserContext";
import ProfileBio from "../components/ProfileBio/index";

class Profile extends Component {
    static contextType = UserContext

    prevUser = this.context.user || {};

    state = {
        username: "",
        user: "",
        database: [],
        recipes: [],
        category: "All",
        search: "",
        prepStatus: "All"
    };

    componentDidMount() {
        if (this.context.user) {
            this.loadRecipes();
        }
    }

    componentDidUpdate() {
        if (this.prevUser._id !== this.context.user._id) {
            this.prevUser = this.context.user;
            this.loadRecipes();
        }
    }

    filterFeed() {
        const filteredrecipes = this.state.database.filter(recipe => {
            let isMatch = true;
            if (this.state.category !== "All") {
                isMatch = isMatch && this.categoryFilter(recipe);
            }

            if (this.state.search) {
                isMatch = isMatch && this.ingredientFilter(recipe);
            }

            if (this.state.prepStatus !== "All") {
                isMatch = isMatch && this.statusFilter(recipe);
            }
            return isMatch;
        });
        this.setState({ recipes: filteredrecipes });
    }
    categoryFilter(recipe) {
        return recipe.category === this.state.category;
    }
    statusFilter(recipe) {
        if (this.state.prepStatus === "Finished") {
            return new Date(recipe.endTime) < new Date();
        } else if (this.state.prepStatus === "Preparing") {
            return new Date(recipe.endTime) > new Date();
        }
    }


    ingredientFilter(recipe) {
        const searchTerm = this.state.search;
        if (recipe.ingredients.length !== 0) {
            for (let i = 0; i < recipe.ingredients.length; i++) {
                if (recipe.ingredients[i].ingredient.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return recipe.ingredients[i].ingredient.toLowerCase().includes(searchTerm.toLowerCase());
                }
            }
            return false;
        } else {
            return false;
        }
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState(
            {
                [name]: value
            },
            () => {
                this.filterFeed();
            }
        );
    };

    loadRecipes = () => {
        API.getUserRecipes(this.context.user._id).then(res => {
            this.setState({
                database: res.data.recipes,
                recipes: res.data.recipes
            });
        });
    };

    render() {
        const { username } = this.context.user || {};

        return (
            <Grid container justify="center" spacing={6}>
                <Grid container item justify="center" xs={12} sm={8}>
                    <ProfileBio user={username} />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <FormControl fullWidth={true}>
                        <InputLabel>Search Ingredients</InputLabel>
                        <Input
                            value={this.state.search}
                            name="search"
                            onChange={this.handleInputChange}
                        />
                    </FormControl>
                </Grid>

                <Grid container item justify="center" spacing={6} xs={12} sm={8}>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth={true}>
                            <NativeSelect
                                value={this.state.category}
                                name="category"
                                onChange={this.handleInputChange}
                            >
                                <option value={"All"}>All</option>
                                <option value={"Beer"}>Beer</option>
                                <option value={"Cookie"}>Cookie</option>
                                <option value={"Bread"}>Bread</option>
                                <option value={"Pickle"}>Pickle</option>
                                <option value={"Cake"}>Cake</option>
                                <option value={"Soup"}>Soup</option>
                                <option value={"Brunch"}>Brunch</option>
                                <option value={"Cocktail"}>Cocktail</option>
                                <option value={"Other"}>Other</option>
                            </NativeSelect>
                            <FormHelperText>Filter by Category</FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth={true}>
                            <NativeSelect
                                value={this.state.status}
                                name="prepStatus"
                                onChange={this.handleInputChange}
                            >
                                <option value={"All"}>All</option>
                                <option value={"Finished"}>Finished</option>
                                <option value={"Preparing"}>Currently Preparing</option>
                            </NativeSelect>
                            <FormHelperText>Filter by Preparation Status</FormHelperText>
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container item justify="center" xs={12} sm={8}>
                    {this.state.recipes.length > 0 ? (
                        <>
                            {this.state.recipes.map(recipe => (
                                <ProfileCard
                                    loadRecipes={this.loadRecipes}
                                    key={recipe._id}
                                    id={recipe._id}
                                    category={recipe.category}
                                    title={recipe.title}
                                    description={recipe.description}
                                    user={recipe.user}
                                    picture={recipe.picture}
                                    ingredients={recipe.ingredients}
                                    endTime={recipe.endTime}
                                    prepLength={recipe.prepLength}
                                ></ProfileCard>
                            ))}
                        </>
                    ) : (
                            <Grid item xs={12} sm={8}>
                                <h3>No Results to Display</h3>
                            </Grid>
                        )}
                </Grid>
            </Grid>
        );
    }
}

export default Profile;