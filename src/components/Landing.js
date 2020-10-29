import React, {Component} from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import './landing.scss';
import {Link, withRouter} from 'react-router-dom';


class Landing extends Component {
  redirectToHome = () => {
    const {history} = this.props;
    history.push('/app/campaign');
  }
  
  render() {
    return (
      <Container>
        <div className="app-landing-text-container">
          Superfluid marketing campaigns
          <div>
            <div>Get better engagement and metrics.</div>
            <div>
              Payout a continuous stream to your marketers based on performance metrics.
            </div>
            <div>Pay out streams for engagement.</div>
            <div>
              <Button onClick={this.redirectToHome} className="primary-btn landing-btn">
                 Go to App
              </Button>
            </div>
          </div>
        </div>
      </Container>
      )
  }
}

export default withRouter(Landing);