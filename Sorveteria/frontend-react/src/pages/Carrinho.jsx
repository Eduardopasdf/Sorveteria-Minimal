import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';

export default function Carrinho() {
  const [carrinho, setCarrinho] = useState([]);
  const [desconto, setDesconto] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carrinhoLocal = JSON.parse(localStorage.getItem('carrinho')) || [];
    setCarrinho(carrinhoLocal);
  }, []);

  const totalSemDesconto = carrinho.reduce((sum, item) => sum + item.preco, 0);
  const totalComDesconto = Math.max(0, totalSemDesconto - desconto);

  const finalizarPedido = () => {
    if (carrinho.length === 0) {
      alert('Carrinho vazio.');
      return;
    }
    const pedido = {
      itens: carrinho.map(i => ({ sorveteId: i.id, nome: i.nome, preco: i.preco })),
      total: totalComDesconto,
      dataHora: new Date().toISOString(),
      metodoPagamento: 'Dinheiro',
      qrCodeUrl: "", // Enviar string vazia para evitar erro no backend
    };
    fetch('http://localhost:5225/pedidos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pedido),
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao cadastrar pedido');
        return res.json();
      })
      .then(data => {
        localStorage.removeItem('carrinho');
        setCarrinho([]);
        setDesconto(0);
        alert('Pedido finalizado com sucesso!');
      })
      .catch(err => setError(err.message));
  };

  return (
    <div>
      <h2>Carrinho</h2>
      {carrinho.length === 0 ? (
        <p>Carrinho vazio.</p>
      ) : (
        carrinho.map((item, index) => (
          <Card
            key={index}
            image={item.imagemUrl}
            title={item.nome}
            description={item.descricao}
            price={item.preco}
          />
        ))
      )}
      <p>Total: R$ {totalSemDesconto.toFixed(2)}</p>
      <p>Total com desconto: R$ {totalComDesconto.toFixed(2)}</p>
      <Button onClick={finalizarPedido} disabled={carrinho.length === 0}>
        Finalizar Pedido
      </Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
