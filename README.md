# Instruções de Execução do Projeto

Para rodar este projeto, é necessário ter o Docker instalado na sua máquina.

## Passos para Execução:

1. Certifique-se de ter o Docker instalado na sua máquina. Se não tiver, siga as instruções de instalação em [Docker Installation Guide](https://docs.docker.com/get-docker/).

2. Após a instalação do Docker, abra o terminal ou prompt de comando.

3. Navegue até o diretório raiz do projeto.

4. Execute o seguinte comando para iniciar os serviços do projeto:

    ```bash
    docker compose up -d
    ```

    Este comando iniciará os contêineres Docker necessários para o projeto.

5. Após a execução bem-sucedida do comando, você pode acessar o frontend da aplicação em [localhost:3001](http://localhost:3001).

6. Além disso, o backend com Hasura está sendo executado na porta 8080 do localhost.

7. Para que os dados sejam salvos corretamente, é necessário configurar o banco de dados. Você precisará entrar no Hasura em [localhost:8080](http://localhost:8080) e criar um schema no banco de dados padrão ('public'). Em seguida, crie uma tabela com o nome 'team' e as seguintes colunas:
   - 'id' (do tipo UUID)
   - 'nome' (do tipo texto)
   - 'url' (do tipo texto)

8. Atualmente, a migração de dados e as seeds estão em andamento (WIP), então essa etapa é necessária para garantir que os dados sejam persistidos corretamente.

9. Para parar os serviços do projeto, você pode executar o seguinte comando:

    ```bash
    docker compose down -v
    ```

    Isso encerrará os contêineres Docker em execução.
