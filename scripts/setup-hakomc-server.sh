#!/usr/bin/env bash
# Bootstraps a new project from hakomc-server
# (https://github.com/hakomc/hakomc-server).
#
# Usage (curl):
#   curl -fsSL https://raw.githubusercontent.com/hakomc/hakomc/main/scripts/setup-hakomc-server.sh | bash -s -- --name my-plugin
#
# Usage (wget):
#   wget -qO- https://raw.githubusercontent.com/hakomc/hakomc/main/scripts/setup-hakomc-server.sh | bash -s -- --name my-plugin
#
# Any option left unset is prompted for interactively.
# Also works when downloaded and run directly: `bash setup-hakomc-server.sh`.

set -euo pipefail

REPO_URL="https://github.com/hakomc/hakomc-server.git"
BRANCH="main"

NAME=""
DESCRIPTION=""
UUID=""
DIR=""
OPS=""
SERVER_PORT="19132"
ASSUME_YES=0
FORCE=0

# When run as `curl ... | bash`, the script's own stdin is the pipe, so
# `read` would consume from it (and hit EOF) instead of the user's terminal.
# Always read interactive input from /dev/tty instead.
TTY="/dev/tty"
HAS_TTY=0
if [ -t 0 ] || { [ -c "$TTY" ] && exec 3<"$TTY"; } 2>/dev/null; then
  HAS_TTY=1
fi

print_usage() {
  cat <<'EOF'
Usage: setup-hakomc-server.sh [options]

Options:
  -n, --name <name>          Package name (set in package.json and vite.config.app.js)
  -d, --description <text>   package.json description
  -u, --uuid <uuid>          Behavior pack UUID (auto-generated if omitted)
  -o, --dir <path>           Target directory (derived from the name if omitted)
  -b, --branch <branch>      Branch/tag of hakomc-server to clone (default: main)
      --ops <xuids>          Comma-separated XUIDs to grant operator on the dev server (.env OPS)
      --port <port>          UDP port the dev server listens on (.env SERVER_PORT, default: 19132)
  -y, --yes                  Fill in any unset option with its default, skipping prompts
      --force                Proceed even if the target directory is not empty
  -h, --help                 Show this help

Example:
  curl -fsSL https://raw.githubusercontent.com/hakomc/hakomc/main/scripts/setup-hakomc-server.sh \
    | bash -s -- --name my-plugin --description "My first hakomc plugin"
EOF
}

log()  { printf '==> %s\n' "$1"; }
warn() { printf '\033[33m!! %s\033[0m\n' "$1" >&2; }
die()  { printf '\033[31m✗ %s\033[0m\n' "$1" >&2; exit 1; }

prompt() {
  # prompt <var_name> <question> <default>
  local __var="$1" __question="$2" __default="$3" __answer
  if [ "$ASSUME_YES" -eq 1 ]; then
    printf -v "$__var" '%s' "$__default"
    return
  fi
  if [ "$HAS_TTY" -ne 1 ]; then
    if [ -n "$__default" ]; then
      printf -v "$__var" '%s' "$__default"
      return
    fi
    die "No interactive terminal available (e.g. running via a pipe). Pass --$__var explicitly instead."
  fi
  if [ -n "$__default" ]; then
    printf '%s [%s]: ' "$__question" "$__default" > "$TTY"
  else
    printf '%s: ' "$__question" > "$TTY"
  fi
  IFS= read -r __answer < "$TTY" || __answer=""
  if [ -z "$__answer" ]; then
    __answer="$__default"
  fi
  printf -v "$__var" '%s' "$__answer"
}

generate_uuid() {
  if command -v uuidgen >/dev/null 2>&1; then
    uuidgen | tr '[:upper:]' '[:lower:]'
    return
  fi
  if command -v python3 >/dev/null 2>&1; then
    python3 -c 'import uuid; print(uuid.uuid4())'
    return
  fi
  if command -v node >/dev/null 2>&1; then
    node -e 'console.log(crypto.randomUUID())'
    return
  fi
  # Fallback: assemble a UUID v4 from /dev/urandom in pure shell.
  local hex
  hex=$(od -An -N16 -tx1 /dev/urandom | tr -d ' \n')
  local variant
  variant=$(printf '%x' $(( (0x${hex:16:1} & 0x3) | 0x8 )))
  printf '%s-%s-4%s-%s%s-%s\n' \
    "${hex:0:8}" "${hex:8:4}" "${hex:13:3}" "$variant" "${hex:17:3}" "${hex:20:12}"
}

slugify() {
  printf '%s' "$1" | tr '[:upper:]' '[:lower:]' | tr -c 'a-z0-9-' '-' | sed -E 's/-+/-/g; s/^-//; s/-$//'
}

# --- Parse arguments ---
while [ $# -gt 0 ]; do
  case "$1" in
    -n|--name) NAME="$2"; shift 2 ;;
    -d|--description) DESCRIPTION="$2"; shift 2 ;;
    -u|--uuid) UUID="$2"; shift 2 ;;
    -o|--dir) DIR="$2"; shift 2 ;;
    -b|--branch) BRANCH="$2"; shift 2 ;;
    --ops) OPS="$2"; shift 2 ;;
    --port) SERVER_PORT="$2"; shift 2 ;;
    -y|--yes) ASSUME_YES=1; shift ;;
    --force) FORCE=1; shift ;;
    -h|--help) print_usage; exit 0 ;;
    *) die "Unknown option: $1 (see --help)" ;;
  esac
done

command -v git >/dev/null 2>&1 || die "git was not found. Please install git first."

# --- Resolve inputs ---
while [ -z "$NAME" ]; do
  prompt NAME "Project (package) name" ""
  if [ -z "$NAME" ]; then
    warn "A project name is required."
  fi
done

if ! printf '%s' "$NAME" | grep -Eq '^(@[a-z0-9][a-z0-9._-]*/)?[a-z0-9][a-z0-9._-]*$'; then
  warn "\"$NAME\" contains characters that are unusual for an npm package name (lowercase/digits/-/_/. recommended). Continuing anyway."
fi

prompt DESCRIPTION "Package description" "$DESCRIPTION"

DEFAULT_DIR=$(slugify "$NAME")
[ -n "$DEFAULT_DIR" ] || DEFAULT_DIR="hakomc-server"
prompt DIR "Target directory" "${DIR:-$DEFAULT_DIR}"

if [ -e "$DIR" ]; then
  if [ "$FORCE" -eq 1 ]; then
    warn "Directory \"$DIR\" already exists; proceeding anyway (--force)."
  elif [ -n "$(ls -A "$DIR" 2>/dev/null || true)" ]; then
    die "Directory \"$DIR\" already exists and is not empty. Pass a different --dir or use --force."
  fi
fi

if [ -n "$UUID" ]; then
  printf '%s' "$UUID" | grep -Eqi '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' \
    || die "The given UUID is not valid: $UUID"
  UUID=$(printf '%s' "$UUID" | tr '[:upper:]' '[:lower:]')
else
  UUID=$(generate_uuid)
fi

prompt OPS "Operator XUIDs for the dev server (comma-separated, optional)" "$OPS"
prompt SERVER_PORT "Dev server UDP port" "$SERVER_PORT"

HOST_UID=$(id -u)
HOST_GID=$(id -g)

log "Setting up hakomc-server with the following configuration"
printf '  name        : %s\n' "$NAME"
printf '  description : %s\n' "${DESCRIPTION:-(none)}"
printf '  directory   : %s\n' "$DIR"
printf '  uuid        : %s\n' "$UUID"
printf '  branch      : %s\n' "$BRANCH"
printf '  ops         : %s\n' "${OPS:-(none)}"
printf '  server port : %s\n' "$SERVER_PORT"

# --- Fetch the template ---
log "Cloning hakomc-server ($REPO_URL#$BRANCH)"
git clone --depth 1 --branch "$BRANCH" "$REPO_URL" "$DIR"

cd "$DIR"

# --- Replace placeholders ---
log "Updating package.json, vite.config.app.js and worlds/DevWorld"

ESCAPED_NAME=$(printf '%s' "$NAME" | sed -e 's/[&/\]/\\&/g')
ESCAPED_DESCRIPTION=$(printf '%s' "$DESCRIPTION" | sed -e 's/[&/\]/\\&/g')

sed -i \
  -e "s/\"name\": \"[^\"]*\"/\"name\": \"${ESCAPED_NAME}\"/" \
  -e "s/\"description\": \"[^\"]*\"/\"description\": \"${ESCAPED_DESCRIPTION}\"/" \
  package.json

sed -i \
  -e "s/name: \"[^\"]*\"/name: \"${ESCAPED_NAME}\"/" \
  -e "s/uuid: \"[^\"]*\"/uuid: \"${UUID}\"/" \
  vite.config.app.js

sed -i \
  -e "s/\"pack_id\": \"[^\"]*\"/\"pack_id\": \"${UUID}\"/" \
  worlds/DevWorld/world_behavior_packs.json

# --- Create .env from .env.example ---
log "Creating .env"
ESCAPED_OPS=$(printf '%s' "$OPS" | sed -e 's/[&/\]/\\&/g')
cp .env.example .env
sed -i \
  -e "s/^OPS=.*/OPS=${ESCAPED_OPS}/" \
  -e "s/^SERVER_PORT=.*/SERVER_PORT=${SERVER_PORT}/" \
  -e "s/^UID=.*/UID=${HOST_UID}/" \
  -e "s/^GID=.*/GID=${HOST_GID}/" \
  .env

# --- Detach from the template's history ---
log "Removing .git/ to detach from the template's history"
rm -rf .git

log "Setup complete: $DIR"
cat <<EOF

Next steps:
  cd "$DIR"
  npm install
  docker compose up

See $DIR/README.md for details.
EOF
