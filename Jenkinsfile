pipeline {
    agent any

    tools {
        nodejs "Node22"
    }

    parameters {
        choice(
            name: 'ENVIRONMENT',
            choices: ['qa', 'staging', 'prod'],
            description: 'Select environment to run tests'
        )
    }

    environment {
        ENV = "${params.ENVIRONMENT ?: 'qa'}"
    }

    stages {

        stage('Checkout') {
            steps {
                echo "Checking out code from GitHub..."
                git branch: 'master', url: 'https://github.com/Mdzaidsiddique/OrangeHRM-automation-fw.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing npm dependencies..."
                sh 'npm install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                echo "Running Playwright tests on ${ENV} environment"
                sh "npx playwright test --env=${ENV} --reporter=allure-playwright"
            }
        }

        stage('Generate Allure Report') {
            steps {
                echo "Generating Allure report..."
                sh 'npx allure generate allure-results --clean -o allure-report'
            }
        }

        stage('Publish Allure Report') {
            steps {
                echo "Publishing Allure HTML report..."
                publishHTML([
                    reportDir: 'allure-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Allure Report',
                    keepAll: true,
                    alwaysLinkToLastBuild: true
                ])
            }
        }
    }

    post {
        always {
            echo "Cleaning workspace..."
            cleanWs()
        }

        success {
            echo "Pipeline completed successfully!"
        }

        failure {
            echo "Pipeline failed. Check logs and report."
        }
    }
}
