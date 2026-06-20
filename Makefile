COMPOSE := docker compose
APP := app

.PHONY: help build up down logs shell pnpm lint build-app db psql clean install-security-hooks security-scan

help:
	@echo "Rucher360 development commands"
	@echo "  make build      Build the app development image"
	@echo "  make up         Start Docker Compose"
	@echo "  make down       Stop Docker Compose"
	@echo "  make logs       Follow app logs"
	@echo "  make shell      Open a shell in the app container"
	@echo "  make pnpm CMD='...'  Run pnpm through Docker Compose"
	@echo "  make lint       Run pnpm lint through Docker Compose"
	@echo "  make build-app  Run pnpm build through Docker Compose"
	@echo "  make db         Start PostgreSQL only"
	@echo "  make psql       Open psql in the db container"
	@echo "  make clean      Remove containers and volumes"
	@echo "  make install-security-hooks  Enable local pre-push confidentiality checks"
	@echo "  make security-scan           Run the pre-push confidentiality check"

build:
	$(COMPOSE) build $(APP)

up:
	$(COMPOSE) up --build

down:
	$(COMPOSE) down

logs:
	$(COMPOSE) logs -f $(APP)

shell:
	$(COMPOSE) run --rm $(APP) sh

pnpm:
	@if [ -z "$(CMD)" ]; then echo "Usage: make pnpm CMD='install'"; exit 1; fi
	$(COMPOSE) run --rm $(APP) pnpm $(CMD)

lint:
	$(COMPOSE) run --rm $(APP) pnpm lint

build-app:
	$(COMPOSE) run --rm $(APP) pnpm build

db:
	$(COMPOSE) up -d db

psql:
	$(COMPOSE) exec db psql -U rucher360 -d rucher360

clean:
	$(COMPOSE) down --volumes --remove-orphans

install-security-hooks:
	chmod +x .githooks/pre-push
	git config core.hooksPath .githooks
	.githooks/pre-push

security-scan:
	.githooks/pre-push
