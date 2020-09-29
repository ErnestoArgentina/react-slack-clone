import React from "react";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";

class Register extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: [],
    loading: false
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault;

    if (this.isFormValid()){
        this.setState({errors: [], loading: true})
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((createdUser) => {
          console.log("Created user is", createdUser);
          this.setState({loading: false})
        })
        .catch((error) => {
          console.log(error);
          this.setState({errors: this.state.errors.concat(error),loading: false})

        });
    }
    
  };

  isFormValid = () => {
    let errors = [];
    let error;
    if (this.isFormEmpty(this.state)) {
      error = { message: "Fill in all fields" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: "Password invalid" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      return true;
    }
  };

  displayErrors = (errors) =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password != passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  };

  isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };

  handleImputError = (errors, inputName) =>{
      errors.some(error =>
        error.toLowerCase().includes(inputName)
        )
  }

  render() {
    const {
      username,
      email,
      password,
      passwordConfirmation,
      errors,
      loading
    } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="H3" color="orange" icon textAlign="center">
            <Icon name="puzzle piece" color="orange"></Icon>
            Register
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
              <Form.Input
                value={username}
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={this.handleChange}
              />

              <Form.Input
                value={email}
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email"
                type="email"
                onChange={this.handleChange}
              />

              <Form.Input
                value={password}
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={this.handleChange}
              />

              <Form.Input
                value={passwordConfirmation}
                fluid
                name="passwordConfirmation"
                icon="lock"
                iconPosition="left"
                placeholder="Password Confirmation"
                type="password"
                onChange={this.handleChange}
              />

              <Button disabled={loading} className={loading?'loading': ''} color="orange" fluid size="large">
                Submit
              </Button>
            </Segment>
          </Form>

          {errors.length > 0 && (
            <Message error>
                <h3>Error</h3>
                {this.displayErrors(errors)}
            </Message>
          )}

          <Message>
            Already a user? <Link to="/login">Login</Link>{" "}
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
