(function(){
  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA9X77IQX80foApWG1VHLOecaHN9XW5KAI",
    authDomain: "test-4e399.firebaseapp.com",
    databaseURL: "https://test-4e399.firebaseio.com",
    storageBucket: "test-4e399.appspot.com",
    messagingSenderId: "55166904374"
  };
  firebase.initializeApp(config);
  
  angular
    .module('app',['firebase'])
    .controller('MyController', function($scope, $firebaseObject){
      const rootRef = firebase.database().ref();
      const ledRef = rootRef.child("led");
      $firebaseObject(ledRef);
      
      $scope.change = function(){
        var rgd = hexToRGB($scope.color);
        console.log(rgd);
        
        ledRef.set(
              { 
                red: rgd.r,
                green: rgd.g,
                blue: rgd.b, 
                
              })
              .then(function() {
                console.log('Succeeded');
              })
              .catch(function(error) {
                console.log('Failed');
              });
      };
      
      
      ledRef.once('value').then(function(dataSnapshot) {
        var val = dataSnapshot.val();
        $scope.color = RGBToHex(val.red,val.green,val.blue);
      });
    })
}());