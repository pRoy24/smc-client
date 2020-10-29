import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';

class JoinCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaignLink: '',
      currentView: 'submit'
    }
  }
  componentWillMount() {
    const {match: {params}} = this.props;
    this.props.fetchCurrentCampaign(params.id);
  }
  
  submitProfile = () => {
    const {campaignLink} = this.state;
    const { user: {selectedAddress}} = this.props;
    const {match: {params}} = this.props;
    const payload = {'campaignLink': campaignLink, 'userAddress': selectedAddress, '_id': params.id};
    this.props.submitJoinCampaign(payload)
  }
  
  campaignLinkChanged = (evt) => {
    this.setState({'campaignLink': evt.target.value});
  }
  
  componentWillReceiveProps(nextProps) {
    const {campaign: {joinCampaignSubmitting}} = nextProps;
    if (this.props.campaign.joinCampaignSubmitting && !joinCampaignSubmitting) {
      this.setState({'currentView': 'approve'});
    }
  }
  
  approvePublisher = () => {
    const {campaign: {currentCampaign}, user: {selectedAddress}} = this.props;
    
    this.props.approveSubscription(currentCampaign.publisherWalletAddress, selectedAddress);
  }
  
  render() {
    const {campaign: {currentCampaign},} = this.props;
    const {campaignLink, currentView} = this.state;
    if (currentView === 'submit') {
    return (
      <div>
        <div>Current campaign</div>
        <div>Quote tweet or retweet the following tweet</div>
        <div>{currentCampaign.marketLink}</div>
        <div>Post retweet link here</div>
        <Form.Control type="text" value={campaignLink} onChange={this.campaignLinkChanged}/>
        <div>Payout will be made every {currentCampaign.payoutInterval} {currentCampaign.payoutIntervalUnit}</div>
        <Button onClick={this.submitProfile}>Submit</Button>
      </div>
      )
   } else{
      return (
        <div>
          <div>Approve the publisher to automatically receive your xDai payouts.</div>
          <div><Button onClick={this.approvePublisher}>Approve</Button></div>
        </div>
        )  
    }
}
}

export default withRouter(JoinCampaign);