pipeline {
    agent any
    

    tools {
        nodejs "node"
    }

    environment {
        IMAGE_NAME = 'next-portfolio'
        CONTAINER_NAME = 'next-portfolio-container'
    }

    stages {
        stage("Checkout"){
            steps{
                echo "====++++executing Checkout++++===="
                checkout scm
            }
            post{

                success{
                    echo "====++++Checkout executed successfully++++===="
                }
                failure{
                    echo "====++++Checkout execution failed++++===="
                }
        
            }
        }

        stage("Build Docker image") {
            steps{
                echo "====++++Building the application++++===="
                sh 'docker build -t ${IMAGE_NAME} .'
            }
            post {
                success{
                    echo "====++++Built successfully++++===="
                }
                failure{
                    echo "====++++Built failed++++===="
                }
            }
        }

        stage("Run the application") {
            steps{
                echo "====++++Running the container++++===="
                script {
                    def containerExists = sh(script: "docker ps -a --format '{{.Names}}' | grep ${CONTAINER_NAME}", returnStatus: true)
                    echo "${containerExists}"
                    if (containerExists == 0) {
                        echo "Container already exists. Restarting..."
                        sh "docker stop ${CONTAINER_NAME}"
                        sh "docker rm ${CONTAINER_NAME}"
                    }

                    sh "docker run -dp 4000:80 --name ${CONTAINER_NAME} ${IMAGE_NAME}"
                }
            }   
            post {
                success{
                    echo "====++++Run successfully++++===="
                }
                failure{
                    echo "====++++Run failed++++===="
                }
            }
        }


    } 
}