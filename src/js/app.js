App = {
  web3Provider: null,
  contracts: {},


  initWeb3: function() {
    
    // Is there an injected web3 instance?
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fall back to Ganache
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:9545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    
    $.getJSON('TheMoon.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var TheMoonArtifact = data;
      App.contracts.TheMoon = TruffleContract(TheMoonArtifact);

      // Set the provider for our contract
      App.contracts.TheMoon.setProvider(App.web3Provider);

      // // Use our contract to retrieve and mark the adopted pets
      // return App.markLandowners();

      return App.getLandowners().then(function(landowners){
        console.log(landowners)
        return App.initTiles(landowners);
      })

    });

    
    
  },

  initTiles: function(landowners) {
    // Load pets.
    
    var unitsRow = $('#unitsRow');
    var unitTemplate = $('#unitTemplate');

    for (i = 0; i < landowners.length; i ++) {
      unitTemplate.find('.panel-title').text("Unit: " + i);
      unitTemplate.find('.owner').text(landowners[i]);
      unitTemplate.find('.btn-adopt').attr('data-id', i);

      unitsRow.append(unitTemplate.html());
    }

    App.bindEvents();


    
  },

  bindEvents: function() {
    $(document).on('click', '.btn-buy', App.handleBuy);
  },

  getNumUnits: function(){
    var theMoonInstance;

    return App.contracts.TheMoon.deployed().then(function(instance) {
      theMoonInstance = instance;
      return theMoonInstance.NUMUNITS();
    })
  },

  getLandowners: function(){

    return App.contracts.TheMoon.deployed().then(function(instance) {

      return instance.getLandowners.call();

    });
  },

  markLandowners: function() {
    
    App.getLandowners().then(function(landowners) {
      for (i = 0; i < landowners.length; i++) {
        $('.panel-pet').eq(i).find('.owner').text(landowners[i])
        if (landowners[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-pet').eq(i).find('button').text('Bought').attr('disabled', true);
        }
      }
    }).catch(function(err) {
      console.log(err.message);
    });

  },

  handleBuy: function(event) {

    event.preventDefault();

    var unitId = parseInt($(event.target).data('id'));

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.TheMoon.deployed().then(function(instance) {
        adoptionInstance = instance;

        // Execute adopt as a transaction by sending account
        return instance.buy(unitId, {from: account, value:10000000000000000});
      }).then(function(result) {
        return App.markLandowners();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
    
  }

};

$(function() {
  $(window).load(function() {
    App.initWeb3();
  });
});
