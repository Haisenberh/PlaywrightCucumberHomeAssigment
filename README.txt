The following instructions will walk you through the steps to set up and run the test application using Docker.

1. Verify Docker Installation
Ensure Docker is installed and running on your machine.
If Docker is not installed, download it from Docker's official website and follow the installation instructions.

2. Load the Docker Image
Navigate to the directory containing the Docker image file (apple-ind-test-assignment.tar)
and run the following command to load the image into Docker:
    docker load -i apple-ind-test-assignment.tar

3. Run the Docker Container
    docker run -p 3000:3000 -p 5173:5173 apple-ind-test-assignment

4. Verify Application Accessibility
Once the container is running, verify that the application is accessible:
    Frontend: http://localhost:5173
    Server API: http://localhost:3000/products

5. Examine the Server API
To explore the server API, open the Postman application. Navigate to My Workspace -> Import.
Select the provided Server API.postman_collection.json file to import the API specification.
