pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Environment Check') {
            steps {
                sh '''
                    echo "===== Environment ====="
                    echo "User: $(whoami)"
                    echo "PATH: $PATH"

                    echo "===== Node ====="
                    which node || true
                    node --version || true

                    echo "===== NPM ====="
                    which npm || true
                    npm --version || true

                    echo "===== Java ====="
                    java -version || true

                    echo "===== Allure ====="
                    allure --version || true
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Generate Allure Report') {
            steps {
                sh 'npm run allure:generate'
            }
        }
    }

    post {
        always {
            echo '===== Test Execution Completed ====='
        }

        success {
            echo '✅ Pipeline completed successfully'
        }

        failure {
            echo '❌ Pipeline failed. Check the console output.'
        }
    }
}