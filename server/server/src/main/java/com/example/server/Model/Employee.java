package com.example.server.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "position_id")
    private Position position;

    private String name;

    @OneToOne
    @JoinColumn(name = "address_id")
    private Address homeAddress;

    @ManyToOne
    @JoinColumn(name = "address_company")
    private Address companyAddress;

    private String phoneNumber;

    public Employee(){

    }

    public Employee(Employee employee){
        this.id = employee.getId();
        this.position = employee.position;
        this.name = employee.getName();
        this.homeAddress = employee.getHomeAddress();
        this.companyAddress = employee.getCompanyAddress();
        this.phoneNumber = employee.phoneNumber;
    }

}


