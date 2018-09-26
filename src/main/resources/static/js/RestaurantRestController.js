 var network = (function () {

   var loadOrders =function () {
               getOrdersRequest();
   };



   var getSpecificProduct =   function (order,id,table) {

            return   getProduct(order,id,table)
       };
   return {
         loadOrders: loadOrders,

         getSpecificProduct: getSpecificProduct
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

     function getProduct(order,id,table){
                var product
                axios.get( "http://localhost:8080/orders/"+id)
                       .then(  async function (response) {
                             product= response.data   ;
                       })
                       .catch(function (error) {
                         console.log('There is a problem with our servers. We apologize for the inconvince, please try again later', error.message);;
                       })
                       .then(function () {
                         createRow(id,order,table,product);
                       });
        }







