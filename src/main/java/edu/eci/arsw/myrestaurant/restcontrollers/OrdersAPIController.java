/*
 * Copyright (C) 2016 Pivotal Software, Inc.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package edu.eci.arsw.myrestaurant.restcontrollers;

import edu.eci.arsw.myrestaurant.model.Order;
import edu.eci.arsw.myrestaurant.model.ProductType;
import edu.eci.arsw.myrestaurant.model.RestaurantProduct;
import edu.eci.arsw.myrestaurant.services.OrderServicesException;
import edu.eci.arsw.myrestaurant.services.RestaurantOrderServicesStub;

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * @author hcadavid
 */
@RestController

public class OrdersAPIController {

    @Autowired
    private RestaurantOrderServicesStub service;

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/orders",method = RequestMethod.GET)
    public ResponseEntity<?> manejadorGetRecursoOrders() {
        try {

            ArrayList<Order> orders = new ArrayList<>();
            for (int i : service.getTablesWithOrders()) {
                orders.add(service.getTableOrder(i));
            }
            return new ResponseEntity<>(orders, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            Logger.getLogger(OrdersAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("Error bla bla bla", HttpStatus.NOT_FOUND);
        }
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/orders/{product}",method = RequestMethod.GET)
    public ResponseEntity<?> manejadorGetProducto(@PathVariable("product") String product) {
        try {

            return new ResponseEntity<>(service.getProductByName(product), HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            Logger.getLogger(OrdersAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("Error al obtener producto", HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/orders/{table}")
    @ResponseBody
    public ResponseEntity<?> manejadorGetRecursosOrdersMesa(@PathVariable("table") int table) {
        try {

            Order order=service.getTableOrder(table);
            if(order==null){
                throw new OrderServicesException("Mesa no existe");
            }
            return new ResponseEntity<>(order, HttpStatus.ACCEPTED);
        } catch (OrderServicesException ex) {
            Logger.getLogger(OrdersAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
        }

    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> manejadorPostRecursoAddTable(@RequestBody Order o){
        try {
            service.addNewOrderToTable(o);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (OrderServicesException  ex) {
            Logger.getLogger(OrdersAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("ORDEN NO AGAREGADA",HttpStatus.FORBIDDEN);
        }

    }

    @RequestMapping(value = "/orders/{table}/total")
    @ResponseBody
    public ResponseEntity<?> manejadorGetRecursosTotalMesa(@PathVariable("table") int table) {
        try {

            int total=service.calculateTableBill(table);

            return new ResponseEntity<>(total, HttpStatus.ACCEPTED);
        } catch (OrderServicesException ex) {
            Logger.getLogger(OrdersAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
        }

    }

    @RequestMapping(method = RequestMethod.PUT, value = "/orders/{table}")
    public ResponseEntity<?> manejadorPRecursoAgregarConPut(@RequestBody RestaurantProduct o,@PathVariable("table") int table){
        try {
            service.getTableOrder(table).addDish(o.getName(),o.getPrice());
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception  ex) {
            Logger.getLogger(OrdersAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("PRODUCTO NO AGAREGADA",HttpStatus.FORBIDDEN);
        }

    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/orders/{idmesa}")
    public ResponseEntity<?> manejadorPRecursoAgregarConPut(@PathVariable("table") int table){
        try {
           service.releaseTable(table);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception  ex) {
            Logger.getLogger(OrdersAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("PRODUCTO NO AGAREGADA",HttpStatus.FORBIDDEN);
        }

    }



}
