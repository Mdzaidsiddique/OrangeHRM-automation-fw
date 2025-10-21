pipeline {
    agent any

    tools {
        nodejs "Node22"
    }

    environment {
        ENV = "${params.ENVIRONMENT ?: 'qa'}"
    }

    parameters {
        choice(
            name: 'ENVIRONMENT',
            choices: ['qa', 'staging', 'prod'],
            description: 'Select environment to run tests'
        )
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/Mdzaidsiddique/OrangeHRM-automation-fw.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing npm dependencies..."
                bat 'npm install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                echo "Running Playwright tests on ${ENV} environment"
                bat "npx playwright test --env=${ENV} --reporter=html"
            }
        }

        // stage('Publish HTML Report') {
        //     steps {
        //         publishHTML([
        //             reportDir: 'playwright-report',
        //             reportFiles: 'index.html',
        //             reportName: 'Playwright Test Report'
        //         ])
        //     }
        // }
    }

    post {
        always {
            echo "Cleaning workspace..."
            cleanWs()
        }
    }
}
