import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';

export default function Home() {
  const [sorvetes, setSorvetes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5225/sorvetes')
      .then(res => {
        if (!res.ok) throw new Error('Erro ao carregar sorvetes');
        return res.json();
      })
      .then(data => {
        setSorvetes(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando produtos...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Produtos</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {sorvetes.length === 0 && <p>Nenhum produto cadastrado.</p>}
        {sorvetes.map(s => (
          <Card
            key={s.id}
            image={s.imagemUrl}
            title={s.nome}
            description={s.descricao}
            price={s.preco}
          >
            <Button
              color="primary"
              onClick={() => {
                const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
                carrinho.push(s);
                localStorage.setItem('carrinho', JSON.stringify(carrinho));
                alert('Produto adicionado ao carrinho!');
              }}
            >
              Adicionar ao Carrinho
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
