pragma solidity ^0.4.17;

contract TheMoon {

    uint public constant weiUnitPrice = 10000000000000000; //0.01 ether
    uint public constant NUMUNITS = 4; //HAVE TO CHANGE BELOW ALSO!
    // address[] public landowners = new address[](NUMUNITS); //complicated
    address[4] public landowners;

    /// Buy is emitted when a unit is reserved.
    event Buy(
      uint idx,
      address owner
    );

    // Buy an untouched unit of the moon
    function buy(uint unitId) public payable returns (uint) {
      
      require(msg.value >= weiUnitPrice);
      require(unitId >= 0 && unitId <= NUMUNITS-1 && landowners[unitId] == 0x000 );

      landowners[unitId] = msg.sender;

      Buy(unitId, msg.sender);

      return unitId; //Return values don't actually work for functions that modify the blockchain!
    }

    // Retrieving the landowners
    function getLandowners() public view returns (address[4]) {
      return landowners;
    }



}