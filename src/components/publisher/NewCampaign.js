import React, {Component} from 'react';
import {Form, FormControl, InputGroup, Button, Dropdown} from 'react-bootstrap';
import {Row, Col} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';

class NewCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'view': '',

    }
  }
  componentWillMount() {
    this.setState({'view': 'createAccount'});
  }
  createCampaignWallet = () => {
    const {user} = this.props;
    this.props.createCampaignWallet({'address': user.selectedAddress});
  }
  
  generateTestDai = () => {
    const {publisher: {currentAccount}, user: {selectedAddress}} = this.props;
    const payload = {'userWallet': selectedAddress, 'publisherWallet': currentAccount};
    this.props.generateFunds(payload);
  }
  
  componentWillReceiveProps(nextProps) {
    const {publisher: {currentAccount, newAccountAdding, generatingFunds}} = nextProps;
    const {history} = this.props;

    if (this.props.publisher.newAccountAdding && !newAccountAdding) {
      
      this.setState({'view': 'fundAccount'});
    }
    if (this.props.publisher.generatingFunds && !generatingFunds) {
      this.setState({'view': 'createCampaign'});
    }
  }
  
  render() {
    const {view} = this.state;
    const {publisher} = this.props;

    if (view === 'createAccount') {
    return (
      <div>
        <div>
          <div>A new campaign allows you to specify a link that others can promote on Twitter.</div>
          <div>You can specify the payout rewards for engagement metrics on the Tweet</div>
          <div>The payouts will be made seamlessly according to the specified payout parameters and interval using SuperFluid finance.</div>
        </div>
        <div>
          Ready to begin?
          <Button onClick={this.createCampaignWallet}>Create campaign wallet.</Button>
          Once created you need to fund the wallet with some Testnet Ether to process transaction fees.Array
        </div>
      </div>
      )
  } else if (view === 'fundAccount') {
    return (
      <div>
        <div>Your publication wallet address is {publisher.currentAccount ? publisher.currentAccount : ''}</div>
        <div>Fund this account with Test ether here.</div>
        <div>Click <Button onClick={this.generateTestDai}>here</Button> after funding to generate some xDai to fund your campaigns.</div>
      </div>
      )
  } else if (view === 'createCampaign') {
    return <CampaignDetails {...this.props}/>
  }
  } 
}

class CampaignDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'marketLink': '',
      'payoutInterval': '1',
      'payoutIntervalUnit': 'minutes',
      'likePayout': '',
      'retweetPayout': '',
      'commentPayout': ''
    }
  }
  marketLinkChanged = (evt) => {
    this.setState({'marketLink': evt.target.value});
  }
  likePayoutChanged = (evt) => {
    this.setState({'likePayout': evt.target.value});
  }
  retweetPayoutChanged = (evt) => {
    this.setState({'retweetPayout': evt.target.value});
  }
  commentPayoutChanged = (evt) => {
    this.setState({'commentPayout': evt.target.value});
  }
  
  submitPublisherRequest = (evt) => {
    const {publisher: {currentAccount}, user: {selectedAddress}} = this.props;
    const {match: {params}} = this.props;
    evt.preventDefault();
    let payload = this.state;
    payload.publisherWalletAddress = currentAccount;
    payload.publisherUserAddress = selectedAddress;
    this.props.submitCampaignDetails(payload);
  }
  render() {
    const {marketLink,payoutInterval, payoutIntervalUnit, likePayout, retweetPayout, commentPayout} = this.state;
    return (
      <div>
        <Form onSubmit={this.submitPublisherRequest}>

         <Form.Group controlId="formBasicEmail">
           Add the link of the tweet which you want to promote
           <Form.Control type="text" value={marketLink} onChange={this.marketLinkChanged}/>
         </Form.Group>
         <div>Payout for engagement metrics</div>
         <Row>

           <Col lg={4}>
             <div>
               For every like
        <InputGroup className="mb-2">
          <FormControl id="inlineFormInputGroup" placeholder="Like payout" value={likePayout} onChange={this.likePayoutChanged}/>
          <InputGroup.Append>
            <InputGroup.Text>xDAI</InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>               
             </div>
           </Col>
           <Col lg={4}>
             <div>
               For every retweet
        <InputGroup className="mb-2">
          <FormControl id="inlineFormInputGroup" placeholder="Retweet payout" value={retweetPayout} onChange={this.retweetPayoutChanged}/>
          <InputGroup.Append>
            <InputGroup.Text>xDAI</InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>                    
             </div>
           </Col>
           <Col lg={4}>
             <div>
               For every comment
              <InputGroup className="mb-2">
                <FormControl id="inlineFormInputGroup" placeholder="Comment payout" value={commentPayout} onChange={this.commentPayoutChanged}/>
                <InputGroup.Append>
                  <InputGroup.Text>xDAI</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>                    
             </div>
           </Col>
         </Row> 
         <Row>
           <Col lg={12}>
             Payout interval
             <Row>
             <Col lg={6}>
             <FormControl type="text" value={payoutInterval} onChange={this.payoutIntervalChanged}/>
             </Col>
             <Col lg={6}>
             <Dropdown>
                <Dropdown.Toggle  id="dropdown-basic">
                  {payoutIntervalUnit}
                </Dropdown.Toggle>
              
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
             </Col>
             </Row>
             </Col>
           
         </Row>

         <Button type="submit">
           Publish
         </Button>
        </Form>        
      </div>
      )
  }
}


export default withRouter(NewCampaign);