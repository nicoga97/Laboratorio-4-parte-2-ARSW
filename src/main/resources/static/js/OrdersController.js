

var frontEnd = (function () {
var orders;
var product;
var slectedTable;

    var getCurrentOrders = function () {
           return orders;
     };

    var getOrders = function (callback) {
               network.loadOrders(callback);
         };
    var setProduct = function (p) {
                   product=p;
             };
    var getSlectedTable = function () {
                   return slectedTable;
             };
    var setSlectedTable = function (table) {
               for(var i=0;i<orders.length;i++){
                  if(orders[i].tableNumber==table){
                    slectedTable=orders[i];
                    console.log(slectedTable);
                    break;
                  }
               }

             };
    var getProduct = function () {
                  return product;
             };

   var setOrders = function (ord) {
              orders=ord;
        };

   var loadProduct =  function (order,id,table) {

           network.getSpecificProduct(order,id,table);
           };
   return {
         setSlectedTable:setSlectedTable,
         getSlectedTable:getSlectedTable,
         getProduct: getProduct,
         setProduct: setProduct,
         getOrders: getOrders,
         setOrders: setOrders,
         getCurrentOrders: getCurrentOrders,
         loadProduct: loadProduct
   };
})();


function showOrdersByTable(){
    frontEnd.getOrders(paintTables);
    }





   function paintTables(){
      var ordersList=frontEnd.getCurrentOrders();
      for(var order=0;order<ordersList.length;order++){

                   var orderArrayHeader = ["Product","Quantity","Price"];
                   var body = document.getElementById("orders");
                   var titulo=order+1;
                   var tituloTabla =document.createElement("h5");

                   tituloTabla.appendChild(document.createTextNode("Table "+titulo));
                   body.appendChild(tituloTabla);
                   var tbl  = document.createElement("table");
                     tbl.setAttribute("class","table table-striped");
                     tbl.setAttribute("id", order);


                     for(var i=0;i<Object.keys(ordersList[order].orderAmountsMap).length;i++){
                            var clave=Object.keys(ordersList[order].orderAmountsMap)[i];
                             frontEnd.loadProduct(order,clave,tbl);




                     }
                     body.appendChild(tbl);
                     tbl=document.getElementById(order);
                     var header = tbl.createTHead();
                     var row = header.insertRow(0);
                     for(var i = 0; i <orderArrayHeader.length ; i++){
                        var cell = row.insertCell(i);
                        cell.outerHTML ="<th scope='col'>"+ orderArrayHeader[i]+"<th>";}

                     row.deleteCell(5);
                     row.deleteCell(4);
                     row.deleteCell(3);
                     txt = document.createTextNode('\x0A');
                     tbl.appendChild(txt);

                 }


   }

   function createRow(id,order,table,product){
         var ordersList=frontEnd.getCurrentOrders();
         var tr = table.insertRow();
         var td = tr.insertCell();
         td.appendChild(document.createTextNode(product.name));
         td = tr.insertCell();
         td.appendChild(document.createTextNode(ordersList[order].orderAmountsMap[id]));
         td = tr.insertCell();
         td.appendChild(document.createTextNode(ordersList[order].orderAmountsMap[id]*product.price));
   }

   function loadUpdateOrdersPage(){

        frontEnd.getOrders(loadDropdownButton);



   }
   function loadDropdownButton(){
         var ordersList=frontEnd.getCurrentOrders();
         var dropdown = document.getElementById("dpwSelectTable");
         for(var order=0;order<ordersList.length;order++){
             if(order==0){
               changeSelectedTable(ordersList[order].tableNumber);
                }
            var dropdownButton =document.createElement("button");
            dropdownButton.setAttribute("class","dropdown-item");
            dropdownButton.setAttribute("type", "button");
            dropdownButton.setAttribute("onclick", "changeSelectedTable("+ordersList[order].tableNumber+")");
            dropdownButton.setAttribute("id", "Table "+ordersList[order].tableNumber);
            dropdownButton.appendChild(document.createTextNode("Table "+ordersList[order].tableNumber));
            dropdown.appendChild(dropdownButton);
         }

   }

   function changeSelectedTable(table){
        document.getElementById("dropdownbtn").innerHTML="Table "+table;
        frontEnd.setSlectedTable(table);

   }

    document.addEventListener("DOMContentLoaded", function(event) {
         $(function(){

                 $('#addOrderBtn').on('click', function (e) {

                     alert('Hello!');

                 });


                     });
        });

