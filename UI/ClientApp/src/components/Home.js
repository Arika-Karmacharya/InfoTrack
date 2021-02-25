import React, { Component } from "react";
import FormGroup from "components/form";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import isEmpty from "helpers/isEmpty";
import { InputValidator } from "helpers/inputValidator";
import SearchResult from "./SearchResults";
import { connect } from "react-redux";
import { loadSearchEngines, getSearchResults } from "../redux/actions";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

class Home extends Component {
  static displayName = Home.name;
  constructor(props) {
    super(props);
    this.state = {
      formState: {
        searchEngine: {},
        searchText: "online title search",
      },
      errors: {},
      isFormSubmitted: false,
    };
  }
  async componentDidMount() {
    await this.props.loadSearchEngines();
  }
  handleFieldChange = (name, newValue) => {
    this.setState((prevState) => ({
      ...prevState,
      formState: {
        ...prevState.formState,
        [name]: newValue,
      },
      errors: {
        ...prevState.errors,
        [name]: this.state.isFormSubmitted
          ? isEmpty(newValue)
            ? "Required"
            : ""
          : "",
      },
    }));
  };
  async handleSubmit(event) {
    const { searchEngine, searchText } = this.state.formState;
    let fieldsToValidate = {
      searchEngine,
      searchText,
    };
    let errors = await InputValidator(document, fieldsToValidate);
    console.log(errors);
    if (isEmpty(errors)) {
      await this.props.getSearchResults({
        searchEngine: searchEngine,
        searchText,
      });
    }
    this.setState({ errors, isFormSubmitted: true });
  }
  render() {
    const { formState, errors } = this.state;
    const { searchEngine, searchText } = formState;
    return (
      <div>
        <Card variant="outlined">
          <CardContent>
            <form>
              <FormGroup
                formName="reactselect"
                onChange={this.handleFieldChange}
                name="searchEngine"
                value={searchEngine}
                options={this.props.searchEngines}
                placeholder="Choose a Search Engine"
                error={errors && errors.searchEngine}
                label="Choose a Search Engine"
                width="250px"
                        />
                       <br/>
              <FormGroup
                name="searchText"
                value={searchText}
                onChange={this.handleFieldChange}
                label="Key words"
                error={errors && errors.searchText}
                width="150px"
                disabled="disabled"
                        />
                        <br/>
                <Button
                  variant="contained"
                  onClick={() => this.handleSubmit()}
                >
                  Submit
                </Button>
            </form>
          </CardContent>
        </Card>
        <div className="mt-md">
          <SearchResult />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  searchEngines: state.mainReducer.searchEngines,
});

const mapDispatchToProps = {
  loadSearchEngines,
  getSearchResults,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
