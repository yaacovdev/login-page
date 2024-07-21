#!/bin/bash

# Add your code here to start your application

echo "initialize application is starting..."

# Initialize the database
echo "initialize database is starting..."
# Create a MongoDB Docker container
docker run -d -p 27017:27017 --name mongodb -v /path/to/data:/data/db mongo

# Wait for the MongoDB container to start
sleep 5

# Initialize the database
# echo "Initializing the database..."
# Add your database initialization code here


# Initialize the server
echo "Initializing the server..."
# Add your server initialization code here
# Create a virtual environment
echo "Creating virtual environment..."
python3 -m venv backend/login_server/venv

# Activate the virtual environment
echo "Activating virtual environment..."
source backend/login_server/venv/bin/activate

# Install requirements
echo "Installing requirements..."
pip install -r backend/login_server/requirements.txt