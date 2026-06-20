#!/bin/sh
set -eu

if [ -z "${RUNNER_REGISTRATION:-}" ]; then
  echo "RUNNER_REGISTRATION est vide. Crée runner.env avec le jeton d'enregistrement GitHub temporaire." >&2
  exit 1
fi

if [ -z "${RUNNER_REPOSITORY_URL:-}" ]; then
  echo "RUNNER_REPOSITORY_URL est obligatoire." >&2
  exit 1
fi

runner_name="${RUNNER_NAME:-rucher360-local-docker}"
runner_labels="${RUNNER_LABELS:-rucher360,local,docker,devsecops}"
runner_workdir="${RUNNER_WORKDIR:-_work}"

cleanup() {
  if [ -f .runner ]; then
    ./config.sh remove --unattended --token "$RUNNER_REGISTRATION" || true
  fi
}

trap cleanup INT TERM

if [ ! -f .runner ]; then
  ./config.sh \
    --unattended \
    --url "$RUNNER_REPOSITORY_URL" \
    --token "$RUNNER_REGISTRATION" \
    --name "$runner_name" \
    --labels "$runner_labels" \
    --work "$runner_workdir" \
    --replace
fi

./run.sh
