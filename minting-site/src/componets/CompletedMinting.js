import React from 'react'

const CompletedMinting = () => {

    const viewOpensea = () => {
        const url = `https://testnets.opensea.io/collection/web3doodles-kbznruu4ms`;
        window.open(url, '_blank');
      }


  return (
    <div>
        <div>All Set! Your NFT has been minted.</div>
        <div className='connect-wallet' onClick={viewOpensea}>VIEW OPENSEA</div>
    </div>
  )
}

export default CompletedMinting