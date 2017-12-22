pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/TheMoon.sol";

contract TestTheMoon {
  TheMoon theMoon = TheMoon(DeployedAddresses.TheMoon());

  function testAlwaysPasses() public { 
    uint256 i = 2;
    Assert.equal(i,2, 'always passes');
  }

  // Testing the adopt() function
  function _testUserCanBuy() public {
    uint returnedId = theMoon.buy(2); 

    uint expected = 2;

    Assert.equal(returnedId, expected, "Purchase of unit 2 should be recorded.");
  }

  // Testing retrieval of a single unit's owner
  function _testGetOwnerAddressByUnitId() public {
    // Expected owner is this contract
    address expected = this;

    address adopter = theMoon.landowners(2);

    Assert.equal(adopter, expected, "Owner of unit ID 2 should be recorded.");
  }

  // // Testing retrieval of all pet owners
  // function testGetAdopterAddressByPetIdInArray() public {
  //   // Expected owner is this contract
  //   address expected = this;

  //   // Store adopters in memory rather than contract's storage
  //   address[16] memory adopters = adoption.getAdopters();

  //   Assert.equal(adopters[8], expected, "Owner of pet ID 8 should be recorded.");
  // }

}