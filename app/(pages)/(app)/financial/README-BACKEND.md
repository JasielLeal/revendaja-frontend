# 📊 Especificações da API Financeira

## 🎯 Endpoints Necessários

### 1. **GET /financial/summary**

Retorna resumo geral das finanças.

**Query Params:**

```typescript
{
  from: string,        // Data início (YYYY-MM-DD)
  to: string,          // Data fim (YYYY-MM-DD)
  transactionType?: 'revenue' | 'expense', // Opcional
  status?: 'completed' | 'pending' | 'cancelled' // Opcional
}
```

**Response:**

```json
{
  "data": {
    "summary": {
      "totalRevenue": 45680.5,
      "totalExpenses": 18230.75,
      "netProfit": 27449.75,
      "profitMargin": 60.1,
      "periodGrowth": 15.3,
      "totalTransactions": 309,
      "transactionGrowth": 12
    }
  }
}
```

---

### 2. **GET /financial/transactions**

Lista transações com paginação e filtros.

**Query Params:**

```typescript
{
  from: string,
  to: string,
  page?: number,
  limit?: number,
  transactionType?: 'revenue' | 'expense',
  paymentMethod?: string,
  category?: string,
  status?: 'completed' | 'pending' | 'cancelled',
  minAmount?: number,
  maxAmount?: number
}
```

**Response:**

```json
{
  "data": {
    "recentTransactions": [
      {
        "id": 1,
        "type": "revenue",
        "description": "Venda #1234 - Maria Silva",
        "amount": 285.5,
        "date": "2025-11-10",
        "method": "PIX",
        "status": "completed",
        "category": "Vendas Presenciais",
        "orderId": 1234,
        "reference": "PIX123ABC"
      }
    ]
  },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 150,
    "totalPages": 15
  }
}
```

---

npm run dev
### 3. **GET /financial/sales-by-brand**

Retorna dados das vendas por marca para gráfico de pizza.

**Query Params:**

```typescript
{
  from: string, // Data início (YYYY-MM-DD)
  to: string    // Data fim (YYYY-MM-DD)
}
```

**Response:**

```json
{
  "data": {
    "salesByBrand": [
      {
        "brand": "Natura",
        "amount": 18500.0,
        "quantity": 125,
        "percentage": 40.5,
        "averagePrice": 148.0
      },
      {
        "brand": "Boticário",
        "amount": 15200.0,
        "quantity": 89,
        "percentage": 33.3,
        "averagePrice": 170.79
      },
      {
        "brand": "Avon",
        "amount": 8300.0,
        "quantity": 67,
        "percentage": 18.2,
        "averagePrice": 123.88
      },
      {
        "brand": "Outros",
        "amount": 3680.5,
        "quantity": 28,
        "percentage": 8.0,
        "averagePrice": 131.45
      }
    ]
  }
}
```

---

### 4. **GET /financial/revenue-by-category**

Breakdown das receitas por categoria/canal.

**Response:**

```json
{
  "data": {
    "revenueByCategory": [
      {
        "category": "Vendas Presenciais",
        "amount": 28500.0,
        "percentage": 62.4,
        "growth": 15.2
      },
      {
        "category": "Loja Online",
        "amount": 17180.5,
        "percentage": 37.6,
        "growth": 28.5
      }
    ]
  }
}
```

---

### 5. **GET /financial/expenses-by-category**

Breakdown das despesas por categoria.

**Response:**

```json
{
  "data": {
    "expensesByCategory": [
      {
        "category": "Produtos/Estoque",
        "amount": 12500.0,
        "percentage": 68.6,
        "subcategories": [
          {
            "name": "Fornecedor ABC",
            "amount": 8000.0
          },
          {
            "name": "Fornecedor XYZ",
            "amount": 4500.0
          }
        ]
      },
      {
        "category": "Marketing",
        "amount": 2800.0,
        "percentage": 15.4
      }
    ]
  }
}
```

---

### 6. **GET /financial/payment-methods**

Análise dos métodos de pagamento utilizados.

**Response:**

```json
{
  "data": {
    "paymentMethods": [
      {
        "method": "PIX",
        "amount": 18500.0,
        "count": 125,
        "percentage": 40.5,
        "averageTicket": 148.0
      },
      {
        "method": "Cartão de Crédito",
        "amount": 15200.0,
        "count": 89,
        "percentage": 33.3,
        "averageTicket": 170.79
      }
    ]
  }
}
```

---

### 7. **GET /financial/export** (Opcional)

Exporta relatórios em PDF ou Excel.

**Query Params:**

```typescript
{
  from: string,
  to: string,
  format: 'pdf' | 'excel'
}
```

**Response:** Binary file (PDF/Excel)

---

## 💡 Cálculos Importantes

### **Lucro Líquido:**

```
netProfit = totalRevenue - totalExpenses
```

### **Margem de Lucro:**

```
profitMargin = (netProfit / totalRevenue) * 100
```

### **Crescimento do Período:**

```
periodGrowth = ((valorAtual - valorAnterior) / valorAnterior) * 100
```

### **Ticket Médio:**

```
averageTicket = totalRevenue / numberOfTransactions
```

---

## 🗂️ Estrutura de Dados Sugerida

### **Tabela: transactions**

```sql
CREATE TABLE transactions (
  id INT PRIMARY KEY,
  type ENUM('revenue', 'expense'),
  description VARCHAR(255),
  amount DECIMAL(10,2),
  date DATE,
  payment_method VARCHAR(100),
  status ENUM('completed', 'pending', 'cancelled'),
  category VARCHAR(100),
  order_id INT NULL,
  reference VARCHAR(100),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### **Categorias Sugeridas:**

**Receitas:**

- Vendas Presenciais
- Loja Online
- Outros

**Despesas:**

- Produtos/Estoque
- Marketing
- Operacionais
- Aluguel
- Salários
- Outros

**Métodos de Pagamento:**

- PIX
- Cartão de Crédito
- Cartão de Débito
- Dinheiro
- Transferência

---

## 🔧 Implementação Backend

### **Exemplo em Node.js/Express:**

```javascript
// GET /financial/summary
app.get("/financial/summary", async (req, res) => {
  const { from, to, transactionType, status } = req.query;

  // Query para receitas
  const revenues = await Transaction.sum("amount", {
    where: {
      type: "revenue",
      date: { [Op.between]: [from, to] },
      status: status || { [Op.in]: ["completed", "pending"] },
    },
  });

  // Query para despesas
  const expenses = await Transaction.sum("amount", {
    where: {
      type: "expense",
      date: { [Op.between]: [from, to] },
      status: "completed",
    },
  });

  const netProfit = revenues - expenses;
  const profitMargin = (netProfit / revenues) * 100;

  res.json({
    data: {
      summary: {
        totalRevenue: revenues,
        totalExpenses: expenses,
        netProfit,
        profitMargin,
        // ... outros cálculos
      },
    },
  });
});
```

---

## 📈 Métricas Avançadas (Futuro)

Para implementação futura, considere adicionar:

- **ROI (Return on Investment)**
- **Customer Lifetime Value (CLV)**
- **Churn Rate**
- **Análise de Sazonalidade**
- **Previsões de Faturamento**
- **Metas e KPIs**

---

## 🚀 Prioridades de Implementação

1. **Alta Prioridade:**

   - `/financial/summary`
   - `/financial/transactions`
   - `/financial/revenue-by-category`

2. **Média Prioridade:**

   - `/financial/cash-flow`
   - `/financial/expenses-by-category`
   - `/financial/payment-methods`

3. **Baixa Prioridade:**
   - `/financial/export`
   - Métricas avançadas
