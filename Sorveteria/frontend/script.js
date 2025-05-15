let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Função para carregar sorvetes na página inicial
function carregarSorvetes() {
    fetch('http://localhost:5225/sorvetes')
        .then(res => {
            if (!res.ok) throw new Error("Erro ao carregar sorvetes");
            return res.json();
        })
        .then(data => {
            const container = document.getElementById('sorvetes');
            container.innerHTML = '';
            if (data.length === 0) {
                container.innerHTML = '<p>Nenhum produto cadastrado.</p>';
                return;
            }
            data.forEach(s => {
                const div = document.createElement('div');
                div.className = 'card';
                if (s.imagemUrl) {
                    div.innerHTML = `
                        <img src="${s.imagemUrl}" alt="${s.nome}" width="150" />
                        <h3>${s.nome}</h3>
                        <p>${s.descricao}</p>
                        <strong>R$ ${s.preco.toFixed(2)}</strong><br/>
                        <button onclick='adicionarCarrinho(${JSON.stringify(s)})'>Adicionar</button>
                    `;
                } else {
                    div.innerHTML = `
                        <div class="placeholder-image">Sem Imagem</div>
                        <h3>${s.nome}</h3>
                        <p>${s.descricao}</p>
                        <strong>R$ ${s.preco.toFixed(2)}</strong><br/>
                        <button onclick='adicionarCarrinho(${JSON.stringify(s)})'>Adicionar</button>
                    `;
                }
                container.appendChild(div);
            });
        })
        .catch(err => {
            const container = document.getElementById('sorvetes');
            container.innerHTML = '<p>Erro ao carregar produtos: ' + err.message + '</p>';
        });
}

// Função para adicionar produto ao carrinho
function adicionarCarrinho(produto) {
    carrinho.push(produto);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    alert("Produto adicionado ao carrinho!");
}

// Função para exibir itens no carrinho (em carrinho.html)
function exibirCarrinho() {
    const container = document.getElementById('itensCarrinho');
    const totalSpan = document.getElementById('total');
    container.innerHTML = '';
    let total = 0;

    carrinho.forEach(item => {
        total += item.preco;
        const div = document.createElement('div');
        div.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
        container.appendChild(div);
    });

    totalSpan.textContent = total.toFixed(2);
}

// Função para finalizar pedido (em carrinho.html)
function finalizarPedido() {
    const total = carrinho.reduce((sum, item) => sum + item.preco, 0);
    const pedido = {
        itens: carrinho.map(i => ({ sorveteId: i.id, nome: i.nome, preco: i.preco })),
        total: total,
        dataHora: new Date().toISOString(),
        metodoPagamento: "Dinheiro",
        qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PagamentoSovitha"
    };

    fetch('http://localhost:5225/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedido)
    })
    .then(res => {
        if (!res.ok) throw new Error("Erro ao cadastrar pedido");
        return res.json();
    })
    .then(data => {
        // Exibir etiqueta do pedido para pagamento com nomes dos sorvetes
        const itensHtml = pedido.itens.map(i => `<li>${i.nome} - R$ ${i.preco.toFixed(2)}</li>`).join('');
        const etiqueta = `
        Pedido ID: ${data.id}
        Método de Pagamento: ${data.metodoPagamento}
        <ul>${itensHtml}</ul>
        <strong>Total: R$ ${pedido.total.toFixed(2)}</strong><br/>
        <img src="${data.qrCodeUrl}" alt="QR Code para pagamento" />
        `;
        document.getElementById('etiqueta').innerHTML = etiqueta;
        localStorage.removeItem('carrinho');
        carrinho = [];
        alert("Pedido finalizado com sucesso!");
        // Não redirecionar para index para mostrar etiqueta
    })
    .catch(err => alert(err.message));
}

// Função para cancelar pedido (em pedidos.html)
async function cancelarPedido(id) {
    if (!confirm('Confirma cancelamento do pedido?')) return;
    try {
        const res = await fetch(`http://localhost:5225/pedidos/${id}`, {
            method: 'DELETE'
        });
        if (!res.ok) throw new Error('Erro ao cancelar pedido');
        alert('Pedido cancelado com sucesso!');
        carregarPedidos();
    } catch (err) {
        alert(err.message);
    }
}

// Função para carregar pedidos (em pedidos.html)
async function carregarPedidos() {
    try {
        const res = await fetch('http://localhost:5225/pedidos');
        if (!res.ok) throw new Error('Erro ao carregar pedidos');
        const pedidos = await res.json();
        const container = document.getElementById('listaPedidos');
        container.innerHTML = '';
        if (pedidos.length === 0) {
            container.innerHTML = '<p>Nenhum pedido realizado.</p>';
            return;
        }
        pedidos.forEach(p => {
            const div = document.createElement('div');
            div.className = 'card';
            let itensHtml = '';
            if (p.itens && p.itens.length > 0) {
                itensHtml = '<ul>' + p.itens.map(i => `<li>${i.nome || 'Produto'} - R$ ${i.preco ? i.preco.toFixed(2) : '0.00'}</li>`).join('') + '</ul>';
            }
            div.innerHTML = `
                <h3>Pedido #${p.id}</h3>
                <p>Data: ${new Date(p.dataHora).toLocaleString()}</p>
                <strong>Itens:</strong>
                ${itensHtml}
                <button onclick="cancelarPedido(${p.id})">Cancelar Pedido</button>
            `;
            container.appendChild(div);
        });
    } catch (err) {
        document.getElementById('listaPedidos').innerHTML = '<p>' + err.message + '</p>';
    }
}

// Autoexecução dependendo da página
if (location.pathname.includes('index.html')) carregarSorvetes();
if (location.pathname.includes('carrinho.html')) exibirCarrinho();
if (location.pathname.includes('pedidos.html')) carregarPedidos();
