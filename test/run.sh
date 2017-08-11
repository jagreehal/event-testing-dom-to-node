docker-compose kill
docker-compose build

docker-compose run nightmare-tests npm test; TEST_EXIT_CODE=$?
echo "exit code= $TEST_EXIT_CODE"

exit $TEST_EXIT_CODE