FROM openjdk:17-oracle

WORKDIR /app

COPY build/libs/ucord_auth_service-0.0.1-SNAPSHOT.jar auth-service.jar

CMD ["java", "-jar", "auth-service.jar"]