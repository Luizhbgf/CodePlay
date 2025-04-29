pipeline {
  agent any

  parameters {
    string(name: 'AMBIENTE', defaultValue: 'dev', description: 'dev | homolog | prod')
  }

  environment {
    REPO = 'https://github.com/seu-usuario/seu-repo.git'
  }

  stages {
    stage('Clonar Projeto') {
      steps {
        git url: "${env.REPO}", branch: 'main'
      }
    }

    stage('Executar por Ambiente') {
      steps {
        script {
          if (params.AMBIENTE == 'dev') {
            echo "Executando testes de desenvolvimento"
            sh 'echo "npm run lint"'
          } else if (params.AMBIENTE == 'homolog') {
            echo "Executando testes e validações de homologação"
            sh 'echo "npm run test:ci"'
          } else if (params.AMBIENTE == 'prod') {
            echo "Executando release e build final"
            sh 'echo "npm run build && echo OK > versao.txt"'
          }
        }
      }
    }

    stage('Versionar no GitHub') {
      when {
        expression { return params.AMBIENTE == 'prod' }
      }
      steps {
        script {
          def version = new Date().format("yyyyMMdd-HHmm")
          sh "git config user.name 'Jenkins'"
          sh "git config user.email 'jenkins@demo.com'"
          sh "git add versao.txt && git commit -m 'Release ${version}'"
          sh "git push origin main"
        }
      }
    }
  }
}
