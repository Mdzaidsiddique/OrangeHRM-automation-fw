pipeline {
    agent any

    tools {
        nodejs "Node22"
    }

    parameters {
        choice(
            name: 'ENVIRONMENT',
            choices: ['qa', 'staging', 'prod'],
            description: 'Select environment to run Playwright tests'
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
                // Run with Allure reporter
                sh "npx playwright test --env=${ENV} --reporter=line,allure-playwright"
            }
        }

        stage('Generate Allure Report') {
            steps {
                echo "Generating Allure report..."
                // Generate allure-report folder from allure-results
                sh 'npx allure generate allure-results --clean -o allure-report'
            }
        }

        stage('Publish Allure Report') {
            steps {
                echo "Publishing Allure report to Jenkins dashboard..."
                allure([
                    includeProperties: false,
                    jdk: '',
                    results: [[path: 'allure-results']]
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
            echo "Playwright + Allure tests ran successfully on ${ENV}"
        }

        failure {
            echo "Tests failed! Check the Allure report for details."
        }
    }
}
