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
                    whoami
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
                '''
            }
        }

        stage('Credential Check') {
            steps {
                withCredentials([
                    string(
                        credentialsId: 'chainex-password-secret',
                        variable: 'CHAINEX_PASSWORD'
                    )
                ]) {
                    sh '''
                        echo "===== Credential Check ====="
                        echo "CHAINEX_PASSWORD configured: ${CHAINEX_PASSWORD:+YES}"
                        echo "Password length: ${#CHAINEX_PASSWORD}"
                        printf '%s' "$CHAINEX_PASSWORD" | sha256sum
                    '''
                }
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
                        credentialsId: 'chainex-password',
                        variable: 'CHAINEX_PASSWORD'
                    )
                ]) {
                    sh 'npx cucumber-js --format progress'
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