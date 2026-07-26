COMPOSE := docker compose
APP := app
RUNNER_COMPOSE := docker compose -f docker-compose.runner.yml
GITLEAKS_VERSION := v8.30.1
GITLEAKS_GO_CRYPTO_VERSION := v0.52.0
GITLEAKS_IMAGE := rucher360-gitleaks:$(GITLEAKS_VERSION)-alpine3.23

.PHONY: help build up down logs shell pnpm lint build-app audit-prod seed-dev db psql clean install-security-hooks security-scan gitleaks-image secrets-scan runner-config runner-build runner-up runner-down runner-logs

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
	@echo "  make audit-prod Run pnpm audit --prod through Docker Compose"
	@echo "  make seed-dev   Seed local development data through Docker Compose"
	@echo "  make db         Start PostgreSQL only"
	@echo "  make psql       Open psql in the db container"
	@echo "  make clean      Remove containers and volumes"
	@echo "  make install-security-hooks  Enable local pre-push confidentiality checks"
	@echo "  make security-scan           Run the pre-push confidentiality check"
	@echo "  make gitleaks-image          Build the local Alpine 3.23 Gitleaks image"
	@echo "  make secrets-scan            Run Gitleaks secret scan through Docker"
	@echo "  make runner-config           Validate local GitHub runner Compose config"
	@echo "  make runner-build            Build the local GitHub runner image"
	@echo "  make runner-up               Start the local GitHub runner from runner.env"
	@echo "  make runner-down             Stop the local GitHub runner"
	@echo "  make runner-logs             Follow local GitHub runner logs"

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

audit-prod:
	$(COMPOSE) run --rm $(APP) pnpm audit --prod

seed-dev:
	$(COMPOSE) run --rm $(APP) pnpm seed:dev

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

gitleaks-image:
	docker build --pull --build-arg GITLEAKS_VERSION=$(GITLEAKS_VERSION) --build-arg GO_CRYPTO_VERSION=$(GITLEAKS_GO_CRYPTO_VERSION) -f Dockerfile.gitleaks -t $(GITLEAKS_IMAGE) .

secrets-scan: gitleaks-image
	docker run --rm -v "$(CURDIR):/repo" $(GITLEAKS_IMAGE) dir /repo --config=/repo/.gitleaks.toml --redact --verbose

runner-config:
	$(RUNNER_COMPOSE) config

runner-build:
	$(RUNNER_COMPOSE) build github-runner

runner-up:
	@if [ ! -f runner.env ]; then echo "Créer runner.env depuis docs/devsecops-runner.md avant de démarrer le runner."; exit 1; fi
	$(RUNNER_COMPOSE) --env-file runner.env up -d --build github-runner

runner-down:
	$(RUNNER_COMPOSE) down

runner-logs:
	$(RUNNER_COMPOSE) logs -f github-runner
