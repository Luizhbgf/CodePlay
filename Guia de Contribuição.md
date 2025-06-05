# Guia de Contribuição

Olá! 👋  
Seja bem-vindo ao repositório **CodePlay**!  
Siga essas diretrizes para garantir que todos possamos colaborar de maneira organizada e eficiente.

---

## 📋 Regras básicas:

- **Não** faça alterações diretamente na branch `main`.
- **Sempre** crie uma nova branch para cada nova funcionalidade ou correção.
- **Sempre** envie um Pull Request (PR) para revisão antes de juntar ao `main`.
- **Escreva commits claros e descritivos**.
- **Mantenha o código limpo e organizado**.
- **Atualize o README.md** se adicionar ou mudar funcionalidades importantes.

---

## 🌿 Como contribuir:

### 1. Faça um Fork do repositório (se necessário)

Ou, se já for colaborador direto:

```bash
git clone https://github.com/Luizhbgf/CodePlay
cd CodePlay(ou nome da pasta que quiser armazenar o projeto)
```

### 2. Crie uma nova branch:  
Use prefixos para organização:

| Tipo de Mudança       | Prefixo     | Exemplo                  |
|-----------------------|-------------|--------------------------|
| Nova feat             | `feat/`     | `feat/novo-quiz`         |
| Correção de bug       | `fix/`      | `fix/corrige-login`      |
| Melhorias             | `imp/`      | `imp/otimiza-tela-login` |

Exemplo de criação de branch:

```bash
git checkout -b feat/nova-tela-configuracoes
```

### 3. Faça suas mudanças  
Teste seu código localmente (`npx expo start`).

Siga o padrão de código e estilo.

Mantenha a consistência nos nomes, variáveis e estrutura.

### 4. Commit e Push  
Faça commits claros e curtos:

```bash
git add .
git commit -m "Adiciona tela de Configurações"
git push -u origin desenvolvimento
```

### 5. Crie um Pull Request (PR)  
Vá até o GitHub.

Clique em "Compare & pull request".

Descreva claramente o que foi alterado.

Solicite revisão se necessário.

⚡ **Dicas**:  
- Teste antes de enviar!  
- Prefira pequenos PRs, fáceis de revisar.  
- Comente seu código, se necessário.  
- Seja gentil nas revisões.
```
