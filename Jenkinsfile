pipeline {
  agent any
      tools {
          nodejs 'node'
      }
  stages {
     stage('Update Container for Staging') {
        when {
            expression { env.BRANCH_NAME == 'dev' }
        }
        steps {
           sh 'echo "Updating"'
           sshagent(['ea22b683-89a3-4925-8a17-41ba23b0aaf2']) {
              sh 'echo "Building...."'
              sh "ssh ${DEV_HOST_USER}@${DEV_HOST} './staging-update.sh'"
              sh 'echo "Updated successfully"'
           }
        }
     }
     stage('Update Container for Demo') {
        when {
            expression { env.BRANCH_NAME == 'master' }
        }
        steps {
            sh 'echo "Updating"'
            sshagent(['ea22b683-89a3-4925-8a17-41ba23b0aaf2']) {
               sh 'echo "Building...."'
               sh "ssh ${DEV_HOST_USER}@${DEV_HOST} './production-update.sh'"
               sh 'echo "Updated DEMO successfully"'
            }
        }
     }
  }
  post {
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