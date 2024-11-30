package com.example.ucord_gateway_service.config;

import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import reactor.core.publisher.Mono;

@Configuration
public class GatewayConfig {

    @Bean
    public RouteLocator routeLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("ucord-auth", r -> r.path("/api/v1/auth/**").uri("lb://ucord-auth"))
                .route("ucord-account", r -> r.path("/api/v1/personal-account/**").uri("lb://ucord-account"))
                .build();
    }

    @Bean
    public GlobalFilter loggingFilter() {
        return (exchange, chain) -> {
            System.out.println("Request URI: " + exchange.getRequest().getURI());
            System.out.println("Request Method: " + exchange.getRequest().getMethod());

            exchange.getRequest().getHeaders().forEach((name, values) -> {
                System.out.println("Header: " + name + " Values: " + values);
            });

            return chain.filter(exchange).then(Mono.fromRunnable(() -> {
                System.out.println("Response Status Code: " + exchange.getResponse().getStatusCode());
            }));
        };
    }
}

