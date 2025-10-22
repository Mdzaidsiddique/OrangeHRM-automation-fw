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
    string(
      name: 'TAGS',
      defaultValue: '',
      description: 'Run tests by tag (e.g. @smoke or @regression). Leave blank to run all tests.'
    )
  }

  environment {
    ENV = "${params.ENV}"
    BROWSER = "${params.BROWSER}"
    TAGS = "${params.TAGS}"
  }

  stages {
    stage('Checkout') {
      steps {
        echo '📦 Checking out source code...'
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
        echo '🎯 Installing Playwright browsers...'
        bat 'npx playwright install --with-deps'
      }
    }

    stage('Run Playwright Tests') {
      steps {
        script {
          echo "🎭 Running Playwright tests on '${ENV}' using '${BROWSER}' browser..."
          
          def tagOption = TAGS?.trim() ? "--grep ${TAGS}" : ""
          
          // Using set to persist ENV variable in Windows bat context
          bat """
            set ENV=${ENV}
            npx playwright test --project=${BROWSER} ${tagOption} --reporter=line,allure-playwright
          """
        }
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
      echo '❌ Build failed. Check Allure report for details.'
    }
    success {
      echo '✅ Build and tests completed successfully!'
    }
  }
}
