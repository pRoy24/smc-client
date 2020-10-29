import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {Row, Col, ListGroup, ListGroupItem} from 'react-bootstrap';

class ActiveCampaigns extends Component {

  render() {
    console.log("HERE HERE");
    const {campaign: {campaignList}} = this.props;
    let campignsList = <span/>;
    if (campaignList && campaignList.length > 0) {
      campignsList = campaignList.map(function(item, idx){
        return <ListGroupItem>
          <Link to={`/app/campaign/${item._id}`}>
          <div>{item.marketLink}</div>
          <div>Engagement Payouts</div>
          <Row>
          <Col lg={3}>{item.retweetPayout} per Retweet</Col>
          <Col lg={3}>{item.likePayout} per Like</Col>
          <Col lg={3}>{item.commentPayout} per Comment</Col>
        
          </Row>
            </Link>
        </ListGroupItem>
      })
    }
    return (
      <div>
        <div>
          Open Campaigns
        </div>
        <ListGroup>
          {campignsList}
        </ListGroup>      
      </div>
      )
  }
}

export default withRouter(ActiveCampaigns)