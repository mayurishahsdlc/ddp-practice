pipeline {
    agent any

    stages {

        stage('Install Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm ci'
                }
            }
        }

        stage('Deploy with PM2') {
            steps {
                dir('backend') {
                    sh '''
                        sudo -u ubuntu pm2 delete ddp-backend || true
                        sudo -u ubuntu pm2 start ecosystem.config.json
                        sudo -u ubuntu pm2 save
                        sudo -u ubuntu pm2 status
                    '''
                }
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                    sleep 3
                    curl -f http://127.0.0.1:4000/health
                '''
            }
        }
    }

    post {
        success {
            echo 'DEPLOYMENT SUCCESSFUL'
        }

        failure {
            echo 'DEPLOYMENT FAILED'
        }
    }
}
