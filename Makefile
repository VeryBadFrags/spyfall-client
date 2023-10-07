# Makefile for Node.js project

# Define your default target (the one that runs when you just type "make" without arguments)
default: dev

# Define targets and their respective commands
dev: node_modules
	pnpm run dev

build: node_modules
	pnpm run build

node_modules: pnpm-lock.yaml
	pnpm i

# Define a clean target to remove build artifacts or other generated files
clean:
	pnpm run clean

# Define a help target to display a list of available targets
help:
	@echo "Available targets:"
	@echo "  make build   - Run 'pnpm run build'"
	@echo "  make dev     - Run 'pnpm run dev'"
	@echo "  make clean   - Clean up project (if needed)"
	@echo "  make help    - Display this help message"

# Ensure that 'make' knows these targets are not associated with files
.PHONY: build dev clean help
