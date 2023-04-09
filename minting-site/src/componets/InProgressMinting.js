import React from 'react';
import ReactLoading from 'react-loading';

const InProgressMinting = (props) => {
  return (
    <div>
        <div> Your NFT is being minted. Please wait. </div>
        <ReactLoading type={"bars"} color={"#fff"} />
        <div className='connect-wallet' onClick={props.checkEtherScan}>CHECK ETHERSCAN</div>
    </div>
  )
}

export default InProgressMinting