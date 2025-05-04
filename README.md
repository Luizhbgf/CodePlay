# Pasta de Imagens

Esta pasta contém todas as imagens utilizadas no aplicativo CodePlay.

Certifique-se de que as seguintes imagens estão presentes:
- mascot.png - O mascote do aplicativo
- avatar.png - Avatar padrão do usuário
- google-icon.png - Ícone do Google para login
- badge1.png, badge2.png, badge3.png - Badges de conquistas
- avatar1.png até avatar9.png - Avatares para o ranking
\`\`\`

Agora vamos criar um arquivo para garantir que a estrutura de pastas esteja correta:

```tsx type="code" file="context/README.md"
# Pasta de Contextos

Esta pasta contém os contextos globais do aplicativo:
- AppContext.js - Contexto para gerenciar o estado global do aplicativo
- ThemeContext.js - Contexto para gerenciar o tema (claro/escuro)
\`\`\`

```tsx type="code" file="navigation/README.md"
# Pasta de Navegação

Esta pasta contém os arquivos relacionados à navegação do aplicativo:
- TabNavigator.js - Navegador de abas principal
\`\`\`

## Resumo das Melhorias

1. **Estrutura do Projeto**:
   - Organização em pastas (context, navigation, assets)
   - Implementação de contextos globais para estado e tema

2. **Funcionalidades Adicionadas**:
   - Sistema de tema claro/escuro
   - Sistema de pontuação e níveis
   - Sistema de conquistas
   - Ranking de usuários
   - Sequência diária de estudo
   - Tela de configurações
   - Feedback tátil com Haptics
   - Animações para melhor experiência do usuário

3. **Melhorias Visuais**:
   - Gradientes com LinearGradient
   - Animações de transição
   - Feedback visual para interações
   - Melhor organização de elementos
   - Suporte a modo escuro

4. **Navbar Interativa**:
   - Navegação entre telas com feedback visual
   - Indicador de tela atual
   - Exibição de pontos do usuário

5. **Experiência de Aprendizado**:
   - Lições com etapas progressivas
   - Quiz com feedback imediato
   - Recompensas por completar atividades
   - Progresso visual

Para executar o aplicativo com todas essas melhorias, você precisará instalar as dependências adicionais:

```bash
npm install @react-native-async-storage/async-storage @react-navigation/bottom-tabs expo-haptics expo-linear-gradient