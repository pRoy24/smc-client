import React, {Component} from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import './landing.scss';
import {Link, withRouter} from 'react-router-dom';


class Landing extends Component {
  redirectToHome = () => {
    const {history} = this.props;
    history.push('/app');
  }
  
  render() {
    return (
      <Container>
        <div className="app-landing-text-container">
          Superfluid marketing campaigns
          <div>
            Get better engagement and metrics.
            Pay out streams for engagement.
            <div>
              <Button onClick={this.redirectToHome}>
                 View App
              </Button>
            </div>
          </div>
        </div>
      </Container>
      )
  }
}

export default withRouter(Landing);