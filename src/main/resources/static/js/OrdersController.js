

var frontEnd = (function () {
var orders;
var product;

    var getCurrentOrders = function () {
           return orders;
     };

    var getOrders = function () {
               network.loadOrders();
         };
    var setProduct1 = function (p) {
                   product=p;
             };
    var getProduct = function () {
                  return product;
             };

   var setOrders = function (ord) {
              orders=ord;
        };

   var getProduct = async function (id) {

                 return await network.getSpecificPrice(id);
           };
   return {
         getProduct1: getProduct1,
         setProduct: setProduct,
         getOrders: getOrders,
         setOrders: setOrders,
         getCurrentOrders: getCurrentOrders,
         getProduct:getProduct
   };
})();





function showOrdersByTable(){
    frontEnd.getOrders();
    }





  async function paintTables(){
      var ordersList=frontEnd.getCurrentOrders();
      for(var order=0;order<ordersList.length;order++){

                  var orderArrayHeader = ["Product","Quantity","Price"];
                  var body = document.getElementById("orders");
                         tbl  = document.createElement("table");
                     tbl.setAttribute("class","table table-striped");
                     tbl.setAttribute("id", order);


                     for(var i=0;i<Object.keys(ordersList[order].orderAmountsMap).length;i++){
                            var clave=Object.keys(ordersList[order].orderAmountsMap)[i];
                             console.log(frontEnd.getProduct(clave));
                            await frontEnd.getProduct1(clave);
                            var product=await frontEnd.getProduct1();


                         var tr = tbl.insertRow();
                                 var td = tr.insertCell();
                                 td.appendChild(document.createTextNode(clave));
                                 td = tr.insertCell();
                                 td.appendChild(document.createTextNode(ordersList[order].orderAmountsMap[clave]));
                                 td = tr.insertCell();
                                 td.appendChild(document.createTextNode(product.price));
                     }
                     body.appendChild(tbl);
                     tbl=document.getElementById(order);
                     var header = tbl.createTHead();
                     var row = header.insertRow(0);
                     for(var i = 0; i <orderArrayHeader.length ; i++){
                        var cell = row.insertCell(i);
                        cell.outerHTML ="<th scope='col'>"+ orderArrayHeader[i]+"<th>";}

                     row.deleteCell(3);
                     row.deleteCell(2);
                     txt = document.createTextNode('\x0A');
                     tbl.appendChild(txt);

                 }


}