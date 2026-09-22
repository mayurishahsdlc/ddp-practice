pipeline {
  
    agent any 
	
	stages {
	    
		stage('Checkout') {
		    steps {
			    checkout scm
			}
		}
		
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
					    pm2 delete docker-deploy-backend || true
						pm2 start ecosystem.config.json
						pm2 save
					'''
				}
			}
		}
		
		stage('Health Check') {
		    steps {
			    sh '''
				    sleep 5
					curl -f http://127.0.0.1:4000/health
				'''
			}
		}
	}
	post {
	    success {
		    echo 'Deployment successful!'
		}
		
		failure {
		    echo 'Deployment failed!'
		}
	}
}
