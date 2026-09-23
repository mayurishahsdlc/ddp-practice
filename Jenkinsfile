pipeline {
   
    agent any 
	
	stages {
	    
		stage('Install Dependencies') {
		    steps {
			    dir('backend') {
				    sh '''
					    
						echo "Installing backend dependencies..."
						npm ci
					'''
				}
			}
		}
		
		stage('Deploy with PM2') {
		    steps {
			    dir('backend') {
				    sh '''
					    
						echo "Stopping old application..."
						pm2 delete ddp-backend || true
						
						echo "Starting application with PM2..."
						pm2 start ecosystem.config.json
						
						echo "Saving PM2 process..."
						pm2 save
						
						echo "PM2 status:"
						pm2 status
					'''
				}
			}
		}
		
		stage('Health Check') {
		    steps {
			    sh '''
				    echo "Checking application health..."
					
					for i in $(seq 1 12)
					do
					    if curl -f http://localhost:4000/health
						then
						    echo "Application is healthy!"
							exit 0
						fi
						
						    echo "Health check attempt $i failed..."
							sleep 5
						done
						
						echo "Application health check failed!"
						exit 1
					'''
				}
			}
		}
		
		post {
		    
			always {
			    echo "Final PM2 status:"
				sh 'pm2 status || true'
			}
			
			success {
			    echo "==========================="
				echo "Deployment successful!"
				echo "Application is running on port 4000"
				echo "==========================="
			}
			
			failure {
			    echo "=========================="
				echo "Deployment failed!"
				echo "Check the jenkins console output."
				echo "=========================="
			}
		}
	}
