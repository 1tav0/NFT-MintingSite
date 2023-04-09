import logo from './logo.svg';
import { useState, useEffect } from "react";
import './App.css';
import { useMoralis } from "react-moralis";
import abi from './contracts/contract.json';
import StartMinting from './componets/StartMinting';
import InProgressMinting from './componets/InProgressMinting';
import CompletedMinting from './componets/CompletedMinting';

function App() {
  // create a state varaible for supply
  const [totalSupply, setTotalSupply] = useState(0);
  // create a state varaible for inprogress
  const [inProgress, setInProgress] = useState(false);
  // create a state varaible for completed
  const [completed, setCompleted] = useState(false);
  //create a hash state
  const [hash, setHash] = useState();
  const { authenticate, enableWeb3, Moralis, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();
  
  const logOut = async () => {
    await logout();
      // console.log("logged out");
  }

  useEffect(() =>{
    const getSupply = async () => {
      if(isAuthenticated){
        await enableWeb3();
        getTotalSupply();
      }
    }
    getSupply();
  }, [isAuthenticated])


  const checkEtherScan = () => {
    if(!hash) return;
    const url = `https://rinkeby.etherscan.io/tx/${hash}`;
    window.open(url, '_blank');
}


  const mint = async () => {
    const sendOptions = {
      contractAddress: "0xEE640FC02a2dE3C3EA6e11856e246EdF5F6e2b4F",
      functionName: "safeMint",
      abi: abi,
      msgValue: Moralis.Units.ETH("0.01")
    };
    // add ether to in sendOption for MOralis
    const transaction = await Moralis.executeFunction(sendOptions);
    setHash(transaction.hash);
    
    setInProgress(true);
    //waits a confirmation from the blockchain 
    await transaction.wait();
    //we are done and confirmed
    setInProgress(false);
    setCompleted(true);

  }

  //CREATE A FUNCTION TO GET THE SUPPLY OF OUR NFTS
  //HOW MANY NFTS HAVE BEEN MINTED SO FAR
  //USE THE totalSupply() function
  const getTotalSupply = async () => {
    const sendOptions = {
      contractAddress: "0xEE640FC02a2dE3C3EA6e11856e246EdF5F6e2b4F",
      functionName: "totalSupply",
      abi: abi
    };
     // add ether to in sendOption for MOralis
    const message = await Moralis.executeFunction(sendOptions);
    setTotalSupply(message.toNumber());
  }

  const login = async () => {
    if (!isAuthenticated) {

      await authenticate({signingMessage: "Log in using Moralis" })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  const getState = () => {
    if(isAuthenticated){

      if(inProgress){
        return(
          <InProgressMinting  checkEtherScan={checkEtherScan} />
        )
      }
      if(completed){
        return(
          <CompletedMinting />
        )
      }

      return (
        <StartMinting mint={mint} logOut={logOut} />
      )
    }else{
      return (
        <div className='connect-wallet' onClick={login}>CONNECT WALLET</div>
      )
    }

  }

// https://cdn-std.droplr.net/files/acc_990213/aIieHW
  return (
    <div className="App">
       <video class="background-video" src="https://cdn.videvo.net/videvo_files/video/free/2019-12/large_watermarked/190915_B_01_Timelapse%20Danang_05_preview.mp4" width='400' height='400' autoPlay muted playsInline loop> 
        </video>
      <div className='main'>
        <div className='minting'>
          <div className='left'>
            <video width='400' height='400' autoPlay muted playsInline loop> 
              <source src="https://cdn-std.droplr.net/files/acc_990213/d9ucir" type="video/mp4"/>
            </video>
          </div>
          <div className='right'>
            <h2>CryptoGang: INTO THE METAVERSE</h2>
            <div className='minted-amount'> {totalSupply} minted / 200</div>
            <div className='actions'>
             {getState()}
            </div>
          </div>
        </div>
        <div className='footer'>MINTING NOW</div>
      </div>
    </div>
  );
}

export default App;
