pipeline {
    agent any

    tools {
        nodejs 'Node20'
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
                    node --version

                    echo "===== NPM ====="
                    npm --version

                    echo "===== Java ====="
                    java -version

                    echo "===== Allure ====="
                    allure --version

                    echo "===== Application Config ====="
                    echo "BASE_URL configured: ${BASE_URL:+YES}"
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Install Playwright Browser') {
            steps {
                sh 'npx playwright install chromium'
            }
        }

        stage('Run Tests') {
            steps {
                withCredentials([
                    string(
                        credentialsId: 'chainex-password-secret',
                        variable: 'CHAINEX_PASSWORD'
                    )
                ]) {
                    sh 'npm test'
                }
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
    }
}