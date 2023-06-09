import React, { useState } from "react";
import Web3 from "web3";
require('dotenv').config();


const Account       = process.env.REACT_APP_ACCOUNT;
const PrivateKey    = process.env.REACT_APP_PRIVATE_KEY;
const RpcHttpUrl    = process.env.REACT_APP_RPC_HTTP_URL; 

const web3          = new Web3(new Web3.providers.HttpProvider(RpcHttpUrl));  

function Main(props){
  
    const [receiverAddress, setReceiverAddress] = useState("");
    const [transferAmount, setTransferAmount]   = useState("");
    const [tokenAddress, setTokenAddress]       = useState("");

    
    async function transfer(){
        
        const nonce = await web3.eth.getTransactionCount(Account, "latest");
       
        const value = web3.utils.toWei(transferAmount.toString(), 'Ether');
      
        const abi   = JSON.parse('[{"inputs":[{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"},{"internalType":"uint256","name":"initialBalance_","type":"uint256"},{"internalType":"address payable","name":"feeReceiver_","type":"address"}],"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"generator","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}]');
       
        const tokenContract = new web3.eth.Contract(abi, tokenAddress);
        
        const data  = tokenContract.methods.transfer(receiverAddress, value).encodeABI();

        
        
        const transaction = {
            'to': tokenAddress,
            'value': "0x00", 
            'gasLimit': 6721975, 
            'gasPrice': 20000000000, 
            'nonce': nonce,
            'data': data 
        }

       
        const signTrx = await web3.eth.accounts.signTransaction(transaction, PrivateKey);
      
        web3.eth.sendSignedTransaction(signTrx.rawTransaction, function(error, hash){
            if(error){
                console.log('Something went wrong', error);
            } else{
                console.log('transaction submitted ', hash);
                window.alert('Transaction submitted. Hash : '+hash);
            }
        })
    }

    return(
        <div >
            <br/>
            <div style={{color:"blue", fontSize:"1.5rem"}}>
               <h1> Welcome to CryptoXchange</h1>
            </div>
            <br/>
            <div style={{fontSize:"1.2rem"}}>
                 Sender's Address :
            </div>
            <div>
                <input
                    type="text"
                    style={{height:"1.5vw", width:"30vw"}}
                    onChange={(event) =>
                        setTokenAddress(event.target.value)
                    }
                    placeholder="0x0000....."
                />
            </div>
            <br/>
            <div style={{fontSize:"1.2rem"}}>
                Send to :
            </div>
            <div>
                <input
                    type="text"
                    style={{height:"1.5vw", width:"30vw"}}
                    onChange={(event) =>
                        setReceiverAddress(event.target.value)
                    }
                    placeholder="0x0000....."
                />
            </div>
            <br/>
            <div style={{fontSize:"1.2rem"}}>
                <strong>Enter value of TRNX :</strong>
            </div>
            <div>
                <input
                    type="text"
                    style={{height:"1.5vw", width:"5vw"}}
                    onChange={(event) =>
                        setTransferAmount(event.target.value)
                    }
                    placeholder="0.0" 
                /> tokens
            </div>
            <br/>
            <div>
                <button
                    type="submit"
                    onClick={() => transfer()}>Send</button>
            </div>
        </div>
    );
}

export default Main;