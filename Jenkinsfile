pipeline {
   
    agent any
    
	stages {
	    
		stage('Checkout') {
		    steps {
			    checkout scm
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
			    sh 'docker-compose up -d'
			}
		}
		
		stage('Health Check') {
		    steps {
			    sh '''
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
}
