package com.example.server.controller;

import com.example.server.model.Position;
import com.example.server.service.PositionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/positions")
@CrossOrigin(origins = "http://localhost:4200/")
public class PositionController {

    @Autowired
    PositionService positionService;

    @GetMapping("")
    public ResponseEntity<List<Position>> getAll(){
        return positionService.getAll();
    }

}
