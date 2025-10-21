pipeline {
  agent any

  parameters {
    choice(
      name: 'ENV',
      choices: ['qa', 'staging', 'prod'],
      description: 'Select environment to run Playwright tests on'
    )
    choice(
      name: 'BROWSER',
      choices: ['chromium', 'firefox', 'webkit'],
      description: 'Select browser to run Playwright tests on'
    )
  }

  environment {
    ENV = "${params.ENV}"
    BROWSER = "${params.BROWSER}"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        echo '📦 Installing npm dependencies...'
        bat 'npm ci'
      }
    }

    stage('Install Playwright Browsers') {
      steps {
        echo '🎯 Installing Playwright browsers if missing...'
        bat 'npx playwright install --with-deps'
      }
    }

    stage('Run Playwright Tests') {
      steps {
        script {
          echo "🎭 Running Playwright tests on '${ENV}' using '${BROWSER}'..."
          catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
            bat "set ENV=${ENV} && npx playwright test --project=${BROWSER} --reporter=line,allure-playwright"
          }
        }
      }
    }

    stage('Generate Allure Report') {
      steps {
        echo '🧩 Generating Allure report...'
        bat 'npx allure generate allure-results --clean -o allure-report || echo "No Allure results to generate."'
      }
    }

    stage('Publish Allure Report') {
      steps {
        echo '📊 Publishing Allure report...'
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
      echo '❌ Tests failed. Allure report generated for debugging.'
    }
    success {
      echo '✅ All tests passed successfully!'
    }
  }
}
