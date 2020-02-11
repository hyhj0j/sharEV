pragma solidity ^0.5.0.;

contract EvContract{
    uint public cntS=0;
    uint public cntB=0;
    uint public cntI=0;
    uint public cntA=0;
    uint public price=0;
    mapping(uint => Car) public sellers;
    mapping(uint => Car) public buyers;
    mapping(uint => Car) public idles;
    mapping(uint => Car) public cars;

    mapping(address => uint) balances;
    mapping(address => mapping(address => uint)) allowed;

    string public symbol;
    string public name;
    uint8 public decimals;
    uint public totalSupply;
    uint256 public unitsOneEthCanBuy;     // How many units of your coin can be bought by 1 ETH?
    uint256 public totalEthInWei;         // WEI is the smallest unit of ETH (the equivalent of cent in USD or satoshi in BTC). We'll store the total ETH raised via our ICO here.  
    address payable public fundsWallet;           // Where should the raised ETH go?
    //uint256 public totalSupply;


    struct Car{
        uint id;
        string carNum;
        string name;
        address owner;
        uint socI;
        uint socR;
        uint price;
        bool purchased;
    }

    event CarSet(
        uint id,
        string carNum,
        string name,
        address owner,
        uint socI,
        uint socR,
        uint price,
        bool purchased
    );

    event CarBuy(
        uint id,
        string carNum,
        string name,
        address owner,
        uint socI,
        uint socR,
        uint price,
        bool purchased
    );

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    constructor() public {
        balances[msg.sender] = 1000000000000000000000000;               // Give the creator all initial tokens. This is set to 1000 for example. If you want your initial tokens to be X and your decimal is 5, set this value to X * 100000. (CHANGE THIS)
        totalSupply = 1000000000000000000000000;                        // Update total supply (1000 for example) (CHANGE THIS)
        name = "EVToken";                                   // Set the name for display purposes (CHANGE THIS)
        decimals = 18;                                               // Amount of decimals for display purposes (CHANGE THIS)
        symbol = "EVT";                                             // Set the symbol for display purposes (CHANGE THIS)
        unitsOneEthCanBuy = 10;                                      // Set the price of your token for the ICO (CHANGE THIS)
        fundsWallet = msg.sender;                                  // The owner of the contract gets ETH
    }
    
    function() external payable {
        totalEthInWei = totalEthInWei + msg.value;
        uint256 amount = msg.value * unitsOneEthCanBuy;
        require(balances[fundsWallet] >= amount);

        balances[fundsWallet] = balances[fundsWallet] - amount;
        balances[msg.sender] = balances[msg.sender] + amount;

        emit Transfer(fundsWallet, msg.sender, amount); // Broadcast a message to the blockchain

        fundsWallet.transfer(msg.value);
    }

    function balanceOf(address _owner) public view returns (uint balance){
        return balances[_owner];
    }

    /**
     * Transfers tokens from the sender's wallet to the specified `_to` wallet.
     * @param _to Address of the transfer's recipient.
     * @param _value Number of tokens to transfer.
     * @return True if the transfer succeeded.
     */
    function transfer(address _to, uint _value) public returns (bool success) {
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    /**
     * Transfer tokens from any wallet to the `_to` wallet. This only works if
     *     the `_from` wallet has already allocated tokens for the caller keyset
     *     using `approve`. From wallet must have sufficient balance to
     *     transfer. Caller must have sufficient allowance to transfer.
     * @param _from Wallet address that tokens are withdrawn from.
     * @param _to Wallet address that tokens are deposited to.
     * @param _value Number of tokens transacted.
     * @return True if the transfer succeeded.
     */
    function transferFrom(address _from, address _to, uint _value) public returns (bool success){
        balances[_from] -= _value;
        allowed[_from][address(0)] -= _value;
        balances[_to] += _value;
        emit Transfer(_from, _to, _value);
        return true;
    }

    /**
     * Sender allows another wallet to `transferFrom` tokens from their wallet.
     * @param _spender Address of `transferFrom` recipient.
     * @param _value Number of tokens to `transferFrom`.
     * @return True if the approval succeeded.
     */
    function approve(address _spender, uint _value) public returns (bool success) {
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    /**
     * Gets the number of tokens that a `_owner` has approved for a _spender
     *     to `transferFrom`.
     * @param _owner Wallet address that tokens can be withdrawn from.
     * @param _spender Wallet address that tokens can be deposited to.
     * @return The number of tokens allowed to be transferred.
     */
    function allowance(address _owner, address _spender) public view returns (uint remaining) {
        return allowed[_owner][_spender];
    }

    function setCar(string memory _carNum, string memory _name, uint _socI, uint _socR) public{
        if(_socI > _socR){
            price = _socI - _socR;
            cars[cntA] = Car(cntA,_carNum, _name, msg.sender, _socI, _socR,price, false);
            cntS++;
            
        } else if (_socI < _socR){
            price = _socR - _socI;
            buyers[cntB] = Car(cntA, _carNum, _name, msg.sender, _socI, _socR,price,false);
            cntB++;
        } else{
            price = _socI - _socR;
            idles[cntI] = Car(cntA, _carNum, _name, msg.sender, _socI, _socR,price,false);
            cntI++;
        }
        price = _socI - _socR;
        cars[cntA] = Car(cntA, _carNum, _name, msg.sender, _socI, _socR,price,false);
        cntA++;

        emit CarSet(cntA, _carNum, _name, msg.sender, _socI, _socR, price, false);
    }

    function buyCar(uint _id) public payable{
        Car memory _car = cars[_id];
        address _r = _car.owner;
        require(_r != msg.sender);
        require(!_car.purchased);
        uint rprice = _car.price * 1000000000000000000;
        transfer(_car.owner,rprice);
        // Transfer ownership to the buyer
        _car.owner = msg.sender;
        // Mark as purchased
        _car.purchased = true;
        // Update the product
        cars[_id] = _car;

        emit CarBuy(cntA, _car.carNum, _car.name, msg.sender, _car.socI, _car.socR, _car.price, true);
    }
}