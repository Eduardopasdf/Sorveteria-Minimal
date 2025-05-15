import React, { useEffect, useState } from 'react';

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState(null);

  const carregarPedidos = () => {
    fetch('http://localhost:5225/pedidos')
      .then(res => {
        if (!res.ok) throw new Error('Erro ao carregar pedidos');
        return res.json();
      })
      .then(data => setPedidos(data))
      .catch(err => setError(err.message));
  };

  useEffect(() => {
    carregarPedidos();
  }, []);

  const cancelarPedido = (id) => {
    if (!window.confirm('Confirma cancelamento do pedido?')) return;
    fetch(`http://localhost:5225/pedidos/${id}/cancelar`, { method: 'PATCH' })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao cancelar pedido');
        alert('Pedido cancelado com sucesso!');
        carregarPedidos();
      })
      .catch(err => alert(err.message));
  };

  const deletarPedido = (id) => {
    if (!window.confirm('Confirma exclusão do pedido?')) return;
    fetch(`http://localhost:5225/pedidos/${id}`, { method: 'DELETE' })
      .then(async res => {
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Erro ao excluir pedido: ${errorText}`);
        }
        alert('Pedido excluído com sucesso!');
        carregarPedidos();
      })
      .catch(err => alert(err.message));
  };

  const calcularTotal = (itens) => {
    if (!itens || itens.length === 0) return 0;
    return itens.reduce((acc, item) => acc + (item.preco || 0), 0);
  };

  return (
    <div>
      <h2>Meus Pedidos</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {pedidos.length === 0 ? (
        <p>Nenhum pedido realizado.</p>
      ) : (
        pedidos.map(p => (
          <div key={p.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
            <h3>Pedido #{p.id} {p.cancelado ? '(Cancelado)' : ''}</h3>
            <p>Data: {new Date(p.dataHora).toLocaleString()}</p>
            <strong>Itens:</strong>
            <ul>
              {p.itens && p.itens.length > 0 ? (
                p.itens.map((i, idx) => (
                  <li key={idx}>{i.nome || 'Produto'} - R$ {i.preco ? i.preco.toFixed(2) : '0.00'}</li>
                ))
              ) : (
                <li>Sem itens</li>
              )}
            </ul>
            <p><strong>Total do pedido: R$ {calcularTotal(p.itens).toFixed(2)}</strong></p>
            <button
              onClick={() => cancelarPedido(p.id)}
              disabled={p.cancelado}
              style={{
                backgroundColor: p.cancelado ? '#ccc' : '#f44336',
                color: '#fff',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: p.cancelado ? 'not-allowed' : 'pointer',
              }}
            >
              Cancelar Pedido
            </button>
            <button
              onClick={() => deletarPedido(p.id)}
              style={{
                backgroundColor: '#d32f2f',
                color: '#fff',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer',
                marginLeft: '0.5rem',
              }}
            >
              Excluir Pedido
            </button>
          </div>
        ))
      )}
    </div>
  );
}
