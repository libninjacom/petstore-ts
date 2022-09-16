export PATH := "./node_modules/.bin:" + env_var('PATH')

bootstrap:
    pnpm install

lint:
    prettier --write .

run SCRIPT:
    node -r esbuild-register --no-warnings "{{SCRIPT}}"

test-full: bootstrap
    #!/usr/bin/env bash -euxo pipefail
    for file in $(ls examples); do
        just run "examples/$file"
    done