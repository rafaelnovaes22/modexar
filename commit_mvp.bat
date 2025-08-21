@echo off
echo --- Adicionando todos os arquivos...
git add .

echo --- Criando o commit...
git commit -m "feat: Implementa funcionalidades do MVP (Fornecedores, Produtos, Pedidos e Autenticação)"

echo --- Enviando para o repositorio remoto...
git push

echo --- Processo concluido!
pause
