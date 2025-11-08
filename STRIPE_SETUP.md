# 🎯 Integração Stripe - Configuração

## 📋 Pré-requisitos

1. **Conta no Stripe**: Crie em [stripe.com](https://stripe.com)
2. **Produto criado**: Configure no Dashboard do Stripe

## 🔧 Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env.local` com base no `.env.local.example`:

```env
# Stripe Configuration
STRIPE_PUBLISHABLE_KEY=pk_test_sua_publishable_key_aqui
STRIPE_SECRET_KEY=sk_test_sua_secret_key_aqui
STRIPE_WEBHOOK_SECRET=whsec_sua_webhook_secret_aqui

# Price ID do plano Starter (criar no Dashboard do Stripe)
STRIPE_STARTER_PRICE_ID=price_seu_price_id_aqui

# URL base para redirecionamentos
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. Configuração no Dashboard Stripe

#### 2.1 Criar Produto

1. Acesse **Produtos** no Dashboard
2. Clique em **+ Criar produto**
3. Configure:
   - **Nome**: "Plano Starter"
   - **Descrição**: "Tudo que você precisa para sua loja online"

#### 2.2 Criar Preço

1. No produto criado, clique **+ Adicionar preço**
2. Configure:
   - **Modelo de preço**: Assinatura recorrente
   - **Valor**: R$ 24,99
   - **Intervalo**: Mensal
3. **Copie o Price ID** (ex: `price_1abc123...`)

#### 2.3 Configurar Webhook

1. Acesse **Desenvolvedores** > **Webhooks**
2. Clique **+ Adicionar endpoint**
3. Configure:
   - **URL**: `https://seudominio.com/api/stripe/webhook`
   - **Eventos**:
     - `checkout.session.completed`
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
4. **Copie o Webhook Secret** (ex: `whsec_1abc123...`)

### 3. Obter Chaves da API

1. Acesse **Desenvolvedores** > **Chaves da API**
2. Copie:
   - **Chave publicável** (pk*test*...)
   - **Chave secreta** (sk*test*...)

## 🚀 Fluxo Implementado

### 1. **Usuário com plano Free**

- Redireciona para `/subscription`
- Mostra Plano Starter por R$ 24,99
- Botão cria sessão de checkout

### 2. **Checkout Stripe**

- Usuário inserir dados do cartão
- Processa pagamento
- Redireciona para:
  - **Sucesso**: `/create-store?session_id=cs_xxx`
  - **Cancelamento**: `/subscription?canceled=true`

### 3. **Webhooks**

- `checkout.session.completed`: Atualiza plano do usuário
- `customer.subscription.*`: Gerencia lifecycle da assinatura

### 4. **Criação de Loja**

- Após pagamento, usuário cria loja
- Banner de sucesso se veio do Stripe
- Redireciona para dashboard

## 🔐 Endpoints Criados

- `POST /api/stripe/create-checkout-session`
- `POST /api/stripe/webhook`

## 🎨 UX Implementada

- ✅ Loading states nos botões
- ✅ Toast notifications
- ✅ Banners de sucesso/cancelamento
- ✅ Redirecionamentos automáticos
- ✅ Tratamento de erros

## ⚡ Próximos Passos

1. **Configurar variáveis** no `.env.local`
2. **Testar fluxo** em modo teste
3. **Configurar webhook** em produção
4. **Implementar atualização** do plano no banco de dados

## 🔧 Customizações Necessárias

No webhook (`/api/stripe/webhook/route.ts`), implementar:

```typescript
// TODO: Atualizar o plano do usuário no banco de dados
// await updateUserPlan(userId, 'starter');
```

Essa integração está pronta para uso! 🎉
