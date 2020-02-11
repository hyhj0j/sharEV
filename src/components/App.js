import React, { Component } from "react";
import Web3 from "web3";
import "./App.css";
import EvContract from "./abis/EvContract.json";
import Navbar from "./Navbar";
import Main from "./Main";
import Token from "./Token";

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    this.setState({ account: accounts[0] });
    //Network id
    const networkId = await web3.eth.net.getId();
    const networkData = EvContract.networks[networkId];

    if (networkData) {
      const evContract = web3.eth.Contract(EvContract.abi, networkData.address);
      this.setState({ evContract });
      console.log(EvContract);
      const cntA = await evContract.methods.cntA().call();
      const tokenAddress = networkData.address;
      this.setState({ cntA });
      this.setState({ tokenAddress: networkData.address });

      var balance = await this.state.evContract.methods
        .balanceOf(this.state.account)
        .call();
      console.log(balance);
      balance = balance / 1000000000000000000;
      var hex = balance.toString();
      var ethBalance = await web3.eth.getBalance(this.state.account);
      var eth = web3.utils.fromWei(ethBalance.toString(), "ether");
      this.setState({ hex });
      this.setState({ cntA });
      this.setState({ tokenAddress: networkData.address });
      this.setState({ eth });
      console.log(hex);
      console.log(ethBalance);

      //load posts
      for (var i = 0; i < cntA; i++) {
        const car = await evContract.methods.cars(i).call();
        this.setState({
          cars: [...this.state.cars, car]
        });
      }
      console.log({ cars: this.state.cars });
      this.setState({ loading: false });
    } else {
      window.alert("EvContract contract not deployed to detected network.");
    }
    //address

    //abi
  }

  setCar(carNum, name, socI, socR) {
    this.setState({ loading: true });
    this.state.evContract.methods
      .setCar(carNum, name, socI, socR)
      .send({ from: this.state.account })
      .once("receipt", receipt => {
        this.setState({ loading: false });
      });
  }

  buyCar(id, price) {
    this.setState({ loading: true });
    this.state.evContract.methods
      .buyCar(id)
      .send({ from: this.state.account, value: price })
      .once("receipt", receipt => {
        this.setState({ loading: false });
      });
    console.log(price);
    console.log(id);
  }

  buyToken(tokenvalue) {
    this.setState({ loading: true });
    const web3 = window.web3;
    web3.eth
      .sendTransaction({
        from: this.state.account,
        to: this.state.evContract.options.address,
        value: web3.utils.toWei(tokenvalue.toString(), "ether")
      })
      .once("receipt", receipt => {
        this.setState({ loading: false });
      });
    console.log(tokenvalue);
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      evContract: null,
      web3: null,
      cars: [],
      value: "",
      loading: true,
      tokenAddress: "",
      hex: "",
      ethBalance: ""
    };

    this.setCar = this.setCar.bind(this);
    this.buyCar = this.buyCar.bind(this);
    this.buyToken = this.buyToken.bind(this);
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <Token
          account={this.state.account}
          buyToken={this.buyToken}
          tokenAddress={this.state.tokenAddress}
          balance={this.state.hex}
          ethBalance={this.state.eth}
        />

        {this.state.loading ? (
          <div id="loader" className="loader__text">
            <p>Loading...</p>
          </div>
        ) : (
          <Main
            cars={this.state.cars}
            setCar={this.setCar}
            buyCar={this.buyCar}
          />
        )}
      </div>
    );
  }
}

export default App;
