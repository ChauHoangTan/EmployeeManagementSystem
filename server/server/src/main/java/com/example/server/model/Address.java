package com.example.server.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String street;

    private String ward;

    private String district;

    private String city;

    private String getAddress(){
        return street + ", " + ward + ", " + district + ", " + city;
    }
}
