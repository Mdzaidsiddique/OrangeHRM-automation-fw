pipeline {
  agent any

  // 👇 Add a parameter for choosing the environment
  parameters {
    choice(
      name: 'ENV',
      choices: ['qa', 'staging', 'prod'],
      description: 'Select the environment to run Playwright tests on'
    )
  }

  environment {
    // 👇 Make ENV globally available to Node.js (Playwright)
    ENV = "${params.ENV}"
  }

  stages {

    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        echo '📦 Installing project dependencies...'
        bat 'npm ci'
      }
    }

    stage('Run Playwright Tests') {
      steps {
        echo "🎭 Running Playwright tests on '${ENV}' environment..."
        bat "npx playwright test --reporter=line,allure-playwright"
      }
    }

    stage('Generate Allure Report') {
      steps {
        echo '🧩 Generating Allure report...'
        bat 'npx allure generate allure-results --clean -o allure-report'
      }
    }

    stage('Publish Allure Report') {
      steps {
        echo '📊 Publishing Allure report in Jenkins...'
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
      echo '🧹 Cleaning workspace after build...'
      cleanWs()
    }
    failure {
      echo '❌ Build failed. Check Allure report for test details.'
    }
    success {
      echo '✅ Build and tests completed successfully!'
    }
  }
}
