# Makefile

# Variables
VENV = backend/login_server/venv
MONGO_CONTAINER = mongodb
MONGO_PORT = 27017
MONGO_VOLUME = /path/to/data
FRONTEND_DIR = frontend/web-registration
MOBILE_DIR = frontend/MobileRegistration

# Targets
.PHONY: all init_db init_server start_server start_openia start_web start_mobile

all: init_db init_server start_server start_openia start_web start_mobile

init_db:
	@echo "initialize database is starting..."
	@if [ $$(docker ps -q -f name=$(MONGO_CONTAINER)) ]; then \
		echo "MongoDB container is already running"; \
	elif [ $$(docker ps -aq -f status=exited -f name=$(MONGO_CONTAINER)) ]; then \
		echo "Starting existing MongoDB container..."; \
		docker start $(MONGO_CONTAINER); \
	else \
		docker run -d -p $(MONGO_PORT):$(MONGO_PORT) --name $(MONGO_CONTAINER) -v $(MONGO_VOLUME):/data/db mongo; \
		sleep 5; \
	fi
	# Add your database initialization code here

init_server: $(VENV)
	@echo "Initializing the server..."
	@python3 -m venv $(VENV)
	@echo "Creating virtual environment..."
	@bash -c "source $(VENV)/bin/activate && \
	echo 'Installing requirements...' && \
	pip install -r backend/login_server/requirements.txt"

start_server:
	@echo "Starting server..."
	@gnome-terminal -- bash -c "source $(VENV)/bin/activate && python backend/login_server/server.py; exec bash"

start_openia:
	@echo "Starting OpenIA API..."
	@gnome-terminal -- bash -c "cd backend/openia_api && npm run dev; exec bash"

start_web:
	@echo "Starting Web UI..."
	@gnome-terminal -- bash -c "cd $(FRONTEND_DIR) && npm install && npm start; exec bash"

start_mobile:
	@echo "Starting mobile app..."
	@gnome-terminal -- bash -c "cd $(MOBILE_DIR) && npx react-native start && npm run start-android; exec bash"

$(VENV):
	@python3 -m venv $(VENV)
