cd ..
DOCKER_BUILDKIT=1 docker build -t shukunai/platform:latest --target platform --platform=linux/amd64 --no-cache -f Dockerfile .
DOCKER_BUILDKIT=1 docker build -t shukunai/hub:latest --target hub --platform=linux/amd64 --no-cache -f Dockerfile .