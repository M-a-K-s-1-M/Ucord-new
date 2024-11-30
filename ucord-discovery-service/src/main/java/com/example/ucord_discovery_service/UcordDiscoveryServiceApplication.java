package com.example.ucord_discovery_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@EnableEurekaServer
@SpringBootApplication
public class UcordDiscoveryServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(UcordDiscoveryServiceApplication.class, args);
	}

}
