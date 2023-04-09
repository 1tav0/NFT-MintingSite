import React from 'react'

const StartMinting = (props) => {
  return (
    <div className="mint-start">
        <div className='connect-wallet' onClick={props.mint}>MINT</div>
        <div className='connect-wallet' onClick={props.logOut}>LOGOUT</div>
    </div>
  )
}

export default StartMinting