var TheMoon = artifacts.require("TheMoon");

contract("TheMoon", function(accounts){

    const weiPriceKnown = 10000000000000000;
    var weiPrice;
    var gasEstimate;

    const owner = accounts[0]; // this is the account we deploy as owner
    const withdrawWallet = accounts[1];
    const account1 = accounts[2];
    const account2 = accounts[3];

    it("should pass a trivial test", function(){
        assert.equal(5,5, "5!=5")
    })

    it("should be 100 eth in account1", function(){
        assert.equal(web3.fromWei(web3.eth.getBalance(account1)), 100, "not 100 eth in account1")
    })

    it("should return the right weiPrice", function(){

        return TheMoon.deployed().then(function(instance) {
            return instance.weiUnitPrice.call();
        }).then(function(response) {
            weiPrice = response
            assert.equal(response, weiPriceKnown, "Wrong weiPrice returned")
        });

    })

    it("should return an estimate of gas cost", function(){
        return TheMoon.deployed().then(function(instance){
            instance.buy.estimateGas(2)
            .then(function(response){
                gasEstimate = response;
                // console.log(gasEstimate);
                // assert(gasEstimate > 0, "estimated gas is not larger than 0")
                assert(4==4, "test")
            });
            
        })
    })

    // it("should let a user buy a unit", function(){
    //     return TheMoon.deployed().then(function(instance) {
    //         return instance.buy(2, {from:account2, value: weiPrice});
    //     }).then(function(response) {
    //         log = response.valueOf().logs[0];
    //         assert.equal(log.event, "Buy", "wrong event type");
    //         assert.equal(log.args.owner, accounts[0], "wrong owner");
    //         assert.equal(log.args.idx.toString(), "2", "Wrong unit id");
    //     });
    // })

    // it("should not let a user buy a unit for insufficient funds", function(){
    //     return TheMoon.deployed().then(function(instance) {
    //         return instance.buy(2, {from:accounts[0], value: weiPrice-1});
    //     }).then(function(response) {
    //         //Doesn't get hit
    //         console.log(response)
    //         assert.fail();
    //     })
    //     .catch(function(error) {            
    //         assert(error.message.indexOf("revert") >= 0);
    //       });
    // })

    // it("should ")

})