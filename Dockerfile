# ---------- Frontend build ----------
FROM node:18 AS frontend-build
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend .
RUN npm run build

# ---------- Backend build ----------
FROM maven:3.9-eclipse-temurin-17 AS backend-build
WORKDIR /backend
COPY backend/pom.xml .
RUN mvn dependency:go-offline
COPY backend .
RUN mvn clean package -DskipTests

# ---------- Runtime ----------
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copy backend jar
COPY --from=backend-build /backend/target/*.jar app.jar

# Copy React build into Spring Boot static folder
COPY --from=frontend-build /frontend/build /app/static

EXPOSE 8080
CMD ["java","-jar","app.jar"]
