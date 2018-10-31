pipeline {
	agent {label 'NodeJS-Java-Agent'}
	tools {
	    nodejs 'node_v8.12'
	}
	stages {
	    stage('Update Container for Demo') {
            when {expression { env.BRANCH_NAME == 'feature/jenkinsfile' }}
            steps {
                sh ''
                sshagent(['mlsociety-production']) {
                   sh 'echo "Performing npm build..."'
                   sh "ssh ubuntu@35.153.153.200 'uname -a'"
                   sh 'echo "Updated DEMO successfully"'
                }
            }
        }
	    stage('Deploy Dev') {
	        when {expression { env.BRANCH_NAME == 'dev' }}
	        steps {
	            sh '''
	            #!/bin/bash
	            echo Deploying in dev....
	            rm -rf DockerImage
	            mkdir DockerImage
	            rm -rf ../compiled
	            mkdir ../compiled
	            cp /home/ubuntu/.npmrc ./DockerImage/myfilenpmrc
	            '''
	            withNPM(npmrcConfig:'db130c51-add1-4bfc-8d3f-f90a9811dbaf') {
	                echo "Performing npm build..."
	                sh '''
	                npm cache clean --force
	                npm config get registry
	                meteor npm install
	                meteor npm install --save @babel/runtime@7.0.0-beta.55
	                meteor build ../compiled --architecture os.linux.x86_64
	                '''
	            }
	            sh'''
	            mv ../compiled/*.tar.gz ./DockerImage/file.tar.gz
	            mv ./Dockerfile ./DockerImage
	            sudo $(aws ecr get-login --no-include-email --region us-east-1)
	            sudo docker build -f ./DockerImage/Dockerfile -t mlsociety-new-design .
	            sudo docker tag mlsociety-new-design:latest 843249697839.dkr.ecr.us-east-1.amazonaws.com/btech/mlsociety-new-design:dev
	            sudo docker push 843249697839.dkr.ecr.us-east-1.amazonaws.com/btech/mlsociety-new-design:dev
	            sudo ssh -i /home/ubuntu/PSE ubuntu@50.19.25.171 'aws ssm get-parameter --name "/secrets/cdt/mlsociety-new-design" --region us-east-1 --query 'Parameter.{V:Value}' --output text > settings; METEOR_SETTINGS=`jq -n -f settings`; sudo $(aws ecr get-login --no-include-email --region us-east-1); sudo docker stop mlsociety-new-design-in-dev; sudo docker rm mlsociety-new-design-in-dev; sudo docker pull 843249697839.dkr.ecr.us-east-1.amazonaws.com/btech/mlsociety-new-design:dev; sudo docker run -d --restart=always --name mlsociety-new-design-in-dev -e MONGO_URL="mongodb://co-network:i6QJc31zRLvc48Fg@co-network-shard-00-00-d377d.mongodb.net:27017,co-network-shard-00-01-d377d.mongodb.net:27017,co-network-shard-00-02-d377d.mongodb.net:27017/devops-test2?authSource=admin&ssl=true&replicaSet=CO-NETWORK-shard-0" -e METEOR_SETTINGS="$METEOR_SETTINGS" -e ROOT_URL=https://staging.mlsociety-new-design.tek-task.com -p 8082:3000 843249697839.dkr.ecr.us-east-1.amazonaws.com/btech/mlsociety-new-design:dev'
	            '''
	            
	        }
	    }
	    stage('Deploy Others') {
	        when {expression { env.BRANCH_NAME ==~ /^(hotfix|bugfix|feature|release)(.*)?/ }}
	        steps {
	            sh '''
	            #!/bin/bash
	            echo Deploying....
	            rm -rf ../compiled
	            mkdir ../compiled
	            '''
	            withNPM(npmrcConfig:'db130c51-add1-4bfc-8d3f-f90a9811dbaf') {
	                echo "Performing npm build..."
	                sh '''
	                npm cache clean --force
	                npm config get registry
	                meteor npm install
	                meteor npm install --save @babel/runtime@7.0.0-beta.55
	                meteor build ../compiled --architecture os.linux.x86_64
	                '''
	            }
	            sh'''
	            echo Compiled Succesfully
	            '''
	        }
	    }
	}
	post 
	    {
	        success {
	            slackSend (color: '#00FF00', message: "SUCCESSFUL: Job '${env.JOB_NAME}' Branch '${env.BRANCH_NAME}' (${env.BUILD_URL}) '\nChanges:\n ' + ${getChangeString()}")
	            }
	        failure {
                    slackSend (color: '#FF0000', message: "FAILED: Job '${env.JOB_NAME}' Branch '${env.BRANCH_NAME}' (${env.BUILD_URL}) '\nChanges:\n ' + ${getChangeString()}")
                }
            aborted{
                    slackSend (color: '#FFA500', message: "ABORTED: Job '${env.JOB_NAME}' Branch '${env.BRANCH_NAME}' (${env.BUILD_URL}) '\nChanges:\n ' + ${getChangeString()}")
                }
        }
}

@NonCPS
def getChangeString() {
 MAX_MSG_LEN = 100
 def changeString = ""

 echo "Gathering SCM changes"
 def changeLogSets = currentBuild.changeSets
 for (int i = 0; i < changeLogSets.size(); i++) {
     def entries = changeLogSets[i].items
     for (int j = 0; j < entries.length; j++) {
         def entry = entries[j]
         truncated_msg = entry.msg.take(MAX_MSG_LEN)
         changeString += " - ${truncated_msg} [${entry.author}]\n"
     }
 }
 if (!changeString) {
    changeString = " - No new changes"
 }
 return changeString
}