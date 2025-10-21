pipeline {
  agent any

  parameters {
    choice(
      name: 'ENV',
      choices: ['qa', 'staging', 'prod'],
      description: 'Select environment to run Playwright tests on'
    )
  }

  environment {
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

    stage('Install Playwright Browsers') {
      steps {
        echo '🎯 Installing Playwright browsers...'
        bat 'npx playwright install --with-deps'
      }
    }

    stage('Run Playwright Tests') {
      steps {
        echo "🎭 Running Playwright tests on '${ENV}' environment..."
        bat "npx playwright test --browser=chromium --reporter=line,allure-playwright"
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
      echo '🧹 Cleaning worZkspace after build...'
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
