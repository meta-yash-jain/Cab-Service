import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import APIConnect from './api-connect';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: []
    }

    this.bookCab = this.bookCab.bind(this);
    this.handleBookCab = this.handleBookCab.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { result: { content, error, isFetching, method, success } = {} } = nextProps;

    if (success && !isFetching) {
      if (method !== 'get') {
        this.props.dispatch(APIConnect.get());
      }
      else {
        this.setState({ data: content, showInput: false });
      }
    }
    else if (error) {
      this.setState({ data: [], showInput: false });
    }
  }

  componentDidMount() {
    this.props.dispatch(APIConnect.get());
  }

  handleBookCab() {
    this.setState({ showInput: true });
  }

  bookCab() {
    this.props.dispatch(APIConnect.post(JSON.parse(this.state.text)));
  }

  nearBy(post) {
    this.props.dispatch(APIConnect.nearBy());
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  render() {
    const { data, showInput } = this.state
    const { error, isFetching, success } = this.props.result

    return (
      <div className="container">
        {(isFetching || !success) &&
          <div id="overlay">
            <i className="fa fa-spinner fa-spin fa-5x pageCenter"></i>
            {!isFetching && !success && alert("Error: " + JSON.stringify(error))}
          </div>
        }
        <h2>Bookings Info: </h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Source</th>
              <th>Destination</th>
              <th>Fare</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => {
              return (
                <tr key={i}>
                  <td>{d.source}</td>
                  <td>{d.destination}</td>
                  <td>{d.fare}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {
          !showInput ?
            <Button bsStyle='primary' onClick={this.handleBookCab}>Book Cab</Button> :
            <div style={{ "display": "flex" }}>
              <textarea className="form-control" onChange={this.handleChange} rows="3"></textarea>
              <Button bsStyle='primary' style={{ "margin": "20px" }} onClick={this.bookCab}>Book</Button>
            </div>
        }
      </div >
    )
  }
};

const mapStateToProps = (state) => {
  const { result } = state

  return { result };
};

export default connect(mapStateToProps)(App);
