package edu.eci.arsw.myrestaurant.test;

import edu.eci.arsw.myrestaurant.beans.BillCalculator;
import edu.eci.arsw.myrestaurant.model.Order;
import edu.eci.arsw.myrestaurant.services.OrderServicesException;
import edu.eci.arsw.myrestaurant.services.RestaurantOrderServicesStub;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Java6Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest()
public class ApplicationServicesTests {

    @Autowired
    RestaurantOrderServicesStub ros;

    
    @Test
    public void contextLoads() throws OrderServicesException{
        
    }

    @Test
    public void pruebaCalcularCuentaCuandoNoHayElementos() throws OrderServicesException{
        ros.addNewOrderToTable(new Order(5));
        assertThat(ros.calculateTableBill(5)).isEqualTo(0);

    }

    @Test
    public void pruebaCalcularCuenta1() throws OrderServicesException{
        assertThat(ros.calculateTableBill(1)).isEqualTo(45302);

    }
    @Test
    public void pruebaCalcularCuenta3() throws OrderServicesException{
        assertThat(ros.calculateTableBill(3)).isEqualTo(32290);

    }

}
