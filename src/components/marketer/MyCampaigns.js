import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {Row, Col, ListGroup, ListGroupItem} from 'react-bootstrap';

export default class MyCampaigns extends Component {
  render() {
    const {campaign: {campaignList}, user: {selectedAddress}} = this.props;

    const web3 = window.web3;
    let campaignsFilteredList = <span/>;
    const self = this;
    if (campaignList && campaignList.length > 0) {
       campaignsFilteredList = campaignList.filter(function(item, fIdx){
        let marketerFound = item.marketers.find(function(fItem, fIdx){
          return web3.utils.toChecksumAddress(fItem.userAddress) === web3.utils.toChecksumAddress(selectedAddress);
        });

        if (marketerFound) {
          return item;
        }
      }).map(function(item, idx){
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
          {campaignsFilteredList}
        </ListGroup>      
      </div>
      )
  }
}