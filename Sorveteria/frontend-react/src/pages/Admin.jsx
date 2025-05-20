import React, { useEffect, useState } from 'react';

export default function Admin() {
  const [produtos, setProdutos] = useState([]);
  const [mensagemProduto, setMensagemProduto] = useState('');
  const [novoProduto, setNovoProduto] = useState({
    nome: '',
    descricao: '',
    preco: '',
    imagemUrl: '',
  });
  const [editandoProduto, setEditandoProduto] = useState(null);

  const carregarProdutos = () => {
    fetch('http://localhost:5225/sorvetes')
      .then(res => {
        if (!res.ok) throw new Error('Erro ao carregar produtos');
        return res.json();
      })
      .then(data => setProdutos(data))
      .catch(err => {
        console.error('Erro ao carregar produtos:', err);
        setMensagemProduto(err.message);
        alert('Erro ao carregar produtos: ' + err.message);
      });
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const handleProdutoChange = (e) => {
    const { name, value } = e.target;
    if (editandoProduto) {
      setEditandoProduto(prev => ({ ...prev, [name]: value }));
    } else {
      setNovoProduto(prev => ({ ...prev, [name]: value }));
    }
  };

  const adicionarProduto = (e) => {
    e.preventDefault();
    const precoNum = parseFloat(novoProduto.preco);
    if (!novoProduto.nome || !novoProduto.descricao || isNaN(precoNum) || precoNum <= 0) {
      setMensagemProduto('Preencha todos os campos corretamente.');
      alert('Preencha todos os campos corretamente.');
      return;
    }
    const produto = {
      nome: novoProduto.nome,
      descricao: novoProduto.descricao,
      preco: precoNum,
      imagemUrl: novoProduto.imagemUrl,
    };
    fetch('http://localhost:5225/sorvetes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(produto),
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao adicionar produto');
        setMensagemProduto('Produto adicionado com sucesso!');
        alert('Produto adicionado com sucesso!');
        setNovoProduto({ nome: '', descricao: '', preco: '', imagemUrl: '' });
        carregarProdutos();
      })
      .catch(err => {
        console.error('Erro ao adicionar produto:', err);
        setMensagemProduto(err.message);
        alert('Erro ao adicionar produto: ' + err.message);
      });
  };

  const deletarProduto = (id) => {
    if (!window.confirm('Confirma exclusão do produto?')) return;
    fetch(`http://localhost:5225/sorvetes/${id}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao deletar produto');
        setMensagemProduto('Produto deletado com sucesso!');
        alert('Produto deletado com sucesso!');
        carregarProdutos();
      })
      .catch(err => {
        console.error('Erro ao deletar produto:', err);
        setMensagemProduto(err.message);
        alert('Erro ao deletar produto: ' + err.message);
      });
  };

  const iniciarEdicao = (produto) => {
    console.log('Iniciando edição do produto:', produto);
    setEditandoProduto(produto);
    setMensagemProduto('');
  };

  const cancelarEdicao = () => {
    console.log('Edição cancelada');
    setEditandoProduto(null);
    setMensagemProduto('');
  };

  const salvarEdicao = (e) => {
    e.preventDefault();
    console.log('Salvando edição do produto:', editandoProduto);
    const precoNum = parseFloat(editandoProduto.preco);
    if (!editandoProduto.nome || !editandoProduto.descricao || isNaN(precoNum) || precoNum <= 0) {
      setMensagemProduto('Preencha todos os campos corretamente.');
      alert('Preencha todos os campos corretamente.');
      return;
    }
    fetch(`http://localhost:5225/sorvetes/${editandoProduto.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: editandoProduto.nome,
        descricao: editandoProduto.descricao,
        preco: precoNum,
        imagemUrl: editandoProduto.imagemUrl,
      }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao atualizar produto');
        setMensagemProduto('Produto atualizado com sucesso!');
        alert('Produto atualizado com sucesso!');
        setEditandoProduto(null);
        carregarProdutos();
      })
      .catch(err => {
        console.error('Erro ao atualizar produto:', err);
        setMensagemProduto(err.message);
        alert('Erro ao atualizar produto: ' + err.message);
      });
  };

  return (
    <div>
      <h2>Gerenciar Produtos</h2>
      {mensagemProduto && <p>{mensagemProduto}</p>}

      {editandoProduto ? (
        <form onSubmit={salvarEdicao} style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={editandoProduto.nome}
            onChange={handleProdutoChange}
            required
          />
          <input
            type="text"
            name="descricao"
            placeholder="Descrição"
            value={editandoProduto.descricao}
            onChange={handleProdutoChange}
            required
          />
          <input
            type="number"
            name="preco"
            placeholder="Preço"
            step="0.01"
            value={editandoProduto.preco}
            onChange={handleProdutoChange}
            required
          />
          <input
            type="text"
            name="imagemUrl"
            placeholder="URL da Imagem (opcional)"
            value={editandoProduto.imagemUrl}
            onChange={handleProdutoChange}
          />
          <button type="submit" style={{ backgroundColor: '#4caf50', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer', marginRight: '0.5rem' }}>
            Salvar
          </button>
          <button type="button" onClick={cancelarEdicao} style={{ backgroundColor: '#f44336', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer' }}>
            Cancelar
          </button>
        </form>
      ) : (
        <form onSubmit={adicionarProduto} style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={novoProduto.nome}
            onChange={handleProdutoChange}
            required
          />
          <input
            type="text"
            name="descricao"
            placeholder="Descrição"
            value={novoProduto.descricao}
            onChange={handleProdutoChange}
            required
          />
          <input
            type="number"
            name="preco"
            placeholder="Preço"
            step="0.01"
            value={novoProduto.preco}
            onChange={handleProdutoChange}
            required
          />
          <input
            type="text"
            name="imagemUrl"
            placeholder="URL da Imagem (opcional)"
            value={novoProduto.imagemUrl}
            onChange={handleProdutoChange}
          />
          <button type="submit" style={{ backgroundColor: '#f8b500', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer' }}>
            Adicionar Produto
          </button>
        </form>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {produtos.length === 0 && <p>Nenhum produto cadastrado.</p>}
        {produtos.map(p => (
          <div key={p.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', width: '200px' }}>
            {p.imagemUrl ? (
              <img src={p.imagemUrl} alt={p.nome} style={{ width: '100%', borderRadius: '8px' }} />
            ) : (
              <div style={{ width: '100%', height: '150px', backgroundColor: '#eee', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Sem Imagem
              </div>
            )}
            <h3>{p.nome}</h3>
            <p>{p.descricao}</p>
            <strong>R$ {p.preco.toFixed(2)}</strong>
            <br />
            <button onClick={() => deletarProduto(p.id)} style={{ marginTop: '0.5rem', backgroundColor: '#f44336', border: 'none', padding: '0.5rem', borderRadius: '4px', color: '#fff', cursor: 'pointer' }}>
              Deletar
            </button>
            <button onClick={() => iniciarEdicao(p)} style={{ marginTop: '0.5rem', backgroundColor: '#2196f3', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', color: '#fff', cursor: 'pointer', marginLeft: '0.5rem' }}>
              Editar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
