"# semana-agilizei-02" 

Para iniciar o cypress: npx cypress open


Para gerar os relatórios é necessário as seguintes libs:

cypress-multi-reporters -> permite a configuração de mais de um relatório no mesmo projeto

mocha -> lib adicional para execução dos testes em conjunto das bibliotecas mochawesome, mochawesome-merge e 

mochawesome-report-generator

mochawesome -> biblioteca responsável por gerar os arquivos json com informações dos testes realizados para ser utilizados nos relatórios. Para cada arquivo integration/*.spec.js é gerado um arquivo json.

mochawesome-merge -> realiza o merge dos arquivos json das specs para que seja criado apenas um relatório de teste

mochawesome-report-generator -> Gera o relatório em html utilizando os json gerados dos testes.

rimraf -> comando rm -rf para o node, utilizado para limpar a pasta e pode ser utilizado em qualquer sistema operacional.

npm install -D cypress-multi-reporters mocha mochawesome mochawesome-merge mochawesome-report-generator

Incluir no arquivo cypress.json a seguinte configuração

"reporter": "cypress-multi-reporters",
"reporterOptions": {
    "configFile": "reporter-config.json"
}

Na raiz do projeto criar o arquivo reporter-config.json com a seguinte configuração:
{
    "reporterEnable": "mochawesome",
    "mochawesomeReporterOptions": {
        "reporterDir": "mochawesome-report",
        "quiet": true,
        "overwrite": false,
        "html": false,
        "json": true
    }
}

No arquivo package.json adicionar as seguintes linhas de scripts:
n"report:merge": "mochawesome-merge > index.json",
"report:mocha": "mochawesome-report-generator index.json",
"report:clean": "rimraf mochawesome-report index.json"


Para acessar o Github Pages
<nome do usuário>.github.io/<nome do reposiório>


