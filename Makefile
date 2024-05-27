# Makefile for Node.js project

.DEFAULT_GOAL := help

.PHONY: help
help:
	@echo "Available targets:"
	@echo "  dev     - Run dev"
	@echo "  build   - Run build"
	@echo "  format  - Format code using Prettier"
	@echo "  lint    - Run eslint"
	@echo "  clean   - Clean up project"
	@echo "  help    - Display this help message"

.PHONY: build
build: node_modules
	pnpm run build

.PHONY: dev
dev: node_modules
	pnpm run dev -- --open

.PHONY: format
format:
	pnpm run format

.PHONY: lint
lint:
	pnpm run lint

.PHONY: clean
clean:
	pnpm run clean

# Install dependencies if 'node_modules' is missing
node_modules: pnpm-lock.yaml package.json
	pnpm install
	touch node_modules/
