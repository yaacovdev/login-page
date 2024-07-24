# Variables
VENV = backend/login_server/venv
MONGO_CONTAINER = mongodb
MONGO_PORT = 27017
MONGO_VOLUME = /path/to/data
FRONTEND_DIR = frontend/web-registration
MOBILE_DIR = frontend/MobileRegistration

# Targets
.PHONY: all init_db init_server start_db init_server start_server start_openia start_web start_mobile

all: init_db init_server start_db start_server start_openia start_web start_mobile

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

start_db:
	@echo "Starting MongoDB container..."
	@docker start $(MONGO_CONTAINER)

init_server: $(VENV)
	@echo "Initializing the server..."
	@python -m venv $(VENV)
	@echo "Creating virtual environment..."
	@bash -c "source $(VENV)/bin/activate && \
	echo 'Installing requirements...' && \
	pip install -r backend/login_server/requirements.txt"

start_server:
	@echo "Starting server..."
	@nohup bash -c "source $(VENV)/bin/activate && python backend/login_server/run.py" > server.log 2>&1 & tail -f server.log &

start_openia:
	@echo "Starting OpenIA API..."
	@nohup bash -c "cd backend/openia_api && npm run dev" > openia.log 2>&1 & tail -f openia.log &

start_web:
	@echo "Starting Web UI..."
	@nohup bash -c "cd $(FRONTEND_DIR) && npm install && npm start" > web.log 2>&1 & tail -f web.log &

start_mobile:
	@echo "Starting mobile app..."
	@nohup bash -c "cd $(MOBILE_DIR) && npm run start-android  && npx react-native start" > mobile.log 2>&1 & tail -f mobile.log &

$(VENV):
	@python3 -m venv $(VENV)
