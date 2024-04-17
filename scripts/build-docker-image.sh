cd ..
DOCKER_BUILDKIT=1 docker build -t shukunai/platform:latest --platform=linux/amd64 --no-cache -f Dockerfile .