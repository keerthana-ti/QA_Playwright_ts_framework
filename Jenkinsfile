pipeline {
    agent any

    tools {
        nodejs 'Node20'
    }

    environment {
        CHAINEX_PASSWORD = credentials('chainex-password')
    }

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
                    which node
                    node --version

                    echo "===== NPM ====="
                    which npm
                    npm --version

                    echo "===== Java ====="
                    java -version

                    echo "===== Allure ====="
                    allure --version

                    echo "===== Application Config ====="
                    echo "BASE_URL configured: ${BASE_URL:+YES}"
                    echo "CHAINEX_PASSWORD configured: ${CHAINEX_PASSWORD:+YES}"
                '''
            }
        }   

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browser') {
            steps {
                sh 'npx playwright install chromium'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npx cucumber-js --format progress'
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
            echo '===== Pipeline Completed ====='
        }

        success {
            echo '✅ Tests and Allure report generated successfully.'
        }

        failure {
            echo '❌ Pipeline failed. Please check the stage logs.'
        }
    }
}