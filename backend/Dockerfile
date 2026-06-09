# Stage 1: Build the application using JDK 25
FROM eclipse-temurin:25-jdk AS build
WORKDIR /app

# Copy Maven wrapper files and pom.xml first
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Grant execute permission and fetch dependencies
RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline -B

# Copy source code and build the final JAR file
COPY src src
RUN ./mvnw clean package -DskipTests

# Stage 2: Run the application using the matching JRE/JDK environment
FROM eclipse-temurin:25-jre
WORKDIR /app

# Copy the built jar from Stage 1
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENV PORT=8080

ENTRYPOINT ["java", "-jar", "app.jar"]