import React, {Component} from 'react';
import {Form, ListGroup, ListGroupItem, Row, Col} from 'react-bootstrap';
import {Link, Switch, Router, Route} from 'react-router-dom';
import ActiveCampaigns from './ActiveCampaigns';
import JoinCampaign from './JoinCampaign';

export default class MarketerHome extends Component {
  componentWillMount() {
    this.props.fetchOpenCampaigns();
  }
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/app/campaign">
            <ActiveCampaigns {...this.props}/>
          </Route>
          <Route path="/app/campaign/:id">
            <JoinCampaign {...this.props}/>
          </Route>
        </Switch>
      </div>
      )
  }
}