
ensuredocker() {
    docker ps >/dev/null 2>&1 || open -a Docker >/dev/null 2>&1
    while ! docker ps >/dev/null 2>&1
    do
        sleep 1
    done
}

ensuredocker
docker kill redis; docker run -d --rm -p 6379:6379 --name redis redis
sleep 3

npx nodemon ./src/main.ts
