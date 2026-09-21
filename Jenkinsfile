pipeline {

    agent any

    environment {
        PORT = credentials('ddp-port')
        APP_NAME = credentials('ddp-app-name')
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Create Environment File') {
            steps {
                sh '''
                    echo "PORT=${PORT}" > .env
                    echo "APP_NAME=${APP_NAME}" >> .env

                    echo ".env file created"
                '''
            }
        }

        stage('Docker Check') {
            steps {
                sh 'docker --version'
                sh 'docker-compose --version'
            }
        }

        stage('Build') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker-compose down --remove-orphans
                    docker-compose up -d
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                    echo "Checking backend health..."

                    for i in {1..12}
                    do
                        if curl -f http://localhost:4000/health
                        then
                            echo "Backend is healthy"
                            exit 0
                        fi

                        echo "Waiting for backend..."
                        sleep 5
                    done

                    echo "Health check failed"
                    exit 1
                '''
            }
        }

        stage('Status') {
            steps {
                sh 'docker-compose ps'
            }
        }
    }

    post {
        always {
            sh 'rm -f .env'
        }

        success {
            echo 'Deployment completed successfully!'
        }

        failure {
            echo 'Deployment failed!'
        }
    }
}
