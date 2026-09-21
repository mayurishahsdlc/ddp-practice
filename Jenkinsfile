pipeline {
    agent any

    environment {
        PORT = '4000'
        APP_NAME = 'Docker Deployment App'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
            }
        }

        stage('Create Environment File') {
            steps {
                sh '''
                    cat > .env <<EOF
PORT=${PORT}
APP_NAME=${APP_NAME}
EOF
                '''
            }
        }

        stage('Docker Check') {
            steps {
                sh '''
                    docker --version
                    docker-compose --version
                '''
            }
        }

        stage('Build') {
            steps {
                sh '''
                    docker-compose build
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker-compose down || true
                    docker-compose up -d
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                    echo "Waiting for backend..."

                    for i in {1..12}
                    do
                        if curl -f http://localhost:4000/health
                        then
                            echo "Backend is healthy!"
                            exit 0
                        fi

                        echo "Health check attempt $i failed..."
                        sleep 5
                    done

                    echo "Backend health check failed"
                    docker-compose ps
                    docker-compose logs --tail=50 backend
                    exit 1
                '''
            }
        }

        stage('Status') {
            steps {
                sh '''
                    docker-compose ps
                    docker ps
                '''
            }
        }
    }

    post {
        always {
            sh '''
                rm -f .env
            '''
        }
    }
}
