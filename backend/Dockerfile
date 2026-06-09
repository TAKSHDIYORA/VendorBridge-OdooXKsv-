# Stage 1: Build the application using OpenJDK 25
FROM openjdk:25-jdk-slim AS build
WORKDIR /app

# Copy Maven wrapper files and pom.xml first to leverage caching
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Grant execute permission for the wrapper and download dependencies
RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline -B

# Copy source code and build the final JAR file
COPY src src
RUN ./mvnw clean package -DskipTests

# Stage 2: Run the application using the same runtime environment
FROM openjdk:25-jdk-slim
WORKDIR /app

# Copy the built jar from Stage 1
COPY --from=build /app/target/*.jar app.jar

# Make sure Spring Boot respects the dynamic cloud port variable
EXPOSE 8080
ENV PORT=8080

ENTRYPOINT ["java", "-jar", "app.jar"]