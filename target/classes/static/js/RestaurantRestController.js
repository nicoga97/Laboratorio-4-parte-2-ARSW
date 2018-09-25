 var network = (function () {

   var loadOrders =function () {
               getOrdersRequest();
   };

    var getCurrentOrders = function () {
           return orders;
     };

   var getSpecificPrice =  async function (id) {

            return  await getPrice(id)
       };
   return {
         loadOrders: loadOrders,
         getCurrentOrders: getCurrentOrders,
         getSpecificPrice: getSpecificPrice
   };
 })();





 function getOrdersRequest(){

           axios.get( "http://localhost:8080/orders")
           .then(function (response) {
                frontEnd.setOrders(response.data);

           })
           .catch(function (error) {
             console.log('There is a problem with our servers. We apologize for the inconvince, please try again later', error.message);

           })
           .then( function () {
                paintTables();

           });

    }

     async function getPrice(p){
               await axios.get( "http://localhost:8080/orders/"+p)
                       .then(  function (response) {
                             frontEnd.setProduct(response.data)   ;
                       })
                       .catch(function (error) {
                         console.log('There is a problem with our servers. We apologize for the inconvince, please try again later', error.message);;
                       })
                       .then(function () {
                         // always executed
                       });
        }







