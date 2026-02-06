[README.md](https://github.com/user-attachments/files/25138965/README.md)
[README.md](https://github.com/user-attachments/files/25138965/README.md)
# 🧬 R3CF .ai - Reverse DNA Studio

> **Engenharia Reversa de Imagens e Síntese de DNA Visual em Tempo Real.**

O **Reverse DNA Studio** é uma ferramenta de alta performance desenvolvida para profissionais de IA Generativa. Ele permite decodificar o "DNA" de qualquer imagem, extraindo parâmetros técnicos de iluminação, composição e estilo, permitindo a replicação exata ou variação criativa através de modelos avançados do Google Gemini.

---

## ✨ Funcionalidades Principais

- 🔍 **Reverse Engineering (DNA Extraction):** Analisa referências visuais e gera prompts técnicos otimizados para Midjourney, Flux, DALL-E e Stable Diffusion.
- 🧪 **DNA Synthesis Engine:** Sistema integrado para geração de personagens baseados no DNA extraído, permitindo ajustes de vestimenta, cor e estilo.
- 📸 **Captura Multi-Ângulo:** Gera automaticamente três variações de enquadramento (Close-up, Half-body e Full-body).
- 💎 **Upscaling 4K:** Processamento de super-resolução para as imagens sintetizadas usando o modelo Pro Image.
- 🌓 **Interface Adaptativa:** Suporte nativo a modo escuro/claro com estética futurista e industrial.

---

## 🚀 Guia de Início Rápido (Deploy na Vercel)

Este projeto foi otimizado para a **Vercel**. Siga os passos abaixo:

1.  **Clone o Repositório:** Suba os arquivos para o seu GitHub.
2.  **Importe na Vercel:** No painel da Vercel, clique em `Add New > Project` e selecione seu repositório.
3.  **Configure a Variável de Ambiente:**
    - Vá em `Settings > Environment Variables`.
    - Adicione uma nova chave com o nome: `API_KEY`.
    - O valor deve ser a sua chave do **Google AI Studio**.
4.  **Deploy:** Clique em `Deploy`. O site estará no ar em segundos!

---

## 🛠️ Pilha Tecnológica

- **Frontend:** React 19 (Hooks, Context, Functional Components).
- **Estilização:** Tailwind CSS (Arquitetura Utilitária).
- **Motor de IA:** [@google/genai](https://www.npmjs.com/package/@google/genai) (Google Gemini 3 Flash/Pro).
- **Icons:** Material Symbols (Google).
- **Tipografia:** Space Grotesk (Visual moderno/geométrico).

---

## 📁 Estrutura do Projeto

```text
├── components/          # Componentes modulares da interface
│   ├── CharacterCreator # Motor de síntese de imagens
│   ├── ImageUploader    # Upload com efeito de scanner
│   ├── PromptOutput     # Exibição de dados decodificados
│   └── SettingsModal    # Gerenciamento de chaves e modelos
├── services/            # Lógica de integração com a API Gemini
├── utils/               # Utilitários de conversão de arquivos
└── types.ts             # Definições de tipos TypeScript
```

---

## ⚠️ Solução de Problemas (Troubleshooting)

- **Erro 429 (Too Many Requests):** Se você usa a chave gratuita, evite clicar muitas vezes seguidas em "Gerar". O sistema agora processa as imagens sequencialmente para mitigar isso.
- **Aviso "API KEY Ausente":** Verifique se o nome da variável na Vercel é exatamente `API_KEY`.
- **Erro no Upscaling 4K:** Esta função exige o modelo `gemini-3-pro-image-preview`. Certifique-se de que sua conta no Google Cloud tenha permissão para este modelo.

---

## 📄 Licença

Desenvolvido por **R3CF Studio**. Este projeto é para fins educacionais e profissionais de engenharia de prompt.

---
*Powered by Google Gemini AI*
